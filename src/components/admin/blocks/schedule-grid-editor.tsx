"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { SortableList } from "@/components/admin/sortable-list";
import type {
  ScheduleGridBlock,
  ScheduleColumn,
  ScheduleRow,
} from "@/lib/content-blocks";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const BADGE_VARIANTS: { value: ScheduleColumn["badgeVariant"]; label: string }[] =
  [
    { value: "default", label: "Solid (military blue)" },
    { value: "secondary", label: "Soft gray" },
    { value: "outline", label: "Outline" },
  ];

export function ScheduleGridEditor({
  block,
  onChange,
}: {
  block: ScheduleGridBlock;
  onChange: (next: ScheduleGridBlock) => void;
}) {
  function updateColumn(index: number, patch: Partial<ScheduleColumn>) {
    const next = block.columns.slice();
    next[index] = { ...next[index], ...patch };
    onChange({ ...block, columns: next });
  }

  function updateRow(
    columnIndex: number,
    rowIndex: number,
    patch: Partial<ScheduleRow>
  ) {
    const col = block.columns[columnIndex];
    const rows = col.rows.slice();
    rows[rowIndex] = { ...rows[rowIndex], ...patch };
    updateColumn(columnIndex, { rows });
  }

  function addRow(columnIndex: number) {
    const col = block.columns[columnIndex];
    updateColumn(columnIndex, {
      rows: [...col.rows, { label: "", value: "" }],
    });
  }

  function removeRow(columnIndex: number, rowIndex: number) {
    const col = block.columns[columnIndex];
    updateColumn(columnIndex, {
      rows: col.rows.filter((_, i) => i !== rowIndex),
    });
  }

  function reorderRows(columnIndex: number, rows: ScheduleRow[]) {
    updateColumn(columnIndex, { rows });
  }

  function removeColumn(index: number) {
    onChange({
      ...block,
      columns: block.columns.filter((_, i) => i !== index),
    });
  }

  function addColumn() {
    onChange({
      ...block,
      columns: [
        ...block.columns,
        {
          title: "New schedule",
          badge: "",
          badgeVariant: "default",
          rows: [{ label: "", value: "" }],
        },
      ],
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
          placeholder="e.g. DFAC Hours"
        />
      </div>

      <SortableList
        items={block.columns}
        getId={(_, ci) => `col-${ci}`}
        onReorder={(next) => onChange({ ...block, columns: next })}
        className="space-y-3"
        renderItem={({ item: col, index: ci, handle: colHandle }) => (
          <div className="rounded-md border p-4 space-y-3 bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {colHandle}
                <span className="text-xs font-medium text-muted-foreground">
                  Schedule {ci + 1}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => removeColumn(ci)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={col.title}
                  onChange={(e) => updateColumn(ci, { title: e.target.value })}
                  placeholder="e.g. Weekday Schedule"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Badge (optional)</label>
                <Input
                  value={col.badge ?? ""}
                  onChange={(e) =>
                    updateColumn(ci, { badge: e.target.value || undefined })
                  }
                  placeholder="e.g. Mon - Fri"
                />
              </div>
            </div>
            {col.badge && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Badge style</label>
                <select
                  value={col.badgeVariant}
                  onChange={(e) =>
                    updateColumn(ci, {
                      badgeVariant: e.target
                        .value as ScheduleColumn["badgeVariant"],
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
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Entries</label>
              <SortableList
                items={col.rows}
                getId={(_, ri) => `col-${ci}-row-${ri}`}
                onReorder={(rows) => reorderRows(ci, rows)}
                className="space-y-2"
                renderItem={({ item: row, index: ri, handle: rowHandle }) => (
                  <div className="flex items-start gap-2">
                    <div className="pt-2">{rowHandle}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                      <Input
                        value={row.label}
                        onChange={(e) =>
                          updateRow(ci, ri, { label: e.target.value })
                        }
                        placeholder="Label (e.g. Breakfast)"
                      />
                      <Input
                        value={row.value}
                        onChange={(e) =>
                          updateRow(ci, ri, { value: e.target.value })
                        }
                        placeholder="Value (e.g. 0600 - 0800)"
                      />
                      <Input
                        value={row.notes ?? ""}
                        onChange={(e) =>
                          updateRow(ci, ri, {
                            notes: e.target.value || undefined,
                          })
                        }
                        placeholder="Notes (optional)"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-destructive hover:text-destructive"
                      onClick={() => removeRow(ci, ri)}
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
                onClick={() => addRow(ci)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </div>
          </div>
        )}
      />

      <Button type="button" variant="outline" size="sm" onClick={addColumn}>
        <Plus className="h-4 w-4 mr-2" />
        Add Schedule Column
      </Button>
    </div>
  );
}
