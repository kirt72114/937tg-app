import type { RosterProfile } from "@/lib/actions/roster";
import { MissingImage } from "@/components/shared/missing-image";
import {
  LeadershipPortraitCarousel,
  type CarouselLeader,
} from "./leadership-portrait-carousel";

const TITLE_ORDER = [
  "Commander",
  "Deputy Commander",
  "Section Commander",
  "Senior Enlisted Leader",
  "First Sergeant",
];

function orderLeaders(leaders: RosterProfile[]): RosterProfile[] {
  return [...leaders].sort((a, b) => {
    const ai = TITLE_ORDER.indexOf(a.title);
    const bi = TITLE_ORDER.indexOf(b.title);
    const aIndex = ai === -1 ? 999 : ai;
    const bIndex = bi === -1 ? 999 : bi;
    return aIndex - bIndex;
  });
}

export type UnitDetailContent =
  | {
      kind: "squadron";
      unit: string;
      motto: string | null;
      mission: string | null;
      vision: string | null;
      afscs: string[];
      logoUrl: string | null;
    }
  | {
      kind: "group";
      unit: string;
      description: string;
      logoUrl: string | null;
    };

export function LeadershipUnitDetail({
  content,
  leaders,
}: {
  content: UnitDetailContent;
  leaders: RosterProfile[];
}) {
  const ordered = orderLeaders(leaders);
  const carouselLeaders: CarouselLeader[] = ordered.map((l) => ({
    id: l.id,
    name: l.name,
    rank: l.rank,
    title: l.title,
    photoUrl: l.photoUrl,
  }));

  return (
    <article className="mx-auto max-w-5xl px-4 py-8">
      <section className="rounded-lg overflow-hidden border border-military-blue/20 bg-white shadow-sm">
        <Banner content={content} />

        <div className="p-6 md:p-10 space-y-10">
          <LeadershipPortraitCarousel leaders={carouselLeaders} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {ordered.length === 0 ? (
                <p className="text-sm italic text-muted-foreground">
                  No leaders assigned yet.
                </p>
              ) : (
                ordered.map((leader) => (
                  <div key={leader.id}>
                    <p className="text-sm font-bold text-military-navy">
                      {leader.title}
                    </p>
                    <p className="text-sm text-military-navy/80">
                      {leader.rank} {leader.name}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-6">
              {content.kind === "squadron" ? (
                <>
                  <div>
                    <h3 className="text-sm font-bold text-military-navy underline underline-offset-4 decoration-military-gold mb-2">
                      Mission
                    </h3>
                    <p className="text-sm text-military-navy/80 leading-relaxed">
                      {content.mission || "—"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-military-navy underline underline-offset-4 decoration-military-gold mb-2">
                      Vision
                    </h3>
                    <p className="text-sm text-military-navy/80 leading-relaxed">
                      {content.vision || "—"}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-sm text-military-navy/80 leading-relaxed whitespace-pre-line">
                  {content.description || "—"}
                </div>
              )}
            </div>
          </div>

          {content.kind === "squadron" && content.afscs.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-military-navy underline underline-offset-4 decoration-military-gold mb-3">
                AFSC
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                {content.afscs.map((afsc) => (
                  <li key={afsc} className="text-sm text-military-navy/80">
                    {afsc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}

function Banner({ content }: { content: UnitDetailContent }) {
  const missionText =
    content.kind === "squadron" ? content.mission : null;
  const visionText = content.kind === "squadron" ? content.vision : null;

  return (
    <header className="bg-military-blue/5 border-b border-military-blue/20 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="shrink-0">
          {content.logoUrl ? (
            <img
              src={content.logoUrl}
              alt={`${content.unit} patch`}
              className="h-24 w-24 md:h-32 md:w-32 object-contain"
            />
          ) : (
            <MissingImage
              label="Patch Missing"
              className="h-24 w-24 md:h-32 md:w-32"
            />
          )}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-military-navy">
            {content.unit}
          </h1>
          {missionText && (
            <p className="text-sm text-military-navy/80 mt-2">
              <span className="font-semibold">MISSION:</span> {missionText}
            </p>
          )}
          {visionText && (
            <p className="text-sm text-military-navy/80 mt-1">
              <span className="font-semibold">VISION:</span> {visionText}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
