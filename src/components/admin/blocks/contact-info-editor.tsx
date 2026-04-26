"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { IconPicker } from "./icon-color-pickers";
import { SortableList } from "@/components/admin/sortable-list";
import type {
  ContactInfoBlock,
  ContactItem,
  ContactKind,
} from "@/lib/content-blocks";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const KINDS: { value: ContactKind; label: string; helper: string }[] = [
  { value: "phone", label: "Phone number", helper: "Tapping calls the number." },
  { value: "email", label: "Email address", helper: "Tapping opens the user's mail app." },
  { value: "url", label: "Website / Link", helper: "Tapping opens the link in a new tab." },
  { value: "text", label: "Plain text (no link)", helper: "Displays as read-only text." },
];

export function ContactInfoEditor({
  block,
  onChange,
}: {
  block: ContactInfoBlock;
  onChange: (next: ContactInfoBlock) => void;
}) {
  function updateItem(index: number, patch: Partial<ContactItem>) {
    const next = block.items.slice();
    next[index] = { ...next[index], ...patch };
    onChange({ ...block, items: next });
  }

  function removeItem(index: number) {
    onChange({ ...block, items: block.items.filter((_, i) => i !== index) });
  }

  function addItem() {
    onChange({
      ...block,
      items: [
        ...block.items,
        {
          icon: "Phone",
          label: "Phone",
          value: "",
          kind: "phone",
        },
      ],
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Heading (optional)</label>
          <Input
            value={block.heading ?? ""}
            onChange={(e) =>
              onChange({ ...block, heading: e.target.value || undefined })
            }
            placeholder="e.g. Contact"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Columns</label>
          <select
            value={block.columns}
            onChange={(e) =>
              onChange({
                ...block,
                columns: Number(e.target.value) as ContactInfoBlock["columns"],
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

      <SortableList
        items={block.items}
        getId={(_, i) => String(i)}
        onReorder={(next) => onChange({ ...block, items: next })}
        className="space-y-3"
        renderItem={({ item, index, handle }) => {
          const kindDef = KINDS.find((k) => k.value === item.kind);
          return (
            <div className="rounded-md border p-4 space-y-3 bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {handle}
                  <span className="text-xs font-medium text-muted-foreground">
                    Contact {index + 1}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive hover:text-destructive"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <IconPicker
                  value={item.icon}
                  onChange={(icon) => updateItem(index, { icon })}
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Type</label>
                  <select
                    value={item.kind}
                    onChange={(e) =>
                      updateItem(index, { kind: e.target.value as ContactKind })
                    }
                    className={selectClasses}
                  >
                    {KINDS.map((k) => (
                      <option key={k.value} value={k.value}>
                        {k.label}
                      </option>
                    ))}
                  </select>
                  {kindDef && (
                    <p className="text-xs text-muted-foreground">
                      {kindDef.helper}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Label</label>
                  <Input
                    value={item.label}
                    onChange={(e) =>
                      updateItem(index, { label: e.target.value })
                    }
                    placeholder="e.g. Phone"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Value</label>
                  <Input
                    value={item.value}
                    onChange={(e) =>
                      updateItem(index, { value: e.target.value })
                    }
                    placeholder={
                      item.kind === "phone"
                        ? "e.g. 210-808-3300"
                        : item.kind === "email"
                        ? "name@example.com"
                        : item.kind === "url"
                        ? "https://example.com"
                        : "Text to display"
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Sub-label (optional)
                </label>
                <Input
                  value={item.sublabel ?? ""}
                  onChange={(e) =>
                    updateItem(index, {
                      sublabel: e.target.value || undefined,
                    })
                  }
                  placeholder="Smaller hint shown under the value"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <Input
                  type="checkbox"
                  checked={item.emphasize ?? false}
                  onChange={(e) =>
                    updateItem(index, {
                      emphasize: e.target.checked || undefined,
                    })
                  }
                  className="h-4 w-4"
                />
                Highlight this contact (larger text, red border) — good for emergency numbers
              </label>
            </div>
          );
        }}
      />

      <Button type="button" variant="outline" size="sm" onClick={addItem}>
        <Plus className="h-4 w-4 mr-2" />
        Add Contact
      </Button>
    </div>
  );
}
