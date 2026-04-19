"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import { IconPicker, ColorPicker } from "./icon-color-pickers";
import type {
  NumberedStepsBlock,
  NumberedStep,
  NumberedStepsStyle,
} from "@/lib/content-blocks";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const STYLES: { value: NumberedStepsStyle; label: string; helper: string }[] = [
  {
    value: "numbered",
    label: "Numbered circles (1, 2, 3…)",
    helper: "Best for ordered steps like formation routes.",
  },
  {
    value: "dot",
    label: "Dots with time badges",
    helper: "Best for stop lists like shuttle routes.",
  },
];

export function NumberedStepsEditor({
  block,
  onChange,
}: {
  block: NumberedStepsBlock;
  onChange: (next: NumberedStepsBlock) => void;
}) {
  function updateStep(index: number, patch: Partial<NumberedStep>) {
    const next = block.steps.slice();
    next[index] = { ...next[index], ...patch };
    onChange({ ...block, steps: next });
  }

  function moveStep(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= block.steps.length) return;
    const next = block.steps.slice();
    [next[index], next[target]] = [next[target], next[index]];
    onChange({ ...block, steps: next });
  }

  function removeStep(index: number) {
    onChange({ ...block, steps: block.steps.filter((_, i) => i !== index) });
  }

  function addStep() {
    onChange({ ...block, steps: [...block.steps, { text: "" }] });
  }

  const selectedStyle = STYLES.find((s) => s.value === block.style);
  const showBadges = block.style === "dot";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Title (optional)</label>
          <Input
            value={block.title ?? ""}
            onChange={(e) =>
              onChange({ ...block, title: e.target.value || undefined })
            }
            placeholder="e.g. Daily Formation Route"
          />
        </div>
        <IconPicker
          value={block.icon ?? "Route"}
          onChange={(icon) => onChange({ ...block, icon })}
          label="Title icon (optional)"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Subtitle (optional)</label>
        <Input
          value={block.subtitle ?? ""}
          onChange={(e) =>
            onChange({ ...block, subtitle: e.target.value || undefined })
          }
          placeholder="Short helper text shown under the title"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Style</label>
          <select
            value={block.style}
            onChange={(e) =>
              onChange({
                ...block,
                style: e.target.value as NumberedStepsStyle,
              })
            }
            className={selectClasses}
          >
            {STYLES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {selectedStyle && (
            <p className="text-xs text-muted-foreground">
              {selectedStyle.helper}
            </p>
          )}
        </div>
        <ColorPicker
          value={block.color}
          onChange={(color) => onChange({ ...block, color })}
          label="Accent color"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Steps</label>
        {block.steps.map((step, i) => (
          <div
            key={i}
            className="flex items-start gap-2 rounded-md border bg-muted/30 p-3"
          >
            <div className="flex-1 space-y-2">
              <Input
                value={step.text}
                onChange={(e) => updateStep(i, { text: e.target.value })}
                placeholder={`Step ${i + 1}`}
              />
              {showBadges && (
                <div className="space-y-1">
                  <label className="text-xs font-medium">
                    Right-side badge (e.g. time)
                  </label>
                  <Input
                    value={step.badge ?? ""}
                    onChange={(e) =>
                      updateStep(i, { badge: e.target.value || undefined })
                    }
                    placeholder="e.g. :05 / :35"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => moveStep(i, "up")}
                disabled={i === 0}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => moveStep(i, "down")}
                disabled={i === block.steps.length - 1}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => removeStep(i)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addStep}>
          <Plus className="h-4 w-4 mr-2" />
          Add Step
        </Button>
      </div>
    </div>
  );
}
