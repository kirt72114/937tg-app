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

export type ChecklistVariant = "normal" | "warning" | "success" | "info";

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

export type PageBlock =
  | HtmlBlock
  | RosterBlock
  | InfoCardsBlock
  | StatsBlock
  | ChecklistBlock
  | ContactsDirectoryBlock
  | ContactInfoBlock
  | HighlightCardBlock;

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
