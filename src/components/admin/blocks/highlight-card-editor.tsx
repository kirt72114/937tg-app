"use client";

import { Input } from "@/components/ui/input";
import { IconPicker } from "./icon-color-pickers";
import type {
  HighlightCardBlock,
  HighlightVariant,
} from "@/lib/content-blocks";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const VARIANTS: { value: HighlightVariant; label: string; helper: string }[] = [
  {
    value: "navy",
    label: "Navy (prominent)",
    helper: "Dark navy background with gold accents — for hero callouts.",
  },
  {
    value: "warning",
    label: "Warning (amber)",
    helper: "Amber border — use for cautionary reminders.",
  },
  {
    value: "info",
    label: "Info (blue)",
    helper: "Blue border — neutral informational callout.",
  },
  {
    value: "success",
    label: "Success (green)",
    helper: "Green border — for reassurance or affirmations.",
  },
];

export function HighlightCardEditor({
  block,
  onChange,
}: {
  block: HighlightCardBlock;
  onChange: (next: HighlightCardBlock) => void;
}) {
  const selectedVariant = VARIANTS.find((v) => v.value === block.variant);

  return (
    <div className="space-y-4">
      <IconPicker
        value={block.icon}
        onChange={(icon) => onChange({ ...block, icon })}
      />
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Title</label>
        <Input
          value={block.title}
          onChange={(e) => onChange({ ...block, title: e.target.value })}
          placeholder="e.g. Your Right to Counsel"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={block.description}
          onChange={(e) => onChange({ ...block, description: e.target.value })}
          placeholder="Short, impactful message shown centered below the title."
          rows={3}
          className={`${selectClasses} h-auto resize-y`}
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Style</label>
        <select
          value={block.variant}
          onChange={(e) =>
            onChange({ ...block, variant: e.target.value as HighlightVariant })
          }
          className={selectClasses}
        >
          {VARIANTS.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
        {selectedVariant && (
          <p className="text-xs text-muted-foreground">
            {selectedVariant.helper}
          </p>
        )}
      </div>
    </div>
  );
}
