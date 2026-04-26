import type { Prisma } from "@prisma/client";

export type RosterProfileType = "leadership" | "mtl";
export type RosterDisplay =
  | "leadership-squadrons"
  | "mtl-cards"
  | "simple-grid";

export type RosterFilter = {
  profileType?: RosterProfileType;
  unit?: string;
  ids?: string[];
};

export type HtmlBlock = { type: "html"; html: string };

export type RosterBlock = {
  type: "roster";
  filter: RosterFilter;
  display: RosterDisplay;
};

export type InfoCardItem = {
  icon: string;
  color: string;
  title: string;
  description: string;
  url?: string;
};

export type InfoCardsBlock = {
  type: "info-cards";
  heading?: string;
  cards: InfoCardItem[];
  columns: 1 | 2 | 3 | 4;
};

export type StatItem = { value: string; label: string };

export type StatsBlock = {
  type: "stats";
  heading?: string;
  stats: StatItem[];
};

export type ChecklistVariant =
  | "normal"
  | "warning"
  | "success"
  | "info"
  | "tips";

export type ChecklistItem = { text: string; subtext?: string };

export type ChecklistBlock = {
  type: "checklist";
  icon: string;
  color: string;
  title: string;
  variant: ChecklistVariant;
  items: ChecklistItem[];
};

export type ContactsDirectoryBlock = {
  type: "contacts-directory";
  categories?: string[];
  searchable: boolean;
};

export type ContactKind = "phone" | "url" | "email" | "text";

export type ContactItem = {
  icon: string;
  label: string;
  value: string;
  kind: ContactKind;
  sublabel?: string;
  emphasize?: boolean;
};

export type ContactInfoBlock = {
  type: "contact-info";
  heading?: string;
  items: ContactItem[];
  columns: 1 | 2 | 3;
};

export type HighlightVariant = "navy" | "warning" | "info" | "success";

export type HighlightCardBlock = {
  type: "highlight-card";
  icon: string;
  title: string;
  description: string;
  variant: HighlightVariant;
};

export type Phase = {
  badge?: string;
  title: string;
  timeframe?: string;
  items: string[];
};

export type PhasesBlock = {
  type: "phases";
  phases: Phase[];
  badgeVariant: "default" | "secondary" | "outline";
};

export type NumberedStep = { text: string; badge?: string };

export type NumberedStepsStyle = "numbered" | "dot";

export type NumberedStepsBlock = {
  type: "numbered-steps";
  title?: string;
  subtitle?: string;
  icon?: string;
  color: string;
  style: NumberedStepsStyle;
  steps: NumberedStep[];
};

export type ScheduleRow = { label: string; value: string; notes?: string };

export type ScheduleColumn = {
  title: string;
  badge?: string;
  badgeVariant: "default" | "secondary" | "outline";
  rows: ScheduleRow[];
};

export type ScheduleGridBlock = {
  type: "schedule-grid";
  heading?: string;
  columns: ScheduleColumn[];
};

export type DefinitionCardItem = {
  badge: string;
  meta?: string;
  metaIcon?: string;
  title: string;
  description: string;
};

export type DefinitionCardsBlock = {
  type: "definition-cards";
  heading?: string;
  cards: DefinitionCardItem[];
  columns: 1 | 2 | 3;
};

export type ProgramTierSection = { title: string; items: string[] };

export type ProgramTierItem = {
  badge: string;
  color: string;
  title: string;
  description: string;
  sections: ProgramTierSection[];
};

export type ProgramTiersBlock = {
  type: "program-tiers";
  tiers: ProgramTierItem[];
};

export type LocationsDirectoryBlock = {
  type: "locations-directory";
  heading?: string;
  categories?: string[];
  columns: 1 | 2 | 3;
};

export type FilesListBlock = {
  type: "files-list";
  heading?: string;
  columns: 1 | 2 | 3;
};

export type LinkCollectionsListBlock = {
  type: "link-collections-list";
  heading?: string;
  columns: 1 | 2 | 3;
  hideReserved: boolean;
};

export type PageBlock =
  | HtmlBlock
  | RosterBlock
  | InfoCardsBlock
  | StatsBlock
  | ChecklistBlock
  | ContactsDirectoryBlock
  | ContactInfoBlock
  | HighlightCardBlock
  | PhasesBlock
  | NumberedStepsBlock
  | ScheduleGridBlock
  | DefinitionCardsBlock
  | ProgramTiersBlock
  | LocationsDirectoryBlock
  | FilesListBlock
  | LinkCollectionsListBlock;

export type PageBlocksContent = { blocks: PageBlock[] };

