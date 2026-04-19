import { getAllSquadrons } from "@/lib/actions/squadrons";
import { getAllSettings } from "@/lib/actions/settings";
import type { RosterProfile } from "@/lib/actions/roster";

type Squadron = {
  id: string;
  unit: string;
  motto: string | null;
  mission: string | null;
  vision: string | null;
  afscs: unknown;
};

function squadronAfscs(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

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

function LeaderPhoto({
  name,
  rank,
  photoUrl,
  size = "sm",
}: {
  name: string;
  rank: string;
  photoUrl: string | null;
  size?: "lg" | "sm";
}) {
  const dimensions =
    size === "lg" ? "h-64 w-52 md:h-80 md:w-64" : "h-28 w-24 md:h-36 md:w-28";

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={`${rank} ${name}`}
        className={`${dimensions} rounded object-cover object-top shadow-md`}
      />
    );
  }

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div
      className={`${dimensions} rounded bg-gradient-to-br from-military-navy to-military-blue flex flex-col items-center justify-center shadow-md`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-military-gold bg-military-navy text-lg font-bold text-military-gold">
        {initials}
      </div>
      <span className="mt-1 text-[10px] text-gray-300">Photo Coming Soon</span>
    </div>
  );
}

function GroupSection({
  leaders,
  groupUnit,
  groupDescription,
  location,
}: {
  leaders: RosterProfile[];
  groupUnit: string;
  groupDescription: string;
  location: string;
}) {
  const ordered = orderLeaders(leaders);
  const commander = ordered.find((l) => l.title === "Commander");
  const others = ordered.filter((l) => l.title !== "Commander");

  return (
    <section className="rounded-lg bg-military-navy text-white overflow-hidden">
      <div className="p-6 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <img
            src="/images/937Logo.png"
            alt={`${groupUnit} Emblem`}
            className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white p-1"
          />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{groupUnit}</h2>
            <p className="text-sm text-gray-300">
              Medical Education &amp; Training Campus (METC)
            </p>
            <p className="text-xs text-gray-400">{location}</p>
          </div>
        </div>

        {leaders.length === 0 ? (
          <p className="text-sm text-gray-400 italic">
            No leaders have been added yet. Visit the admin panel to add them.
          </p>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center md:items-start">
              {commander && (
                <LeaderPhoto
                  name={commander.name}
                  rank={commander.rank}
                  photoUrl={commander.photoUrl}
                  size="lg"
                />
              )}
              {others.length > 0 && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  {others.map((leader) => (
                    <LeaderPhoto
                      key={leader.id}
                      name={leader.name}
                      rank={leader.rank}
                      photoUrl={leader.photoUrl}
                      size="sm"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-6">
              <div className="space-y-3">
                {ordered.map((leader) => (
                  <div key={leader.id}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-military-gold">
                      {leader.title}
                    </p>
                    <p className="text-sm">
                      {leader.rank} {leader.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {groupDescription}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SquadronSection({
  squadron,
  leaders,
}: {
  squadron: Squadron;
  leaders: RosterProfile[];
}) {
  const ordered = orderLeaders(leaders);
  const commander = ordered.find((l) => l.title === "Commander");
  const others = ordered.filter((l) => l.title !== "Commander");
  const squadronNumber = squadron.unit.match(/\d+/)?.[0] ?? "";
  const afscs = squadronAfscs(squadron.afscs);

  return (
    <section className="rounded-lg bg-[#3a6fbf] text-white overflow-hidden">
      <div className="p-6 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-full bg-military-navy text-military-gold border-2 border-military-gold text-xl font-bold">
            {squadronNumber}
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{squadron.unit}</h2>
            {squadron.motto && (
              <p className="text-sm italic text-blue-100">
                &ldquo;{squadron.motto}&rdquo;
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center md:items-start">
            {commander ? (
              <LeaderPhoto
                name={commander.name}
                rank={commander.rank}
                photoUrl={commander.photoUrl}
                size="lg"
              />
            ) : (
              <LeaderPhoto name="?" rank="" photoUrl={null} size="lg" />
            )}
            {others.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {others.map((leader) => (
                  <LeaderPhoto
                    key={leader.id}
                    name={leader.name}
                    rank={leader.rank}
                    photoUrl={leader.photoUrl}
                    size="sm"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <div className="space-y-3">
                {ordered.length === 0 ? (
                  <p className="text-sm text-blue-100 italic">
                    No leaders assigned yet.
                  </p>
                ) : (
                  ordered.map((leader) => (
                    <div key={leader.id}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-yellow-300">
                        {leader.title}
                      </p>
                      <p className="text-sm">
                        {leader.rank} {leader.name}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-300">
                    Mission
                  </h3>
                  <p className="text-sm text-blue-100">
                    {squadron.mission ?? ""}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-300">
                    Vision
                  </h3>
                  <p className="text-sm text-blue-100">
                    {squadron.vision ?? ""}
                  </p>
                </div>
              </div>
            </div>

            {afscs.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-300 mb-2">
                  AFSCs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                  {afscs.map((afsc) => (
                    <p key={afsc} className="text-xs text-blue-100">
                      {afsc}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function LeadershipSquadronsDisplay({
  profiles,
}: {
  profiles: RosterProfile[];
}) {
  const [squadrons, settings] = await Promise.all([
    getAllSquadrons(),
    getAllSettings(),
  ]);

  const groupUnit = settings.siteName || "937th Training Group";
  const groupDescription = settings.groupDescription || "";
  const location = settings.location || "JBSA-Fort Sam Houston, TX";

  const groupLeaders = profiles.filter((l) => l.unit === groupUnit);
  const squadronGroups = squadrons.map((squadron) => ({
    squadron,
    leaders: profiles.filter((l) => l.unit === squadron.unit),
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      <GroupSection
        leaders={groupLeaders}
        groupUnit={groupUnit}
        groupDescription={groupDescription}
        location={location}
      />
      {squadronGroups.map(({ squadron, leaders }) => (
        <SquadronSection
          key={squadron.id}
          squadron={squadron}
          leaders={leaders}
        />
      ))}
    </div>
  );
}
