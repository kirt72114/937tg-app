"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
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

  function moveStat(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= block.stats.length) return;
    const next = block.stats.slice();
    [next[index], next[target]] = [next[target], next[index]];
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

      <div className="space-y-2">
        {block.stats.map((stat, i) => (
          <div
            key={i}
            className="flex items-start gap-2 rounded-md border bg-muted/30 p-3"
          >
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-medium">Value</label>
                <Input
                  value={stat.value}
                  onChange={(e) => updateStat(i, { value: e.target.value })}
                  placeholder="e.g. 28,000+"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Label</label>
                <Input
                  value={stat.label}
                  onChange={(e) => updateStat(i, { label: e.target.value })}
                  placeholder="e.g. Annual Graduates"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 pt-5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => moveStat(i, "up")}
                disabled={i === 0}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => moveStat(i, "down")}
                disabled={i === block.stats.length - 1}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => removeStat(i)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={addStat}>
        <Plus className="h-4 w-4 mr-2" />
        Add Stat
      </Button>
    </div>
  );
}
