"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { SortableList } from "@/components/admin/sortable-list";
import type { StatsBlock, StatItem } from "@/lib/content-blocks";

export function StatsEditor({
  block,
  onChange,
}: {
  block: StatsBlock;
  onChange: (next: StatsBlock) => void;
}) {
  function updateStat(index: number, patch: Partial<StatItem>) {
    const next = block.stats.slice();
    next[index] = { ...next[index], ...patch };
    onChange({ ...block, stats: next });
  }

  function removeStat(index: number) {
    onChange({ ...block, stats: block.stats.filter((_, i) => i !== index) });
  }

  function addStat() {
    onChange({
      ...block,
      stats: [...block.stats, { value: "0", label: "Stat" }],
    });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Heading (optional)</label>
        <Input
          value={block.heading ?? ""}
          onChange={(e) =>
            onChange({ ...block, heading: e.target.value || undefined })
          }
          placeholder="e.g. By the Numbers"
        />
      </div>

      <SortableList
        items={block.stats}
        getId={(_, i) => String(i)}
        onReorder={(next) => onChange({ ...block, stats: next })}
        className="space-y-2"
        renderItem={({ item, index, handle }) => (
          <div className="flex items-start gap-2 rounded-md border bg-muted/30 p-3">
            <div className="pt-5">{handle}</div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-medium">Value</label>
                <Input
                  value={item.value}
                  onChange={(e) => updateStat(index, { value: e.target.value })}
                  placeholder="e.g. 28,000+"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Label</label>
                <Input
                  value={item.label}
                  onChange={(e) => updateStat(index, { label: e.target.value })}
                  placeholder="e.g. Annual Graduates"
                />
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive mt-5"
              onClick={() => removeStat(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      />

      <Button type="button" variant="outline" size="sm" onClick={addStat}>
        <Plus className="h-4 w-4 mr-2" />
        Add Stat
      </Button>
    </div>
  );
}
