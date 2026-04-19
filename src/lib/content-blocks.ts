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

export type ChecklistBlock = {
  type: "checklist";
  icon: string;
  color: string;
  title: string;
  variant: ChecklistVariant;
  items: string[];
};

export type ContactsDirectoryBlock = {
  type: "contacts-directory";
  categories?: string[]; // empty/omitted = show all
  searchable: boolean;
};

export type PageBlock =
  | HtmlBlock
  | RosterBlock
  | InfoCardsBlock
  | StatsBlock
  | ChecklistBlock
  | ContactsDirectoryBlock;

export type PageBlocksContent = { blocks: PageBlock[] };

export function normalizeBlocks(
  content: Prisma.JsonValue | null | undefined
): PageBlock[] {
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return [];
  }
  const obj = content as Record<string, unknown>;

  if (Array.isArray(obj.blocks)) {
    return obj.blocks.filter(isPageBlock);
  }
  if (typeof obj.html === "string") {
    return [{ type: "html", html: obj.html }];
  }
  return [];
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
    items: defaults.items ?? ["First item"],
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

function isPageBlock(value: unknown): value is PageBlock {
  if (!value || typeof value !== "object") return false;
  const b = value as Record<string, unknown>;

  switch (b.type) {
    case "html":
      return typeof b.html === "string";

    case "roster": {
      const display = b.display;
      return (
        (display === "leadership-squadrons" ||
          display === "mtl-cards" ||
          display === "simple-grid") &&
        typeof b.filter === "object" &&
        b.filter !== null
      );
    }

    case "info-cards":
      return Array.isArray(b.cards);

    case "stats":
      return Array.isArray(b.stats);

    case "checklist":
      return Array.isArray(b.items) && typeof b.title === "string";

    case "contacts-directory":
      return true;

    default:
      return false;
  }
}
