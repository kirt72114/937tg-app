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
export type PageBlock = HtmlBlock | RosterBlock;

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

function isPageBlock(value: unknown): value is PageBlock {
  if (!value || typeof value !== "object") return false;
  const b = value as Record<string, unknown>;
  if (b.type === "html") {
    return typeof b.html === "string";
  }
  if (b.type === "roster") {
    const display = b.display;
    const filter = b.filter;
    return (
      (display === "leadership-squadrons" ||
        display === "mtl-cards" ||
        display === "simple-grid") &&
      typeof filter === "object" &&
      filter !== null
    );
  }
  return false;
}
