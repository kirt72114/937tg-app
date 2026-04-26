"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Plus,
  Trash2,
} from "lucide-react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { BlockPicker } from "@/components/admin/block-picker";
import { InfoCardsEditor } from "@/components/admin/blocks/info-cards-editor";
import { StatsEditor } from "@/components/admin/blocks/stats-editor";
import { ChecklistEditor } from "@/components/admin/blocks/checklist-editor";
import { ContactsDirectoryEditor } from "@/components/admin/blocks/contacts-directory-editor";
import { ContactInfoEditor } from "@/components/admin/blocks/contact-info-editor";
import { HighlightCardEditor } from "@/components/admin/blocks/highlight-card-editor";
import { PhasesEditor } from "@/components/admin/blocks/phases-editor";
import { NumberedStepsEditor } from "@/components/admin/blocks/numbered-steps-editor";
import { ScheduleGridEditor } from "@/components/admin/blocks/schedule-grid-editor";
import { DefinitionCardsEditor } from "@/components/admin/blocks/definition-cards-editor";
import { ProgramTiersEditor } from "@/components/admin/blocks/program-tiers-editor";
import { LocationsDirectoryEditor } from "@/components/admin/blocks/locations-directory-editor";
import { FilesListEditor } from "@/components/admin/blocks/files-list-editor";
import { LinkCollectionsListEditor } from "@/components/admin/blocks/link-collections-list-editor";
import {
  BLOCK_TYPE_LABELS,
  summarizeBlock,
  type ChecklistBlock,
  type ContactInfoBlock,
  type ContactsDirectoryBlock,
  type DefinitionCardsBlock,
  type FilesListBlock,
  type HighlightCardBlock,
  type HtmlBlock,
  type InfoCardsBlock,
  type LinkCollectionsListBlock,
  type LocationsDirectoryBlock,
  type NumberedStepsBlock,
  type PageBlock,
  type PhasesBlock,
  type ProgramTiersBlock,
  type RosterBlock,
  type RosterDisplay,
  type RosterProfileType,
  type ScheduleGridBlock,
  type StatsBlock,
} from "@/lib/content-blocks";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const ROSTER_DISPLAYS: { value: RosterDisplay; label: string }[] = [
  { value: "leadership-squadrons", label: "Leadership — Group + Squadrons" },
  { value: "mtl-cards", label: "MTL Cards" },
  { value: "simple-grid", label: "Simple Profile Grid" },
];

type WithId = PageBlock & { __id: string };

function nextId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

function withIds(blocks: PageBlock[]): WithId[] {
  return blocks.map((b) => ({ ...b, __id: nextId() })) as WithId[];
}

function stripIds(blocks: WithId[]): PageBlock[] {
  return blocks.map(({ __id: _ignored, ...rest }) => rest as PageBlock);
}

interface PageBlocksEditorProps {
  blocks: PageBlock[];
  onChange: (blocks: PageBlock[]) => void;
}