export function normalizeBlocks(
  content: Prisma.JsonValue | null | undefined
): PageBlock[] {
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return [];
  }
  const obj = content as Record<string, unknown>;

  if (Array.isArray(obj.blocks)) {
    return obj.blocks
      .map(normalizeBlock)
      .filter((b): b is PageBlock => b !== null);
  }
  if (typeof obj.html === "string") {
    return [{ type: "html", html: obj.html }];
  }
  return [];
}

function normalizeBlock(value: unknown): PageBlock | null {
  if (!value || typeof value !== "object") return null;
  const b = value as Record<string, unknown>;

  switch (b.type) {
    case "html":
      return typeof b.html === "string" ? (b as HtmlBlock) : null;

    case "roster": {
      const display = b.display;
      if (
        (display === "leadership-squadrons" ||
          display === "mtl-cards" ||
          display === "simple-grid") &&
        typeof b.filter === "object" &&
        b.filter !== null
      ) {
        return b as RosterBlock;
      }
      return null;
    }

    case "info-cards":
      return Array.isArray(b.cards) ? (b as InfoCardsBlock) : null;

    case "stats":
      return Array.isArray(b.stats) ? (b as StatsBlock) : null;

    case "checklist":
      if (Array.isArray(b.items) && typeof b.title === "string") {
        const items: ChecklistItem[] = b.items.map((item) =>
          typeof item === "string"
            ? { text: item }
            : (item as ChecklistItem)
        );
        return { ...(b as ChecklistBlock), items };
      }
      return null;

    case "contacts-directory":
      return b as ContactsDirectoryBlock;

    case "contact-info":
      return Array.isArray(b.items) ? (b as ContactInfoBlock) : null;

    case "highlight-card":
      return typeof b.title === "string" ? (b as HighlightCardBlock) : null;

    case "phases":
      return Array.isArray(b.phases) ? (b as PhasesBlock) : null;

    case "numbered-steps":
      return Array.isArray(b.steps) ? (b as NumberedStepsBlock) : null;

    case "schedule-grid":
      return Array.isArray(b.columns) ? (b as ScheduleGridBlock) : null;

    case "definition-cards":
      return Array.isArray(b.cards) ? (b as DefinitionCardsBlock) : null;

    case "program-tiers":
      return Array.isArray(b.tiers) ? (b as ProgramTiersBlock) : null;

    case "locations-directory":
      return b as LocationsDirectoryBlock;

    case "files-list":
      return b as FilesListBlock;

    case "link-collections-list":
      return b as LinkCollectionsListBlock;

    default:
      return null;
  }
}

export function toBlocksContent(blocks: PageBlock[]): PageBlocksContent {
  return { blocks };
}

export function createHtmlBlock(html = ""): HtmlBlock {
  return { type: "html", html };
}

export function createRosterBlock(
  defaults: Partial<RosterBlock> = {}
): RosterBlock {
  return {
    type: "roster",
    filter: defaults.filter ?? { profileType: "leadership" },
    display: defaults.display ?? "leadership-squadrons",
  };
}

export function createInfoCardsBlock(
  defaults: Partial<InfoCardsBlock> = {}
): InfoCardsBlock {
  return {
    type: "info-cards",
    heading: defaults.heading,
    cards: defaults.cards ?? [
      {
        icon: "Info",
        color: "blue",
        title: "Card title",
        description: "Describe this card.",
      },
    ],
    columns: defaults.columns ?? 2,
  };
}

export function createStatsBlock(defaults: Partial<StatsBlock> = {}): StatsBlock {
  return {
    type: "stats",
    heading: defaults.heading,
    stats: defaults.stats ?? [{ value: "0", label: "Stat" }],
  };
}

export function createChecklistBlock(
  defaults: Partial<ChecklistBlock> = {}
): ChecklistBlock {
  return {
    type: "checklist",
    icon: defaults.icon ?? "CheckCircle2",
    color: defaults.color ?? "blue",
    title: defaults.title ?? "Section title",
    variant: defaults.variant ?? "normal",
    items: defaults.items ?? [{ text: "First item" }],
  };
}

export function createContactsDirectoryBlock(
  defaults: Partial<ContactsDirectoryBlock> = {}
): ContactsDirectoryBlock {
  return {
    type: "contacts-directory",
    categories: defaults.categories,
    searchable: defaults.searchable ?? true,
  };
}

export function createContactInfoBlock(
  defaults: Partial<ContactInfoBlock> = {}
): ContactInfoBlock {
  return {
    type: "contact-info",
    heading: defaults.heading,
    items: defaults.items ?? [
      {
        icon: "Phone",
        label: "Phone",
        value: "210-555-0100",
        kind: "phone",
      },
    ],
    columns: defaults.columns ?? 3,
  };
}

