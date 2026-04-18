export type RichTextBlock = {
  type: "richText";
  data: { html: string };
};

export type InfoCardBlock = {
  type: "infoCard";
  data: {
    icon?: string;
    iconColor?: string;
    title: string;
    text: string;
  };
};

export type ListCardBlock = {
  type: "listCard";
  data: {
    icon?: string;
    iconColor?: string;
    title: string;
    variant?: "default" | "warning" | "critical" | "tip";
    items: Array<string | { title: string; description: string }>;
  };
};

export type CalloutBlock = {
  type: "callout";
  data: {
    variant: "info" | "warning" | "critical" | "tip";
    title?: string;
    text: string;
  };
};

export type ContactGridBlock = {
  type: "contactGrid";
  data: {
    columns?: number;
    entries: Array<{
      icon?: string;
      iconColor?: string;
      label: string;
      value: string;
      subtext?: string;
      href?: string;
    }>;
  };
};

export type StepsCardBlock = {
  type: "stepsCard";
  data: {
    badge: string;
    title: string;
    timeframe?: string;
    items: string[];
  };
};

export type CtaBannerBlock = {
  type: "ctaBanner";
  data: {
    icon?: string;
    title: string;
    text: string;
    variant?: "dark" | "blue" | "gold";
  };
};

export type ResourceGridBlock = {
  type: "resourceGrid";
  data: {
    columns?: number;
    resources: Array<{
      icon?: string;
      iconColor?: string;
      title: string;
      description: string;
      url: string;
    }>;
  };
};

export type StatsGridBlock = {
  type: "statsGrid";
  data: {
    columns?: number;
    stats: Array<{
      label: string;
      value: string;
    }>;
  };
};

export type CardGridBlock = {
  type: "cardGrid";
  data: {
    columns?: number;
    heading?: string;
    cards: Array<{
      icon?: string;
      iconColor?: string;
      title: string;
      description: string;
    }>;
  };
};

export type ContentBlock =
  | RichTextBlock
  | InfoCardBlock
  | ListCardBlock
  | CalloutBlock
  | ContactGridBlock
  | StepsCardBlock
  | CtaBannerBlock
  | ResourceGridBlock
  | StatsGridBlock
  | CardGridBlock;

export type BlockContent = { blocks: ContentBlock[] };
export type LegacyContent = { html: string };

export function isBlockContent(content: unknown): content is BlockContent {
  return (
    typeof content === "object" &&
    content !== null &&
    "blocks" in content &&
    Array.isArray((content as BlockContent).blocks)
  );
}

export function isLegacyContent(content: unknown): content is LegacyContent {
  return (
    typeof content === "object" &&
    content !== null &&
    "html" in content &&
    typeof (content as LegacyContent).html === "string"
  );
}

export const BLOCK_TYPE_META: Record<
  ContentBlock["type"],
  { label: string; description: string }
> = {
  richText: {
    label: "Rich Text",
    description: "Free-form text with formatting",
  },
  infoCard: {
    label: "Info Card",
    description: "Card with icon, title, and description",
  },
  listCard: {
    label: "List Card",
    description: "Card with title and bulleted list",
  },
  callout: { label: "Callout", description: "Highlighted callout box" },
  contactGrid: {
    label: "Contact Grid",
    description: "Grid of contact information cards",
  },
  stepsCard: {
    label: "Steps Card",
    description: "Numbered phase or step with checklist",
  },
  ctaBanner: {
    label: "CTA Banner",
    description: "Full-width banner with call to action",
  },
  resourceGrid: {
    label: "Resource Grid",
    description: "Grid of linked resource cards",
  },
  statsGrid: {
    label: "Stats Grid",
    description: "Grid of small stat cards with label and value",
  },
  cardGrid: {
    label: "Card Grid",
    description: "Grid of info cards with icon, title, and description",
  },
};

export const COLOR_OPTIONS = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
  { value: "amber", label: "Amber" },
  { value: "purple", label: "Purple" },
  { value: "teal", label: "Teal" },
  { value: "indigo", label: "Indigo" },
  { value: "pink", label: "Pink" },
] as const;

export function getColorClasses(color?: string) {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-200",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-200",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      border: "border-amber-200",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      border: "border-purple-200",
    },
    teal: {
      bg: "bg-teal-100",
      text: "text-teal-700",
      border: "border-teal-200",
    },
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-700",
      border: "border-indigo-200",
    },
    pink: {
      bg: "bg-pink-100",
      text: "text-pink-700",
      border: "border-pink-200",
    },
  };
  return map[color || "blue"] || map.blue;
}

export function createDefaultBlock(type: ContentBlock["type"]): ContentBlock {
  switch (type) {
    case "richText":
      return { type, data: { html: "" } };
    case "infoCard":
      return {
        type,
        data: { icon: "Info", iconColor: "blue", title: "", text: "" },
      };
    case "listCard":
      return {
        type,
        data: {
          icon: "CheckCircle2",
          iconColor: "blue",
          title: "",
          variant: "default",
          items: [],
        },
      };
    case "callout":
      return { type, data: { variant: "info", title: "", text: "" } };
    case "contactGrid":
      return { type, data: { columns: 3, entries: [] } };
    case "stepsCard":
      return { type, data: { badge: "", title: "", items: [] } };
    case "ctaBanner":
      return { type, data: { title: "", text: "", variant: "dark" } };
    case "resourceGrid":
      return { type, data: { columns: 3, resources: [] } };
    case "statsGrid":
      return { type, data: { columns: 3, stats: [] } };
    case "cardGrid":
      return { type, data: { columns: 3, cards: [] } };
  }
}