export function PageBlocksEditor({ blocks, onChange }: PageBlocksEditorProps) {
  // Maintain stable __id per row so DnD has identity even when content changes.
  const [rows, setRows] = useState<WithId[]>(() => withIds(blocks));
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [scrollToId, setScrollToId] = useState<string | null>(null);

  // Re-sync from outside if the blocks reference truly changed (e.g., page reload).
  // We compare by stripped JSON to avoid resetting on every parent re-render.
  const lastJsonRef = useRef<string>(JSON.stringify(blocks));
  useEffect(() => {
    const next = JSON.stringify(blocks);
    if (next !== lastJsonRef.current) {
      lastJsonRef.current = next;
      setRows(withIds(blocks));
    }
  }, [blocks]);

  function commit(next: WithId[]) {
    setRows(next);
    const stripped = stripIds(next);
    lastJsonRef.current = JSON.stringify(stripped);
    onChange(stripped);
  }

  function update(id: string, next: PageBlock) {
    commit(rows.map((r) => (r.__id === id ? ({ ...next, __id: id } as WithId) : r)));
  }

  function remove(id: string) {
    if (!confirm("Remove this block?")) return;
    commit(rows.filter((r) => r.__id !== id));
  }

  function duplicate(id: string) {
    const i = rows.findIndex((r) => r.__id === id);
    if (i === -1) return;
    const source = rows[i];
    const clone = {
      ...(structuredClone({ ...source, __id: undefined }) as PageBlock),
      __id: nextId(),
    } as WithId;
    const next = [...rows.slice(0, i + 1), clone, ...rows.slice(i + 1)];
    commit(next);
    setScrollToId(clone.__id);
  }

  function insertAt(index: number, block: PageBlock) {
    const row = { ...block, __id: nextId() } as WithId;
    const next = [...rows.slice(0, index), row, ...rows.slice(index)];
    commit(next);
    setScrollToId(row.__id);
  }

  function appendBlock(block: PageBlock) {
    insertAt(rows.length, block);
  }

  function toggleCollapsed(id: string) {
    setCollapsed((c) => ({ ...c, [id]: !c[id] }));
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const ids = useMemo(() => rows.map((r) => r.__id), [rows]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const fromIndex = ids.indexOf(String(active.id));
    const toIndex = ids.indexOf(String(over.id));
    if (fromIndex === -1 || toIndex === -1) return;
    commit(arrayMove(rows, fromIndex, toIndex));
  }

  return (
    <div className="space-y-2">
      {rows.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-sm text-muted-foreground space-y-3">
            <p>No content blocks yet.</p>
            <BlockPicker onPick={appendBlock} />
          </CardContent>
        </Card>
      )}

      {rows.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {rows.map((row, i) => (
                <div key={row.__id}>
                  <InsertHere onPick={(b) => insertAt(i, b)} />
                  <SortableBlockCard
                    id={row.__id}
                    block={row}
                    index={i}
                    collapsed={!!collapsed[row.__id]}
                    scrollIntoView={scrollToId === row.__id}
                    onScrolled={() => setScrollToId(null)}
                    onChange={(next) => update(row.__id, next)}
                    onRemove={() => remove(row.__id)}
                    onDuplicate={() => duplicate(row.__id)}
                    onToggleCollapsed={() => toggleCollapsed(row.__id)}
                  />
                </div>
              ))}
              <InsertHere onPick={(b) => insertAt(rows.length, b)} />
            </div>
          </SortableContext>
        </DndContext>
      )}

      {rows.length > 0 && (
        <div className="pt-2">
          <BlockPicker onPick={appendBlock} />
        </div>
      )}
    </div>
  );
}

function InsertHere({ onPick }: { onPick: (block: PageBlock) => void }) {
  return (
    <div className="group relative h-2">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity pointer-events-none">
        <div className="h-px bg-military-blue/40 flex-1" />
        <div className="pointer-events-auto px-2">
          <BlockPicker
            onPick={onPick}
            align="center"
            trigger={
              <button
                type="button"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-military-blue text-white shadow hover:bg-military-blue/90"
                aria-label="Insert block here"
                title="Insert block here"
              >
                <Plus className="h-3 w-3" />
              </button>
            }
          />
        </div>
        <div className="h-px bg-military-blue/40 flex-1" />
      </div>
    </div>
  );
}

