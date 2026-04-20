"use client";

import { Input } from "@/components/ui/input";
import type { FilesListBlock } from "@/lib/content-blocks";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function FilesListEditor({
  block,
  onChange,
}: {
  block: FilesListBlock;
  onChange: (next: FilesListBlock) => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Shows every uploaded file from the public storage bucket. Upload and
        manage files under <span className="font-medium">Admin → Files</span>.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Heading (optional)</label>
          <Input
            value={block.heading ?? ""}
            onChange={(e) =>
              onChange({ ...block, heading: e.target.value || undefined })
            }
            placeholder="e.g. Forms & Documents"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Columns</label>
          <select
            value={block.columns}
            onChange={(e) =>
              onChange({
                ...block,
                columns: Number(e.target.value) as FilesListBlock["columns"],
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
    </div>
  );
}
