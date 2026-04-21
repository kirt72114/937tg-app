"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import { IconPicker, ColorPicker } from "./icon-color-pickers";
import type {
  ChecklistBlock,
  ChecklistItem,
  ChecklistVariant,
} from "@/lib/content-blocks";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const VARIANTS: { value: ChecklistVariant; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "warning", label: "Warning (red border)" },
  { value: "success", label: "Success (green border)" },
  { value: "info", label: "Info (blue border)" },
  { value: "tips", label: "Tips (gold border, lightbulb)" },
];

export function ChecklistEditor({
  block,
  onChange,
}: {
  block: ChecklistBlock;
  onChange: (next: ChecklistBlock) => void;
}) {
  function updateItem(index: number, patch: Partial<ChecklistItem>) {
    const next = block.items.slice();
    next[index] = { ...next[index], ...patch };
    onChange({ ...block, items: next });
  }

  function moveItem(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= block.items.length) return;
    const next = block.items.slice();
    [next[index], next[target]] = [next[target], next[index]];
    onChange({ ...block, items: next });
  }

  function removeItem(index: number) {
    onChange({ ...block, items: block.items.filter((_, i) => i !== index) });
  }

  function addItem() {
    onChange({ ...block, items: [...block.items, { text: "" }] });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Title</label>
        <Input
          value={block.title}
          onChange={(e) => onChange({ ...block, title: e.target.value })}
          placeholder="e.g. Standards of Conduct"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IconPicker
          value={block.icon}
          onChange={(icon) => onChange({ ...block, icon })}
        />
        <ColorPicker
          value={block.color}
          onChange={(color) => onChange({ ...block, color })}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Variant</label>
        <select
          value={block.variant}
          onChange={(e) =>
            onChange({ ...block, variant: e.target.value as ChecklistVariant })
          }
          className={selectClasses}
        >
          {VARIANTS.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground">
          Use Warning for critical rules and Info for gentle guidance.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Items</label>
        {block.items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-2 rounded-md border bg-muted/30 p-3"
          >
            <div className="flex-1 space-y-2">
              <div className="space-y-1">
                <label className="text-xs font-medium">Item {i + 1}</label>
                <Input
                  value={item.text}
                  onChange={(e) => updateItem(i, { text: e.target.value })}
                  placeholder="Main text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">
                  Sub-text (optional)
                </label>
                <Input
                  value={item.subtext ?? ""}
                  onChange={(e) =>
                    updateItem(i, { subtext: e.target.value || undefined })
                  }
                  placeholder="Smaller details shown under the main text"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => moveItem(i, "up")}
                disabled={i === 0}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => moveItem(i, "down")}
                disabled={i === block.items.length - 1}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => removeItem(i)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addItem}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </div>
  );
}