function SortableBlockCard({
  id,
  block,
  index,
  collapsed,
  scrollIntoView,
  onScrolled,
  onChange,
  onRemove,
  onDuplicate,
  onToggleCollapsed,
}: {
  id: string;
  block: PageBlock;
  index: number;
  collapsed: boolean;
  scrollIntoView: boolean;
  onScrolled: () => void;
  onChange: (next: PageBlock) => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onToggleCollapsed: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollIntoView && wrapperRef.current) {
      wrapperRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      onScrolled();
    }
  }, [scrollIntoView, onScrolled]);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div ref={wrapperRef}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <button
                type="button"
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
                className="flex h-8 w-6 items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring touch-none"
                aria-label="Drag to reorder"
                title="Drag to reorder"
              >
                <GripVertical className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onToggleCollapsed}
                className="flex h-8 w-6 items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label={collapsed ? "Expand block" : "Collapse block"}
                title={collapsed ? "Expand" : "Collapse"}
              >
                {collapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              <span className="text-xs text-muted-foreground shrink-0">
                {index + 1}
              </span>
              <Badge variant="outline" className="shrink-0">
                {BLOCK_TYPE_LABELS[block.type]}
              </Badge>
              {collapsed && (
                <span className="text-xs text-muted-foreground truncate">
                  {summarizeBlock(block)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onDuplicate}
                title="Duplicate block"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={onRemove}
                title="Remove block"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          {!collapsed && (
            <CardContent>
              <BlockBody block={block} onChange={onChange} />
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

function BlockBody({
  block,
  onChange,
}: {
  block: PageBlock;
  onChange: (next: PageBlock) => void;
}) {
  switch (block.type) {
    case "html":
      return <HtmlBlockFields block={block} onChange={onChange} />;
    case "roster":
      return <RosterBlockFields block={block} onChange={onChange} />;
    case "info-cards":
      return (
        <InfoCardsEditor
          block={block}
          onChange={(next: InfoCardsBlock) => onChange(next)}
        />
      );
    case "stats":
      return (
        <StatsEditor
          block={block}
          onChange={(next: StatsBlock) => onChange(next)}
        />
      );
    case "checklist":
      return (
        <ChecklistEditor
          block={block}
          onChange={(next: ChecklistBlock) => onChange(next)}
        />
      );
    case "contacts-directory":
      return (
        <ContactsDirectoryEditor
          block={block}
          onChange={(next: ContactsDirectoryBlock) => onChange(next)}
        />
      );
    case "contact-info":
      return (
        <ContactInfoEditor
          block={block}
          onChange={(next: ContactInfoBlock) => onChange(next)}
        />
      );
    case "highlight-card":
      return (
        <HighlightCardEditor
          block={block}
          onChange={(next: HighlightCardBlock) => onChange(next)}
        />
      );
    case "phases":
      return (
        <PhasesEditor
          block={block}
          onChange={(next: PhasesBlock) => onChange(next)}
        />
      );
    case "numbered-steps":
      return (
        <NumberedStepsEditor
          block={block}
          onChange={(next: NumberedStepsBlock) => onChange(next)}
        />
      );
    case "schedule-grid":
      return (
        <ScheduleGridEditor
          block={block}
          onChange={(next: ScheduleGridBlock) => onChange(next)}
        />
      );
    case "definition-cards":
      return (
        <DefinitionCardsEditor
          block={block}
          onChange={(next: DefinitionCardsBlock) => onChange(next)}
        />
      );
    case "program-tiers":
      return (
        <ProgramTiersEditor
          block={block}
          onChange={(next: ProgramTiersBlock) => onChange(next)}
        />
      );
    case "locations-directory":
      return (
        <LocationsDirectoryEditor
          block={block}
          onChange={(next: LocationsDirectoryBlock) => onChange(next)}
        />
      );
    case "files-list":
      return (
        <FilesListEditor
          block={block}
          onChange={(next: FilesListBlock) => onChange(next)}
        />
      );
    case "link-collections-list":
      return (
        <LinkCollectionsListEditor
          block={block}
          onChange={(next: LinkCollectionsListBlock) => onChange(next)}
        />
      );
  }
}

function HtmlBlockFields({
  block,
  onChange,
}: {
  block: HtmlBlock;
  onChange: (next: HtmlBlock) => void;
}) {
  const [initialHtml] = useState(block.html);

  return (
    <RichTextEditor
      content={initialHtml}
      onChange={(html) => onChange({ ...block, html })}
      placeholder="Write content for this block..."
    />
  );
}

function RosterBlockFields({
  block,
  onChange,
}: {
  block: RosterBlock;
  onChange: (next: RosterBlock) => void;
}) {
  const profileType = block.filter.profileType ?? "any";
  const unit = block.filter.unit ?? "";

  function updateFilter(updates: Partial<RosterBlock["filter"]>) {
    onChange({ ...block, filter: { ...block.filter, ...updates } });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Profile Type</label>
        <select
          value={profileType}
          onChange={(e) => {
            const value = e.target.value;
            updateFilter({
              profileType:
                value === "any" ? undefined : (value as RosterProfileType),
            });
          }}
          className={selectClasses}
        >
          <option value="any">Any</option>
          <option value="leadership">Leadership</option>
          <option value="mtl">MTL</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Unit (optional)</label>
        <Input
          value={unit}
          onChange={(e) =>
            updateFilter({ unit: e.target.value || undefined })
          }
          placeholder="e.g. 381st Training Squadron"
        />
        <p className="text-xs text-muted-foreground">
          Leave blank to include every unit.
        </p>
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <label className="text-sm font-medium">Display</label>
        <select
          value={block.display}
          onChange={(e) =>
            onChange({ ...block, display: e.target.value as RosterDisplay })
          }
          className={selectClasses}
        >
          {ROSTER_DISPLAYS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground">
          Pick the layout that matches the page&rsquo;s intended look.
        </p>
      </div>
    </div>
  );
}
