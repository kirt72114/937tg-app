"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import { IconPicker, ColorPicker } from "./icon-color-pickers";
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

  function moveCard(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= block.cards.length) return;
    const next = block.cards.slice();
    [next[index], next[target]] = [next[target], next[index]];
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

      <div className="space-y-3">
        {block.cards.map((card, i) => (
          <div key={i} className="rounded-md border p-4 space-y-3 bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Card {i + 1}
              </span>
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => moveCard(i, "up")}
                  disabled={i === 0}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => moveCard(i, "down")}
                  disabled={i === block.cards.length - 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive hover:text-destructive"
                  onClick={() => removeCard(i)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <IconPicker
                value={card.icon}
                onChange={(icon) => updateCard(i, { icon })}
              />
              <ColorPicker
                value={card.color}
                onChange={(color) => updateCard(i, { color })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={card.title}
                onChange={(e) => updateCard(i, { title: e.target.value })}
                placeholder="Card title"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={card.description}
                onChange={(e) =>
                  updateCard(i, { description: e.target.value })
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
                value={card.url ?? ""}
                onChange={(e) =>
                  updateCard(i, { url: e.target.value || undefined })
                }
                placeholder="https://example.com or /other-page"
              />
              <p className="text-xs text-muted-foreground">
                If provided, the whole card becomes clickable.
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={addCard}>
        <Plus className="h-4 w-4 mr-2" />
        Add Card
      </Button>
    </div>
  );
}
