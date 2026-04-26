"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { SortableList } from "@/components/admin/sortable-list";
import type { PhasesBlock, Phase } from "@/lib/content-blocks";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const BADGE_VARIANTS: { value: PhasesBlock["badgeVariant"]; label: string }[] = [
  { value: "default", label: "Solid (military blue)" },
  { value: "secondary", label: "Soft gray" },
  { value: "outline", label: "Outline" },
];

export function PhasesEditor({
  block,
  onChange,
}: {
  block: PhasesBlock;
  onChange: (next: PhasesBlock) => void;
}) {
  function updatePhase(index: number, patch: Partial<Phase>) {
    const next = block.phases.slice();
    next[index] = { ...next[index], ...patch };
    onChange({ ...block, phases: next });
  }

  function updateItem(phaseIndex: number, itemIndex: number, text: string) {
    const phase = block.phases[phaseIndex];
    const items = phase.items.slice();
    items[itemIndex] = text;
    updatePhase(phaseIndex, { items });
  }

  function addItem(phaseIndex: number) {
    const phase = block.phases[phaseIndex];
    updatePhase(phaseIndex, { items: [...phase.items, ""] });
  }

  function removeItem(phaseIndex: number, itemIndex: number) {
    const phase = block.phases[phaseIndex];
    updatePhase(phaseIndex, {
      items: phase.items.filter((_, i) => i !== itemIndex),
    });
  }

  function reorderItems(phaseIndex: number, items: string[]) {
    updatePhase(phaseIndex, { items });
  }

  function removePhase(index: number) {
    onChange({
      ...block,
      phases: block.phases.filter((_, i) => i !== index),
    });
  }

  function addPhase() {
    onChange({
      ...block,
      phases: [
        ...block.phases,
        {
          badge: `Phase ${block.phases.length + 1}`,
          title: "New phase",
          timeframe: "",
          items: [""],
        },
      ],
    });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Badge style</label>
        <select
          value={block.badgeVariant}
          onChange={(e) =>
            onChange({
              ...block,
              badgeVariant: e.target.value as PhasesBlock["badgeVariant"],
            })
          }
          className={selectClasses}
        >
          {BADGE_VARIANTS.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      <SortableList
        items={block.phases}
        getId={(_, i) => `phase-${i}`}
        onReorder={(next) => onChange({ ...block, phases: next })}
        className="space-y-3"
        renderItem={({ item: phase, index: pi, handle: phaseHandle }) => (
          <div className="rounded-md border p-4 space-y-3 bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {phaseHandle}
                <span className="text-xs font-medium text-muted-foreground">
                  Phase {pi + 1}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => removePhase(pi)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Badge</label>
                <Input
                  value={phase.badge ?? ""}
                  onChange={(e) =>
                    updatePhase(pi, { badge: e.target.value || undefined })
                  }
                  placeholder="e.g. Day 1"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={phase.title}
                  onChange={(e) => updatePhase(pi, { title: e.target.value })}
                  placeholder="e.g. Phase 1: Arrival"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Timeframe (optional)
              </label>
              <Input
                value={phase.timeframe ?? ""}
                onChange={(e) =>
                  updatePhase(pi, { timeframe: e.target.value || undefined })
                }
                placeholder="e.g. Days 1-3"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Items</label>
              <SortableList
                items={phase.items}
                getId={(_, ii) => `phase-${pi}-item-${ii}`}
                onReorder={(items) => reorderItems(pi, items)}
                className="space-y-2"
                renderItem={({ item, index: ii, handle }) => (
                  <div className="flex items-start gap-2">
                    <div className="pt-2">{handle}</div>
                    <div className="flex-1">
                      <Input
                        value={item}
                        onChange={(e) => updateItem(pi, ii, e.target.value)}
                        placeholder={`Item ${ii + 1}`}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => removeItem(pi, ii)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addItem(pi)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        )}
      />

      <Button type="button" variant="outline" size="sm" onClick={addPhase}>
        <Plus className="h-4 w-4 mr-2" />
        Add Phase
      </Button>
    </div>
  );
}
