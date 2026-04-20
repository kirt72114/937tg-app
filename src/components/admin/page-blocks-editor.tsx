"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChevronUp,
  ChevronDown,
  Trash2,
  Users,
  Text,
  LayoutGrid,
  BarChart3,
  ListChecks,
  Phone,
  Contact,
  Star,
  ListOrdered,
  Route as RouteIcon,
  CalendarClock,
  Code2,
  Trophy,
  MapPinned,
  Folder,
  LinkIcon,
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
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
  createChecklistBlock,
  createContactInfoBlock,
  createContactsDirectoryBlock,
  createDefinitionCardsBlock,
  createFilesListBlock,
  createHighlightCardBlock,
  createHtmlBlock,
  createInfoCardsBlock,
  createLinkCollectionsListBlock,
  createLocationsDirectoryBlock,
  createNumberedStepsBlock,
  createPhasesBlock,
  createProgramTiersBlock,
  createRosterBlock,
  createScheduleGridBlock,
  createStatsBlock,
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

const BLOCK_LABELS: Record<PageBlock["type"], string> = {
  html: "Text",
  roster: "Roster",
  "info-cards": "Info Cards",
  stats: "Stats",
  checklist: "Checklist",
  "contacts-directory": "Phone Directory",
  "contact-info": "Contact Info",
  "highlight-card": "Highlight Card",
  phases: "Phases",
  "numbered-steps": "Numbered Steps",
  "schedule-grid": "Schedule Grid",
  "definition-cards": "Definition Cards",
  "program-tiers": "Program Tiers",
  "locations-directory": "Locations",
  "files-list": "Files List",
  "link-collections-list": "Link Collections",
};

interface PageBlocksEditorProps {
  blocks: PageBlock[];
  onChange: (blocks: PageBlock[]) => void;
}

export function PageBlocksEditor({ blocks, onChange }: PageBlocksEditorProps) {
  function update(index: number, next: PageBlock) {
    const copy = blocks.slice();
    copy[index] = next;
    onChange(copy);
  }

  function move(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= blocks.length) return;
    const copy = blocks.slice();
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
  }

  function remove(index: number) {
    if (!confirm("Remove this block?")) return;
    onChange(blocks.filter((_, i) => i !== index));
  }

  function add(block: PageBlock) {
    onChange([...blocks, block]);
  }

  return (
    <div className="space-y-4">
      {blocks.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-sm text-muted-foreground">
            No content blocks yet. Add one below to get started.
          </CardContent>
        </Card>
      )}

      {blocks.map((block, i) => (
        <BlockCard
          key={i}
          block={block}
          index={i}
          isFirst={i === 0}
          isLast={i === blocks.length - 1}
          onChange={(next) => update(i, next)}
          onMoveUp={() => move(i, "up")}
          onMoveDown={() => move(i, "down")}
          onRemove={() => remove(i)}
        />
      ))}

      <div className="flex flex-wrap gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createHtmlBlock())}
        >
          <Text className="h-4 w-4 mr-2" />
          Add Text
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createInfoCardsBlock())}
        >
          <LayoutGrid className="h-4 w-4 mr-2" />
          Add Info Cards
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createStatsBlock())}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Add Stats
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createChecklistBlock())}
        >
          <ListChecks className="h-4 w-4 mr-2" />
          Add Checklist
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createContactInfoBlock())}
        >
          <Contact className="h-4 w-4 mr-2" />
          Add Contact Info
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createHighlightCardBlock())}
        >
          <Star className="h-4 w-4 mr-2" />
          Add Highlight
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createContactsDirectoryBlock())}
        >
          <Phone className="h-4 w-4 mr-2" />
          Add Phone Directory
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createPhasesBlock())}
        >
          <ListOrdered className="h-4 w-4 mr-2" />
          Add Phases
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createNumberedStepsBlock())}
        >
          <RouteIcon className="h-4 w-4 mr-2" />
          Add Numbered Steps
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createScheduleGridBlock())}
        >
          <CalendarClock className="h-4 w-4 mr-2" />
          Add Schedule Grid
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createDefinitionCardsBlock())}
        >
          <Code2 className="h-4 w-4 mr-2" />
          Add Definition Cards
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createProgramTiersBlock())}
        >
          <Trophy className="h-4 w-4 mr-2" />
          Add Program Tiers
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createLocationsDirectoryBlock())}
        >
          <MapPinned className="h-4 w-4 mr-2" />
          Add Locations
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createFilesListBlock())}
        >
          <Folder className="h-4 w-4 mr-2" />
          Add Files List
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createLinkCollectionsListBlock())}
        >
          <LinkIcon className="h-4 w-4 mr-2" />
          Add Link Collections
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => add(createRosterBlock())}
        >
          <Users className="h-4 w-4 mr-2" />
          Add Roster
        </Button>
      </div>
    </div>
  );
}

