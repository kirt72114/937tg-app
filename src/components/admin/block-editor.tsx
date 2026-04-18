"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Plus,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Trash2,
  X,
  GripVertical,
} from "lucide-react";
import {
  type ContentBlock,
  type InfoCardBlock,
  type ListCardBlock,
  type CalloutBlock,
  type ContactGridBlock,
  type StepsCardBlock,
  type CtaBannerBlock,
  type ResourceGridBlock,
  BLOCK_TYPE_META,
  COLOR_OPTIONS,
  createDefaultBlock,
} from "@/lib/block-types";
import { blockIcons, iconNames } from "@/lib/block-icons";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

const selectClasses =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const textareaClasses =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y";

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    blocks.length === 0 ? null : 0
  );
  const [showAddMenu, setShowAddMenu] = useState(false);

  function updateBlock(index: number, block: ContentBlock) {
    const next = [...blocks];
    next[index] = block;
    onChange(next);
  }

  function removeBlock(index: number) {
    if (!confirm("Remove this block?")) return;
    const next = blocks.filter((_, i) => i !== index);
    onChange(next);
    setExpandedIndex(null);
  }

  function moveBlock(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
    setExpandedIndex(target);
  }

  function addBlock(type: ContentBlock["type"]) {
    const block = createDefaultBlock(type);
    const next = [...blocks, block];
    onChange(next);
    setExpandedIndex(next.length - 1);
    setShowAddMenu(false);
  }

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        const meta = BLOCK_TYPE_META[block.type];
        const isExpanded = expandedIndex === i;

        return (
          <Card key={i} className="relative">
            <div
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-muted/50 rounded-t-lg"
              onClick={() => setExpandedIndex(isExpanded ? null : i)}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {meta.label}
              </span>
              <span className="text-xs text-muted-foreground truncate flex-1">
                {getBlockSummary(block)}
              </span>
              <div
                className="flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  disabled={i === 0}
                  onClick={() => moveBlock(i, "up")}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  disabled={i === blocks.length - 1}
                  onClick={() => moveBlock(i, "down")}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive hover:text-destructive"
                  onClick={() => removeBlock(i)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
            {isExpanded && (
              <CardContent className="pt-2 pb-4 border-t">
                <BlockTypeEditor
                  block={block}
                  onChange={(b) => updateBlock(i, b)}
                />
              </CardContent>
            )}
          </Card>
        );
      })}

      <div className="relative">
        <Button
          variant="outline"
          className="w-full border-dashed"
          onClick={() => setShowAddMenu(!showAddMenu)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Block
        </Button>
        {showAddMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowAddMenu(false)}
            />
            <Card className="absolute z-50 top-full mt-1 w-full shadow-lg">
              <CardContent className="p-2">
                <div className="grid grid-cols-2 gap-1">
                  {(
                    Object.keys(BLOCK_TYPE_META) as ContentBlock["type"][]
                  ).map((type) => {
                    const meta = BLOCK_TYPE_META[type];
                    return (
                      <button
                        key={type}
                        onClick={() => addBlock(type)}
                        className="flex flex-col items-start rounded-md p-2.5 text-left hover:bg-muted transition-colors"
                      >
                        <span className="text-sm font-medium">
                          {meta.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {meta.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

function getBlockSummary(block: ContentBlock): string {
  switch (block.type) {
    case "richText":
      return block.data.html
        ? block.data.html.replace(/<[^>]+>/g, "").slice(0, 60)
        : "(empty)";
    case "infoCard":
      return block.data.title || "(untitled)";
    case "listCard":
      return `${block.data.title || "(untitled)"} — ${block.data.items.length} items`;
    case "callout":
      return `${block.data.variant}: ${block.data.title || block.data.text.slice(0, 40) || "(empty)"}`;
    case "contactGrid":
      return `${block.data.entries.length} entries`;
    case "stepsCard":
      return `${block.data.badge} ${block.data.title || "(untitled)"}`;
    case "ctaBanner":
      return block.data.title || "(untitled)";
    case "resourceGrid":
      return `${block.data.resources.length} resources`;
  }
}

function BlockTypeEditor({
  block,
  onChange,
}: {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}) {
  switch (block.type) {
    case "richText":
      return (
        <RichTextEditor
          content={block.data.html}
          onChange={(html) => onChange({ ...block, data: { html } })}
          placeholder="Write content here..."
        />
      );
    case "infoCard":
      return <InfoCardEditor data={block.data} onChange={(data) => onChange({ type: "infoCard", data })} />;
    case "listCard":
      return <ListCardEditor data={block.data} onChange={(data) => onChange({ type: "listCard", data })} />;
    case "callout":
      return <CalloutEditor data={block.data} onChange={(data) => onChange({ type: "callout", data })} />;
    case "contactGrid":
      return <ContactGridEditor data={block.data} onChange={(data) => onChange({ type: "contactGrid", data })} />;
    case "stepsCard":
      return <StepsCardEditor data={block.data} onChange={(data) => onChange({ type: "stepsCard", data })} />;
    case "ctaBanner":
      return <CtaBannerEditor data={block.data} onChange={(data) => onChange({ type: "ctaBanner", data })} />;
    case "resourceGrid":
      return <ResourceGridEditor data={block.data} onChange={(data) => onChange({ type: "resourceGrid", data })} />;
  }
}

function IconSelect({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  const SelectedIcon = value ? blockIcons[value] : null;
  return (
    <div className="flex items-center gap-2">
      {SelectedIcon && (
        <SelectedIcon className="h-4 w-4 text-muted-foreground shrink-0" />
      )}
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={selectClasses}
      >
        <option value="">No icon</option>
        {iconNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

function ColorSelect({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value || "blue"}
      onChange={(e) => onChange(e.target.value)}
      className={selectClasses}
    >
      {COLOR_OPTIONS.map((c) => (
        <option key={c.value} value={c.value}>
          {c.label}
        </option>
      ))}
    </select>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-medium text-muted-foreground">{children}</label>;
}

// --- Block Type Editors ---

function InfoCardEditor({
  data,
  onChange,
}: {
  data: InfoCardBlock["data"];
  onChange: (data: InfoCardBlock["data"]) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <FieldLabel>Icon</FieldLabel>
          <IconSelect
            value={data.icon}
            onChange={(icon) => onChange({ ...data, icon })}
          />
        </div>
        <div className="space-y-1">
          <FieldLabel>Icon Color</FieldLabel>
          <ColorSelect
            value={data.iconColor}
            onChange={(iconColor) => onChange({ ...data, iconColor })}
          />
        </div>
      </div>
      <div className="space-y-1">
        <FieldLabel>Title</FieldLabel>
        <Input
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="Card title"
        />
      </div>
      <div className="space-y-1">
        <FieldLabel>Description</FieldLabel>
        <textarea
          value={data.text}
          onChange={(e) => onChange({ ...data, text: e.target.value })}
          className={cn(textareaClasses, "min-h-[80px]")}
          placeholder="Card description text..."
        />
      </div>
    </div>
  );
}

function ListCardEditor({
  data,
  onChange,
}: {
  data: ListCardBlock["data"];
  onChange: (data: ListCardBlock["data"]) => void;
}) {
  const hasDetailItems =
    data.items.length > 0 && typeof data.items[0] === "object";
  const [detailMode, setDetailMode] = useState(hasDetailItems);

  function setItems(items: typeof data.items) {
    onChange({ ...data, items });
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <FieldLabel>Icon</FieldLabel>
          <IconSelect
            value={data.icon}
            onChange={(icon) => onChange({ ...data, icon })}
          />
        </div>
        <div className="space-y-1">
          <FieldLabel>Icon Color</FieldLabel>
          <ColorSelect
            value={data.iconColor}
            onChange={(iconColor) => onChange({ ...data, iconColor })}
          />
        </div>
      </div>
      <div className="space-y-1">
        <FieldLabel>Title</FieldLabel>
        <Input
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="Section title"
        />
      </div>
      <div className="space-y-1">
        <FieldLabel>Style</FieldLabel>
        <div className="flex gap-2">
          {(["default", "warning", "critical", "tip"] as const).map((v) => (
            <button
              key={v}
              onClick={() => onChange({ ...data, variant: v })}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md border transition-colors capitalize",
                data.variant === v || (!data.variant && v === "default")
                  ? "bg-primary text-primary-foreground border-primary"
                  : "hover:bg-muted"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <FieldLabel>Items</FieldLabel>
          <label className="flex items-center gap-1.5 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={detailMode}
              onChange={(e) => {
                setDetailMode(e.target.checked);
                if (e.target.checked && !hasDetailItems) {
                  setItems(
                    (data.items as string[]).map((s) => ({
                      title: s,
                      description: "",
                    }))
                  );
                } else if (!e.target.checked && hasDetailItems) {
                  setItems(
                    (
                      data.items as Array<{
                        title: string;
                        description: string;
                      }>
                    ).map((item) => item.title)
                  );
                }
              }}
              className="rounded"
            />
            Title + Description
          </label>
        </div>
        {detailMode ? (
          <DetailItemsEditor
            items={
              data.items as Array<{ title: string; description: string }>
            }
            onChange={setItems}
          />
        ) : (
          <textarea
            value={(data.items as string[]).join("\n")}
            onChange={(e) =>
              setItems(e.target.value.split("\n").filter((s) => s.trim()))
            }
            className={cn(textareaClasses, "min-h-[120px]")}
            placeholder="One item per line..."
          />
        )}
      </div>
    </div>
  );
}

function DetailItemsEditor({
  items,
  onChange,
}: {
  items: Array<{ title: string; description: string }>;
  onChange: (items: Array<{ title: string; description: string }>) => void;
}) {
  function updateItem(
    index: number,
    field: "title" | "description",
    value: string
  ) {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  }

  function addItem() {
    onChange([...items, { title: "", description: "" }]);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="flex-1 space-y-1">
            <Input
              value={item.title}
              onChange={(e) => updateItem(i, "title", e.target.value)}
              placeholder="Title"
              className="h-8 text-sm"
            />
            <Input
              value={item.description}
              onChange={(e) => updateItem(i, "description", e.target.value)}
              placeholder="Description"
              className="h-8 text-sm"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => removeItem(i)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem}>
        <Plus className="h-3 w-3 mr-1" /> Add Item
      </Button>
    </div>
  );
}

function CalloutEditor({
  data,
  onChange,
}: {
  data: CalloutBlock["data"];
  onChange: (data: CalloutBlock["data"]) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <FieldLabel>Variant</FieldLabel>
        <div className="flex gap-2">
          {(["info", "warning", "critical", "tip"] as const).map((v) => (
            <button
              key={v}
              onClick={() => onChange({ ...data, variant: v })}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md border transition-colors capitalize",
                data.variant === v
                  ? "bg-primary text-primary-foreground border-primary"
                  : "hover:bg-muted"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <FieldLabel>Title (optional)</FieldLabel>
        <Input
          value={data.title || ""}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="Callout title"
        />
      </div>
      <div className="space-y-1">
        <FieldLabel>Text</FieldLabel>
        <textarea
          value={data.text}
          onChange={(e) => onChange({ ...data, text: e.target.value })}
          className={cn(textareaClasses, "min-h-[80px]")}
          placeholder="Callout message..."
        />
      </div>
    </div>
  );
}

function ContactGridEditor({
  data,
  onChange,
}: {
  data: ContactGridBlock["data"];
  onChange: (data: ContactGridBlock["data"]) => void;
}) {
  function updateEntry(index: number, entry: (typeof data.entries)[0]) {
    const next = [...data.entries];
    next[index] = entry;
    onChange({ ...data, entries: next });
  }

  function addEntry() {
    onChange({
      ...data,
      entries: [
        ...data.entries,
        { icon: "Phone", iconColor: "blue", label: "", value: "" },
      ],
    });
  }

  function removeEntry(index: number) {
    onChange({ ...data, entries: data.entries.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <FieldLabel>Columns</FieldLabel>
        <div className="flex gap-2">
          {[2, 3].map((n) => (
            <button
              key={n}
              onClick={() => onChange({ ...data, columns: n })}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md border transition-colors",
                (data.columns || 3) === n
                  ? "bg-primary text-primary-foreground border-primary"
                  : "hover:bg-muted"
              )}
            >
              {n} columns
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <FieldLabel>Entries</FieldLabel>
        {data.entries.map((entry, i) => (
          <Card key={i} className="p-3">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="space-y-1">
                <FieldLabel>Icon</FieldLabel>
                <IconSelect
                  value={entry.icon}
                  onChange={(icon) => updateEntry(i, { ...entry, icon })}
                />
              </div>
              <div className="space-y-1">
                <FieldLabel>Color</FieldLabel>
                <ColorSelect
                  value={entry.iconColor}
                  onChange={(iconColor) =>
                    updateEntry(i, { ...entry, iconColor })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="space-y-1">
                <FieldLabel>Label</FieldLabel>
                <Input
                  value={entry.label}
                  onChange={(e) =>
                    updateEntry(i, { ...entry, label: e.target.value })
                  }
                  placeholder="e.g. Phone"
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <FieldLabel>Value</FieldLabel>
                <Input
                  value={entry.value}
                  onChange={(e) =>
                    updateEntry(i, { ...entry, value: e.target.value })
                  }
                  placeholder="e.g. 210-808-3400"
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <FieldLabel>Link (optional)</FieldLabel>
                <Input
                  value={entry.href || ""}
                  onChange={(e) =>
                    updateEntry(i, { ...entry, href: e.target.value })
                  }
                  placeholder="tel:2108083400"
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <FieldLabel>Subtext (optional)</FieldLabel>
                <Input
                  value={entry.subtext || ""}
                  onChange={(e) =>
                    updateEntry(i, { ...entry, subtext: e.target.value })
                  }
                  placeholder="Walk-ins: 0800-1100"
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-destructive hover:text-destructive"
                onClick={() => removeEntry(i)}
              >
                <Trash2 className="h-3 w-3 mr-1" /> Remove
              </Button>
            </div>
          </Card>
        ))}
        <Button variant="outline" size="sm" onClick={addEntry}>
          <Plus className="h-3 w-3 mr-1" /> Add Entry
        </Button>
      </div>
    </div>
  );
}

function StepsCardEditor({
  data,
  onChange,
}: {
  data: StepsCardBlock["data"];
  onChange: (data: StepsCardBlock["data"]) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <FieldLabel>Badge</FieldLabel>
          <Input
            value={data.badge}
            onChange={(e) => onChange({ ...data, badge: e.target.value })}
            placeholder="e.g. Day 1"
          />
        </div>
        <div className="space-y-1">
          <FieldLabel>Title</FieldLabel>
          <Input
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Phase 1: Arrival"
          />
        </div>
        <div className="space-y-1">
          <FieldLabel>Timeframe</FieldLabel>
          <Input
            value={data.timeframe || ""}
            onChange={(e) => onChange({ ...data, timeframe: e.target.value })}
            placeholder="Day 1"
          />
        </div>
      </div>
      <div className="space-y-1">
        <FieldLabel>Items (one per line)</FieldLabel>
        <textarea
          value={data.items.join("\n")}
          onChange={(e) =>
            onChange({
              ...data,
              items: e.target.value.split("\n").filter((s) => s.trim()),
            })
          }
          className={cn(textareaClasses, "min-h-[120px]")}
          placeholder="Step or item per line..."
        />
      </div>
    </div>
  );
}

function CtaBannerEditor({
  data,
  onChange,
}: {
  data: CtaBannerBlock["data"];
  onChange: (data: CtaBannerBlock["data"]) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <FieldLabel>Icon</FieldLabel>
          <IconSelect
            value={data.icon}
            onChange={(icon) => onChange({ ...data, icon })}
          />
        </div>
        <div className="space-y-1">
          <FieldLabel>Style</FieldLabel>
          <div className="flex gap-2">
            {(["dark", "blue", "gold"] as const).map((v) => (
              <button
                key={v}
                onClick={() => onChange({ ...data, variant: v })}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-md border transition-colors capitalize",
                  (data.variant || "dark") === v
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-muted"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <FieldLabel>Title</FieldLabel>
        <Input
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="Banner title"
        />
      </div>
      <div className="space-y-1">
        <FieldLabel>Text</FieldLabel>
        <textarea
          value={data.text}
          onChange={(e) => onChange({ ...data, text: e.target.value })}
          className={cn(textareaClasses, "min-h-[60px]")}
          placeholder="Banner body text..."
        />
      </div>
    </div>
  );
}

function ResourceGridEditor({
  data,
  onChange,
}: {
  data: ResourceGridBlock["data"];
  onChange: (data: ResourceGridBlock["data"]) => void;
}) {
  function updateResource(index: number, resource: (typeof data.resources)[0]) {
    const next = [...data.resources];
    next[index] = resource;
    onChange({ ...data, resources: next });
  }

  function addResource() {
    onChange({
      ...data,
      resources: [
        ...data.resources,
        { icon: "Globe", title: "", description: "", url: "" },
      ],
    });
  }

  function removeResource(index: number) {
    onChange({
      ...data,
      resources: data.resources.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <FieldLabel>Columns</FieldLabel>
        <div className="flex gap-2">
          {[2, 3].map((n) => (
            <button
              key={n}
              onClick={() => onChange({ ...data, columns: n })}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md border transition-colors",
                (data.columns || 3) === n
                  ? "bg-primary text-primary-foreground border-primary"
                  : "hover:bg-muted"
              )}
            >
              {n} columns
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <FieldLabel>Resources</FieldLabel>
        {data.resources.map((res, i) => (
          <Card key={i} className="p-3">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="space-y-1">
                <FieldLabel>Icon</FieldLabel>
                <IconSelect
                  value={res.icon}
                  onChange={(icon) => updateResource(i, { ...res, icon })}
                />
              </div>
              <div className="space-y-1">
                <FieldLabel>Title</FieldLabel>
                <Input
                  value={res.title}
                  onChange={(e) =>
                    updateResource(i, { ...res, title: e.target.value })
                  }
                  placeholder="Resource title"
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <div className="space-y-1 mb-2">
              <FieldLabel>Description</FieldLabel>
              <Input
                value={res.description}
                onChange={(e) =>
                  updateResource(i, { ...res, description: e.target.value })
                }
                placeholder="Brief description"
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <FieldLabel>URL</FieldLabel>
              <Input
                value={res.url}
                onChange={(e) =>
                  updateResource(i, { ...res, url: e.target.value })
                }
                placeholder="https://..."
                className="h-8 text-sm"
              />
            </div>
            <div className="flex justify-end mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-destructive hover:text-destructive"
                onClick={() => removeResource(i)}
              >
                <Trash2 className="h-3 w-3 mr-1" /> Remove
              </Button>
            </div>
          </Card>
        ))}
        <Button variant="outline" size="sm" onClick={addResource}>
          <Plus className="h-3 w-3 mr-1" /> Add Resource
        </Button>
      </div>
    </div>
  );
}
