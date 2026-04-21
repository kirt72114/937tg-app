"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import { IconPicker } from "./icon-color-pickers";
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

      <div className="space-y-3">
        {block.items.map((item, i) => {
          const kindDef = KINDS.find((k) => k.value === item.kind);
          return (
            <div
              key={i}
              className="rounded-md border p-4 space-y-3 bg-muted/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Contact {i + 1}
                </span>
                <div className="flex gap-1">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <IconPicker
                  value={item.icon}
                  onChange={(icon) => updateItem(i, { icon })}
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Type</label>
                  <select
                    value={item.kind}
                    onChange={(e) =>
                      updateItem(i, { kind: e.target.value as ContactKind })
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
                    onChange={(e) => updateItem(i, { label: e.target.value })}
                    placeholder="e.g. Phone"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Value</label>
                  <Input
                    value={item.value}
                    onChange={(e) => updateItem(i, { value: e.target.value })}
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
                <label className="text-sm font-medium">Sub-label (optional)</label>
                <Input
                  value={item.sublabel ?? ""}
                  onChange={(e) =>
                    updateItem(i, { sublabel: e.target.value || undefined })
                  }
                  placeholder="Smaller hint shown under the value"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <Input
                  type="checkbox"
                  checked={item.emphasize ?? false}
                  onChange={(e) =>
                    updateItem(i, { emphasize: e.target.checked || undefined })
                  }
                  className="h-4 w-4"
                />
                Highlight this contact (larger text, red border) — good for emergency numbers
              </label>
            </div>
          );
        })}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={addItem}>
        <Plus className="h-4 w-4 mr-2" />
        Add Contact
      </Button>
    </div>
  );
}
