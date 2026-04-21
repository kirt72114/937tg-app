import type { RosterProfile } from "@/lib/actions/roster";
import {
  LeadershipPortraitCarousel,
  type CarouselLeader,
} from "./leadership-portrait-carousel";
import { UnitBanner } from "./unit-banner";

const TITLE_ORDER = [
  "Group MTL Superintendent",
  "Flight Chief",
  "MTSF Flight Chief",
  "Assistant Flight Chief",
  "Section Chief",
  "Line MTLs",
  "MTLs",
  "MTSF MTLs",
  "Outprocessing MTLs",
];

function titleRank(title: string): number {
  const i = TITLE_ORDER.indexOf(title);
  return i === -1 ? 999 : i;
}

type RoleGroup = {
  title: string;
  members: RosterProfile[];
};

function groupByTitle(profiles: RosterProfile[]): RoleGroup[] {
  const map = new Map<string, RosterProfile[]>();
  for (const p of profiles) {
    const key = p.title || "MTLs";
    const bucket = map.get(key) ?? [];
    bucket.push(p);
    map.set(key, bucket);
  }
  const groups: RoleGroup[] = Array.from(map.entries()).map(
    ([title, members]) => ({ title, members })
  );
  groups.sort((a, b) => {
    const ar = titleRank(a.title);
    const br = titleRank(b.title);
    if (ar !== br) return ar - br;
    return a.title.localeCompare(b.title);
  });
  return groups;
}

export function MtlUnitDetail({
  unit,
  logoUrl,
  mission,
  vision,
  profiles,
}: {
  unit: string;
  logoUrl: string | null;
  mission: string | null;
  vision: string | null;
  profiles: RosterProfile[];
}) {
  const groups = groupByTitle(profiles);
  const carouselLeaders: CarouselLeader[] = profiles.map((p) => ({
    id: p.id,
    name: p.name,
    rank: p.rank,
    title: p.title,
    photoUrl: p.photoUrl,
  }));

  return (
    <article className="mx-auto max-w-5xl px-4 py-8">
      <section className="rounded-lg overflow-hidden border border-military-blue/20 bg-white shadow-sm">
        <UnitBanner
          unit={unit}
          logoUrl={logoUrl}
          mission={mission}
          vision={vision}
        />

        <div className="p-6 md:p-10 space-y-10">
          <LeadershipPortraitCarousel leaders={carouselLeaders} />

          {groups.length === 0 ? (
            <p className="text-sm italic text-muted-foreground">
              No MTLs assigned yet.
            </p>
          ) : (
            <div className="space-y-6">
              {groups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-bold text-military-navy underline underline-offset-4 decoration-military-gold mb-2">
                    {group.title}
                  </h3>
                  <ul className="space-y-1">
                    {group.members.map((m) => (
                      <li key={m.id} className="text-sm text-military-navy/80">
                        {m.rank} {m.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
