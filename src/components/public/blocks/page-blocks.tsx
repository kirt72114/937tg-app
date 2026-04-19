import type {
  ContactsDirectoryBlock,
  PageBlock,
  RosterBlock,
} from "@/lib/content-blocks";
import { getRosterProfiles } from "@/lib/actions/roster";
import { LeadershipSquadronsDisplay } from "./leadership-squadrons-display";
import { MtlCardsDisplay } from "./mtl-cards-display";
import { InfoCardsDisplay } from "./info-cards-display";
import { StatsDisplay } from "./stats-display";
import { ChecklistDisplay } from "./checklist-display";
import { ContactsDirectoryDisplay } from "./contacts-directory-display";
import { ContactInfoDisplay } from "./contact-info-display";
import { HighlightCardDisplay } from "./highlight-card-display";
import { PhasesDisplay } from "./phases-display";
import { NumberedStepsDisplay } from "./numbered-steps-display";
import { ScheduleGridDisplay } from "./schedule-grid-display";
import { DefinitionCardsDisplay } from "./definition-cards-display";
import { ProgramTiersDisplay } from "./program-tiers-display";

const proseClasses =
  "prose prose-sm max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_li]:my-1 [&_blockquote]:border-l-4 [&_blockquote]:border-military-blue [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_a]:text-military-blue [&_a]:underline [&_hr]:my-6";

function HtmlBlockView({ html }: { html: string }) {
  if (!html.trim()) return null;
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <article
        className={proseClasses}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

async function RosterBlockView({ block }: { block: RosterBlock }) {
  const profiles = await getRosterProfiles(block.filter);

  if (block.display === "leadership-squadrons") {
    return <LeadershipSquadronsDisplay profiles={profiles} />;
  }

  if (block.display === "mtl-cards") {
    return <MtlCardsDisplay profiles={profiles} />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <p className="text-sm text-muted-foreground">
        Roster display &ldquo;{block.display}&rdquo; is not yet implemented.
      </p>
    </div>
  );
}

async function ContactsBlockView({ block }: { block: ContactsDirectoryBlock }) {
  return <ContactsDirectoryDisplay block={block} />;
}

export async function PageBlocks({ blocks }: { blocks: PageBlock[] }) {
  if (blocks.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-sm text-muted-foreground">
          This page has no content yet.
        </p>
      </div>
    );
  }

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "html":
            return <HtmlBlockView key={i} html={block.html} />;
          case "roster":
            return <RosterBlockView key={i} block={block} />;
          case "info-cards":
            return <InfoCardsDisplay key={i} block={block} />;
          case "stats":
            return <StatsDisplay key={i} block={block} />;
          case "checklist":
            return <ChecklistDisplay key={i} block={block} />;
          case "contacts-directory":
            return <ContactsBlockView key={i} block={block} />;
          case "contact-info":
            return <ContactInfoDisplay key={i} block={block} />;
          case "highlight-card":
            return <HighlightCardDisplay key={i} block={block} />;
          case "phases":
            return <PhasesDisplay key={i} block={block} />;
          case "numbered-steps":
            return <NumberedStepsDisplay key={i} block={block} />;
          case "schedule-grid":
            return <ScheduleGridDisplay key={i} block={block} />;
          case "definition-cards":
            return <DefinitionCardsDisplay key={i} block={block} />;
          case "program-tiers":
            return <ProgramTiersDisplay key={i} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