function BlockCard({
  block,
  index,
  isFirst,
  isLast,
  onChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  block: PageBlock;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onChange: (next: PageBlock) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Block {index + 1}</span>
          <Badge variant="outline">{BLOCK_LABELS[block.type]}</Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onMoveUp}
            disabled={isFirst}
            title="Move up"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onMoveDown}
            disabled={isLast}
            title="Move down"
          >
            <ChevronDown className="h-4 w-4" />
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
      <CardContent>
        {block.type === "html" && (
          <HtmlBlockFields block={block} onChange={onChange} />
        )}
        {block.type === "roster" && (
          <RosterBlockFields block={block} onChange={onChange} />
        )}
        {block.type === "info-cards" && (
          <InfoCardsEditor
            block={block}
            onChange={(next: InfoCardsBlock) => onChange(next)}
          />
        )}
        {block.type === "stats" && (
          <StatsEditor
            block={block}
            onChange={(next: StatsBlock) => onChange(next)}
          />
        )}
        {block.type === "checklist" && (
          <ChecklistEditor
            block={block}
            onChange={(next: ChecklistBlock) => onChange(next)}
          />
        )}
        {block.type === "contacts-directory" && (
          <ContactsDirectoryEditor
            block={block}
            onChange={(next: ContactsDirectoryBlock) => onChange(next)}
          />
        )}
        {block.type === "contact-info" && (
          <ContactInfoEditor
            block={block}
            onChange={(next: ContactInfoBlock) => onChange(next)}
          />
        )}
        {block.type === "highlight-card" && (
          <HighlightCardEditor
            block={block}
            onChange={(next: HighlightCardBlock) => onChange(next)}
          />
        )}
        {block.type === "phases" && (
          <PhasesEditor
            block={block}
            onChange={(next: PhasesBlock) => onChange(next)}
          />
        )}
        {block.type === "numbered-steps" && (
          <NumberedStepsEditor
            block={block}
            onChange={(next: NumberedStepsBlock) => onChange(next)}
          />
        )}
        {block.type === "schedule-grid" && (
          <ScheduleGridEditor
            block={block}
            onChange={(next: ScheduleGridBlock) => onChange(next)}
          />
        )}
        {block.type === "definition-cards" && (
          <DefinitionCardsEditor
            block={block}
            onChange={(next: DefinitionCardsBlock) => onChange(next)}
          />
        )}
        {block.type === "program-tiers" && (
          <ProgramTiersEditor
            block={block}
            onChange={(next: ProgramTiersBlock) => onChange(next)}
          />
        )}
        {block.type === "locations-directory" && (
          <LocationsDirectoryEditor
            block={block}
            onChange={(next: LocationsDirectoryBlock) => onChange(next)}
          />
        )}
        {block.type === "files-list" && (
          <FilesListEditor
            block={block}
            onChange={(next: FilesListBlock) => onChange(next)}
          />
        )}
        {block.type === "link-collections-list" && (
          <LinkCollectionsListEditor
            block={block}
            onChange={(next: LinkCollectionsListBlock) => onChange(next)}
          />
        )}
      </CardContent>
    </Card>
  );
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
