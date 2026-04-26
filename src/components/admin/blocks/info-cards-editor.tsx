"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { IconPicker, ColorPicker } from "./icon-color-pickers";
import { SortableList } from "@/components/admin/sortable-list";
import type { InfoCardsBlock, InfoCardItem } from "@/lib/content-blocks";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function InfoCardsEditor({
  block,
  onChange,
}: {
  block: InfoCardsBlock;
  onChange: (next: InfoCardsBlock) => void;
}) {
  function updateCard(index: number, patch: Partial<InfoCardItem>) {
    const next = block.cards.slice();
    next[index] = { ...next[index], ...patch };
    onChange({ ...block, cards: next });
  }

  function removeCard(index: number) {
    onChange({ ...block, cards: block.cards.filter((_, i) => i !== index) });
  }

  function addCard() {
    onChange({
      ...block,
      cards: [
        ...block.cards,
        {
          icon: "Info",
          color: "blue",
          title: "New card",
          description: "Describe this card.",
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
            placeholder="e.g. Resources &amp; Links"
          />
          <p className="text-xs text-muted-foreground">
            Shown above the card grid. Leave blank for no heading.
          </p>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Columns</label>
          <select
            value={block.columns}
            onChange={(e) =>
              onChange({
                ...block,
                columns: Number(e.target.value) as InfoCardsBlock["columns"],
              })
            }
            className={selectClasses}
          >
            <option value={1}>1 column</option>
            <option value={2}>2 columns</option>
            <option value={3}>3 columns</option>
            <option value={4}>4 columns</option>
          </select>
        </div>
      </div>

      <SortableList
        items={block.cards}
        getId={(_, i) => String(i)}
        onReorder={(next) => onChange({ ...block, cards: next })}
        className="space-y-3"
        renderItem={({ item, index, handle }) => (
          <div className="rounded-md border p-4 space-y-3 bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {handle}
                <span className="text-xs font-medium text-muted-foreground">
                  Card {index + 1}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => removeCard(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <IconPicker
                value={item.icon}
                onChange={(icon) => updateCard(index, { icon })}
              />
              <ColorPicker
                value={item.color}
                onChange={(color) => updateCard(index, { color })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={item.title}
                onChange={(e) => updateCard(index, { title: e.target.value })}
                placeholder="Card title"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={item.description}
                onChange={(e) =>
                  updateCard(index, { description: e.target.value })
                }
                placeholder="What is this card about?"
                rows={3}
                className={`${selectClasses} h-auto resize-y`}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Link URL (optional)
              </label>
              <Input
                value={item.url ?? ""}
                onChange={(e) =>
                  updateCard(index, { url: e.target.value || undefined })
                }
                placeholder="https://example.com or /other-page"
              />
              <p className="text-xs text-muted-foreground">
                If provided, the whole card becomes clickable.
              </p>
            </div>
          </div>
        )}
      />

      <Button type="button" variant="outline" size="sm" onClick={addCard}>
        <Plus className="h-4 w-4 mr-2" />
        Add Card
      </Button>
    </div>
  );
}