export function createHighlightCardBlock(
  defaults: Partial<HighlightCardBlock> = {}
): HighlightCardBlock {
  return {
    type: "highlight-card",
    icon: defaults.icon ?? "Info",
    title: defaults.title ?? "Important note",
    description: defaults.description ?? "Add a short, impactful message here.",
    variant: defaults.variant ?? "navy",
  };
}

export function createPhasesBlock(
  defaults: Partial<PhasesBlock> = {}
): PhasesBlock {
  return {
    type: "phases",
    badgeVariant: defaults.badgeVariant ?? "default",
    phases: defaults.phases ?? [
      {
        badge: "Day 1",
        title: "Phase 1",
        timeframe: "Day 1",
        items: ["First to-do item"],
      },
    ],
  };
}

export function createNumberedStepsBlock(
  defaults: Partial<NumberedStepsBlock> = {}
): NumberedStepsBlock {
  return {
    type: "numbered-steps",
    title: defaults.title,
    subtitle: defaults.subtitle,
    icon: defaults.icon,
    color: defaults.color ?? "military-blue",
    style: defaults.style ?? "numbered",
    steps: defaults.steps ?? [{ text: "First step" }],
  };
}

export function createScheduleGridBlock(
  defaults: Partial<ScheduleGridBlock> = {}
): ScheduleGridBlock {
  return {
    type: "schedule-grid",
    heading: defaults.heading,
    columns: defaults.columns ?? [
      {
        title: "Column",
        badgeVariant: "default",
        rows: [{ label: "Breakfast", value: "0600 - 0800" }],
      },
    ],
  };
}

export function createDefinitionCardsBlock(
  defaults: Partial<DefinitionCardsBlock> = {}
): DefinitionCardsBlock {
  return {
    type: "definition-cards",
    heading: defaults.heading,
    columns: defaults.columns ?? 2,
    cards: defaults.cards ?? [
      {
        badge: "CODE",
        title: "Title",
        description: "Describe this entry.",
      },
    ],
  };
}

export function createLocationsDirectoryBlock(
  defaults: Partial<LocationsDirectoryBlock> = {}
): LocationsDirectoryBlock {
  return {
    type: "locations-directory",
    heading: defaults.heading,
    categories: defaults.categories,
    columns: defaults.columns ?? 3,
  };
}

export function createFilesListBlock(
  defaults: Partial<FilesListBlock> = {}
): FilesListBlock {
  return {
    type: "files-list",
    heading: defaults.heading,
    columns: defaults.columns ?? 3,
  };
}

export function createLinkCollectionsListBlock(
  defaults: Partial<LinkCollectionsListBlock> = {}
): LinkCollectionsListBlock {
  return {
    type: "link-collections-list",
    heading: defaults.heading,
    columns: defaults.columns ?? 3,
    hideReserved: defaults.hideReserved ?? true,
  };
}

export function createProgramTiersBlock(
  defaults: Partial<ProgramTiersBlock> = {}
): ProgramTiersBlock {
  return {
    type: "program-tiers",
    tiers: defaults.tiers ?? [
      {
        badge: "Tier 1",
        color: "blue",
        title: "Tier title",
        description: "Describe this tier.",
        sections: [
          { title: "Requirements", items: ["First requirement"] },
          { title: "Responsibilities", items: ["First responsibility"] },
        ],
      },
    ],
  };
}

export function hrefForContact(item: ContactItem): string | null {
  switch (item.kind) {
    case "phone":
      return `tel:${item.value.replace(/[^0-9+]/g, "")}`;
    case "email":
      return `mailto:${item.value}`;
    case "url":
      return item.value;
    default:
      return null;
  }
}

export const BLOCK_TYPE_LABELS: Record<PageBlock["type"], string> = {
  html: "Text",
  roster: "Roster",
  "info-cards": "Info Cards",
  stats: "Stats",
  checklist: "Checklist",
  "contacts-directory": "Phone Directory",
  "contact-info": "Contact Info",
  "highlight-card": "Highlight Card",
  phases: "Phases",
  "numbered-steps": "Numbered Steps",
  "schedule-grid": "Schedule Grid",
  "definition-cards": "Definition Cards",
  "program-tiers": "Program Tiers",
  "locations-directory": "Locations",
  "files-list": "Files List",
  "link-collections-list": "Link Collections",
};

function truncate(text: string, max = 60): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

function htmlToPlain(html: string): string {
  return html.replace(/<[^>]+>/g, " ");
}

function plural(n: number, singular: string, plural?: string): string {
  return `${n} ${n === 1 ? singular : plural ?? `${singular}s`}`;
}

