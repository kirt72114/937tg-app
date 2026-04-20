"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getLocations } from "@/lib/actions/locations";
import type { LocationsDirectoryBlock } from "@/lib/content-blocks";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function LocationsDirectoryEditor({
  block,
  onChange,
}: {
  block: LocationsDirectoryBlock;
  onChange: (next: LocationsDirectoryBlock) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const locs = await getLocations();
      const unique = [...new Set(locs.map((l) => l.category))].sort();
      setCategories(unique);
    }
    load();
  }, []);

  const selected = block.categories ?? [];

  function toggle(cat: string) {
    const next = selected.includes(cat)
      ? selected.filter((c) => c !== cat)
      : [...selected, cat];
    onChange({ ...block, categories: next.length > 0 ? next : undefined });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Pulls from the Locations directory. Manage individual entries under{" "}
        <span className="font-medium">Admin → Locations</span>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Heading (optional)</label>
          <Input
            value={block.heading ?? ""}
            onChange={(e) =>
              onChange({ ...block, heading: e.target.value || undefined })
            }
            placeholder="e.g. Key Facilities"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Columns</label>
          <select
            value={block.columns}
            onChange={(e) =>
              onChange({
                ...block,
                columns: Number(
                  e.target.value
                ) as LocationsDirectoryBlock["columns"],
              })
            }
            className={selectClasses}
          >
            <option value={1}>1 column</option>
            <option value={2}>2 columns</option>
            <option value={3}>3 columns</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Filter by category</label>
        <p className="text-xs text-muted-foreground">
          Pick categories to include. Select none to show every category.
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.length === 0 && (
            <span className="text-xs text-muted-foreground">
              No location categories yet.
            </span>
          )}
          {categories.map((cat) => {
            const isOn = selected.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggle(cat)}
                className="focus:outline-none"
              >
                <Badge
                  variant={isOn ? "default" : "outline"}
                  className="cursor-pointer"
                >
                  {cat}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
