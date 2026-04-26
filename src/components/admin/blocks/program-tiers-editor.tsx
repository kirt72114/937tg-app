"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { ColorPicker } from "./icon-color-pickers";
import { SortableList } from "@/components/admin/sortable-list";
import type {
  ProgramTiersBlock,
  ProgramTierItem,
  ProgramTierSection,
} from "@/lib/content-blocks";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function ProgramTiersEditor({
  block,
  onChange,
}: {
  block: ProgramTiersBlock;
  onChange: (next: ProgramTiersBlock) => void;
}) {
  function updateTier(index: number, patch: Partial<ProgramTierItem>) {
    const next = block.tiers.slice();
    next[index] = { ...next[index], ...patch };
    onChange({ ...block, tiers: next });
  }

  function removeTier(index: number) {
    onChange({ ...block, tiers: block.tiers.filter((_, i) => i !== index) });
  }

  function addTier() {
    onChange({
      ...block,
      tiers: [
        ...block.tiers,
        {
          badge: "Tier",
          color: "blue",
          title: "Tier title",
          description: "Describe this tier.",
          sections: [
            { title: "Requirements", items: ["First requirement"] },
            { title: "Responsibilities", items: ["First responsibility"] },
          ],
        },
      ],
    });
  }

  function updateSection(
    tierIndex: number,
    sectionIndex: number,
    patch: Partial<ProgramTierSection>
  ) {
    const tier = block.tiers[tierIndex];
    const sections = tier.sections.slice();
    sections[sectionIndex] = { ...sections[sectionIndex], ...patch };
    updateTier(tierIndex, { sections });
  }

  function reorderSections(tierIndex: number, sections: ProgramTierSection[]) {
    updateTier(tierIndex, { sections });
  }

  function reorderSectionItems(
    tierIndex: number,
    sectionIndex: number,
    items: string[]
  ) {
    updateSection(tierIndex, sectionIndex, { items });
  }

  function updateSectionItem(
    tierIndex: number,
    sectionIndex: number,
    itemIndex: number,
    text: string
  ) {
    const section = block.tiers[tierIndex].sections[sectionIndex];
    const items = section.items.slice();
    items[itemIndex] = text;
    updateSection(tierIndex, sectionIndex, { items });
  }

  function addSectionItem(tierIndex: number, sectionIndex: number) {
    const section = block.tiers[tierIndex].sections[sectionIndex];
    updateSection(tierIndex, sectionIndex, { items: [...section.items, ""] });
  }

  function removeSectionItem(
    tierIndex: number,
    sectionIndex: number,
    itemIndex: number
  ) {
    const section = block.tiers[tierIndex].sections[sectionIndex];
    updateSection(tierIndex, sectionIndex, {
      items: section.items.filter((_, i) => i !== itemIndex),
    });
  }

  function addSection(tierIndex: number) {
    const tier = block.tiers[tierIndex];
    updateTier(tierIndex, {
      sections: [...tier.sections, { title: "Section", items: [""] }],
    });
  }

  function removeSection(tierIndex: number, sectionIndex: number) {
    const tier = block.tiers[tierIndex];
    updateTier(tierIndex, {
      sections: tier.sections.filter((_, i) => i !== sectionIndex),
    });
  }

  return (
    <div className="space-y-4">
      <SortableList
        items={block.tiers}
        getId={(_, i) => `tier-${i}`}
        onReorder={(next) => onChange({ ...block, tiers: next })}
        className="space-y-3"
        renderItem={({ item: tier, index: ti, handle: tierHandle }) => (
          <div className="rounded-md border p-4 space-y-3 bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {tierHandle}
                <span className="text-xs font-medium text-muted-foreground">
                  Tier {ti + 1}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => removeTier(ti)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Badge</label>
                <Input
                  value={tier.badge}
                  onChange={(e) => updateTier(ti, { badge: e.target.value })}
                  placeholder="e.g. Green Rope"
                />
              </div>
              <ColorPicker
                value={tier.color}
                onChange={(color) => updateTier(ti, { color })}
                label="Tier color"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={tier.title}
                onChange={(e) => updateTier(ti, { title: e.target.value })}
                placeholder="e.g. Green Rope - Peer Leader"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={tier.description}
                onChange={(e) =>
                  updateTier(ti, { description: e.target.value })
                }
                placeholder="What does this tier represent?"
                rows={3}
                className={`${selectClasses} h-auto resize-y`}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Sections</label>
              <SortableList
                items={tier.sections}
                getId={(_, si) => `tier-${ti}-section-${si}`}
                onReorder={(sections) => reorderSections(ti, sections)}
                className="space-y-2"
                renderItem={({
                  item: section,
                  index: si,
                  handle: sectionHandle,
                }) => (
                  <div className="rounded-md border bg-background p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      {sectionHandle}
                      <Input
                        value={section.title}
                        onChange={(e) =>
                          updateSection(ti, si, { title: e.target.value })
                        }
                        placeholder="Section title"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => removeSection(ti, si)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <SortableList
                      items={section.items}
                      getId={(_, ii) => `tier-${ti}-section-${si}-item-${ii}`}
                      onReorder={(items) =>
                        reorderSectionItems(ti, si, items)
                      }
                      className="space-y-2"
                      renderItem={({ item, index: ii, handle }) => (
                        <div className="flex items-start gap-2">
                          <div className="pt-2">{handle}</div>
                          <Input
                            value={item}
                            onChange={(e) =>
                              updateSectionItem(ti, si, ii, e.target.value)
                            }
                            placeholder={`Item ${ii + 1}`}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => removeSectionItem(ti, si, ii)}
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
                      onClick={() => addSectionItem(ti, si)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addSection(ti)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>
          </div>
        )}
      />

      <Button type="button" variant="outline" size="sm" onClick={addTier}>
        <Plus className="h-4 w-4 mr-2" />
        Add Tier
      </Button>
    </div>
  );
}