export function summarizeBlock(block: PageBlock): string {
  const label = BLOCK_TYPE_LABELS[block.type];

  switch (block.type) {
    case "html": {
      const text = truncate(htmlToPlain(block.html), 80);
      return text ? `${label} · ${text}` : `${label} · (empty)`;
    }
    case "roster":
      return `${label} · ${block.display}`;
    case "info-cards":
      return `${label} · ${plural(block.cards.length, "card")}${
        block.heading ? ` · "${truncate(block.heading, 30)}"` : ""
      }`;
    case "stats":
      return `${label} · ${plural(block.stats.length, "stat")}`;
    case "checklist":
      return `${label} · ${truncate(block.title, 40)} · ${plural(
        block.items.length,
        "item"
      )}`;
    case "contacts-directory":
      return `${label} · ${
        block.searchable ? "searchable" : "static"
      }`;
    case "contact-info":
      return `${label} · ${plural(block.items.length, "entry", "entries")}`;
    case "highlight-card":
      return `${label} · ${truncate(block.title, 50)}`;
    case "phases":
      return `${label} · ${plural(block.phases.length, "phase")}`;
    case "numbered-steps":
      return `${label}${
        block.title ? ` · ${truncate(block.title, 40)}` : ""
      } · ${plural(block.steps.length, "step")}`;
    case "schedule-grid":
      return `${label} · ${plural(block.columns.length, "column")}`;
    case "definition-cards":
      return `${label} · ${plural(block.cards.length, "card")}`;
    case "program-tiers":
      return `${label} · ${plural(block.tiers.length, "tier")}`;
    case "locations-directory":
      return `${label}${
        block.heading ? ` · "${truncate(block.heading, 30)}"` : ""
      }`;
    case "files-list":
      return `${label}${
        block.heading ? ` · "${truncate(block.heading, 30)}"` : ""
      }`;
    case "link-collections-list":
      return `${label}${
        block.heading ? ` · "${truncate(block.heading, 30)}"` : ""
      }`;
  }
}

export type BlockTypeMeta = {
  type: PageBlock["type"];
  label: string;
  description: string;
  create: () => PageBlock;
};

export const BLOCK_TYPE_CATALOG: BlockTypeMeta[] = [
  {
    type: "html",
    label: "Text",
    description: "Free-form paragraph or rich text.",
    create: () => createHtmlBlock(),
  },
  {
    type: "info-cards",
    label: "Info Cards",
    description: "Grid of icon + title + description tiles.",
    create: () => createInfoCardsBlock(),
  },
  {
    type: "stats",
    label: "Stats",
    description: "Big-number callouts with labels.",
    create: () => createStatsBlock(),
  },
  {
    type: "checklist",
    label: "Checklist",
    description: "Titled list of tasks or bullet items.",
    create: () => createChecklistBlock(),
  },
  {
    type: "contact-info",
    label: "Contact Info",
    description: "Phone / email / URL list.",
    create: () => createContactInfoBlock(),
  },
  {
    type: "contacts-directory",
    label: "Phone Directory",
    description: "Pulls the searchable contacts directory.",
    create: () => createContactsDirectoryBlock(),
  },
  {
    type: "highlight-card",
    label: "Highlight Card",
    description: "Single attention-grabbing call-out.",
    create: () => createHighlightCardBlock(),
  },
  {
    type: "phases",
    label: "Phases",
    description: "Timeline / phased breakdown of a process.",
    create: () => createPhasesBlock(),
  },
  {
    type: "numbered-steps",
    label: "Numbered Steps",
    description: "Ordered step-by-step instructions.",
    create: () => createNumberedStepsBlock(),
  },
  {
    type: "schedule-grid",
    label: "Schedule Grid",
    description: "Side-by-side schedule columns.",
    create: () => createScheduleGridBlock(),
  },
  {
    type: "definition-cards",
    label: "Definition Cards",
    description: "Glossary-style code + title + description cards.",
    create: () => createDefinitionCardsBlock(),
  },
  {
    type: "program-tiers",
    label: "Program Tiers",
    description: "Multi-tier program with requirements & responsibilities.",
    create: () => createProgramTiersBlock(),
  },
  {
    type: "locations-directory",
    label: "Locations",
    description: "Pulls the locations directory by category.",
    create: () => createLocationsDirectoryBlock(),
  },
  {
    type: "files-list",
    label: "Files List",
    description: "List of downloadable files.",
    create: () => createFilesListBlock(),
  },
  {
    type: "link-collections-list",
    label: "Link Collections",
    description: "List of link-collection tiles.",
    create: () => createLinkCollectionsListBlock(),
  },
  {
    type: "roster",
    label: "Roster",
    description: "Leadership / MTL hub or grid.",
    create: () => createRosterBlock(),
  },
];
