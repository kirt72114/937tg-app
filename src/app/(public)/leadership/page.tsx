import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meet Your Leadership",
};

type Leader = {
  id: string;
  name: string;
  rank: string;
  title: string;
  unit: string;
  photoUrl: string | null;
};

const GROUP_UNIT = "937th Training Group";
const GROUP_DESCRIPTION = `The 937th Training Group, headquartered at JBSA-Fort Sam Houston, Texas, is a crucial component of the 59th Medical Wing. The group is dedicated to providing world-class enlisted medical readiness training at the Medical Education and Training Campus.

With a dedicated team of 601 active-duty and civilian professionals, the group bears the responsibility for preparing over 14,700 students annually across 82 programs of instruction spanning 64 distinct courses and components, covering 51 enlisted Air Force specialty codes.

The group's mission extends to overseeing the completion of Phase II initial skills training for enlisted Air Force specialty codes and conducting officer clinical readiness training, ensuring personnel are ready to deliver healthcare in all settings and conditions.`;

const SQUADRONS: Array<{
  unit: string;
  motto: string;
  mission: string;
  vision: string;
  afscs: string[];
}> = [
  {
    unit: "381st Training Squadron",
    motto: "Forge to Excellence and Commitment",
    mission: "To train and empower mission-essential medics.",
    vision:
      "An inclusive team, developing one medic at a time for the future fight.",
    afscs: ["4Y0X1 - Dental Assistant", "4Y0X2 - Dental Laboratory"],
  },
  {
    unit: "382d Training Squadron",
    motto: "Train Today's Medics for Tomorrow's Fight",
    mission:
      "Educate, develop, and inspire one enlisted medic at a time — ready to fight.",
    vision: "To be the premier training pipeline for joint medical forces.",
    afscs: [
      "4A0X1 - Health Services Management",
      "4A2X1 - Biomedical Equipment",
      "4N0X2 - Physical Medicine",
      "4P0X1 - Pharmacy",
      "4H0X1 - Diagnostic Imaging",
      "6A0X2 - Medical Materiel",
      "4D0X1 - Diet Therapy",
    ],
  },
  {
    unit: "383d Training Squadron",
    motto: "METC's Finest, Mission Focused",
    mission: "Develop Warrior Medics.",
    vision: "Train. Inform. Transform.",
    afscs: [
      "4C0X1 - Mental Health Service",
      "4H0X1 - Cardiopulmonary Laboratory",
      "4N0X1 - Aerospace Medical Service",
      "4Y0X1 - Surgical Service",
    ],
  },
];

// Display order within a squadron — titles listed here appear first, in this order.
const TITLE_ORDER = [
  "Commander",
  "Deputy Commander",
  "Section Commander",
  "Senior Enlisted Leader",
  "First Sergeant",
];

function orderLeaders(leaders: Leader[]): Leader[] {
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

function GroupSection({ leaders }: { leaders: Leader[] }) {
  const ordered = orderLeaders(leaders);
  const commander = ordered.find((l) => l.title === "Commander");
  const others = ordered.filter((l) => l.title !== "Commander");

  return (
    <section className="rounded-lg bg-military-navy text-white overflow-hidden">
      <div className="p-6 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <img
            src="/images/937Logo.png"
            alt="937th Training Group Emblem"
            className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white p-1"
          />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{GROUP_UNIT}</h2>
            <p className="text-sm text-gray-300">
              Medical Education &amp; Training Campus (METC)
            </p>
            <p className="text-xs text-gray-400">
              JBSA-Fort Sam Houston, TX
            </p>
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
                {GROUP_DESCRIPTION}
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
  squadron: (typeof SQUADRONS)[number];
  leaders: Leader[];
}) {
  const ordered = orderLeaders(leaders);
  const commander = ordered.find((l) => l.title === "Commander");
  const others = ordered.filter((l) => l.title !== "Commander");
  const squadronNumber = squadron.unit.match(/\d+/)?.[0];

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
              <LeaderPhoto
                name="?"
                rank=""
                photoUrl={null}
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
                  <p className="text-sm text-blue-100">{squadron.mission}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-300">
                    Vision
                  </h3>
                  <p className="text-sm text-blue-100">{squadron.vision}</p>
                </div>
              </div>
            </div>

            {squadron.afscs.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-300 mb-2">
                  AFSCs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                  {squadron.afscs.map((afsc) => (
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

export default async function LeadershipPage() {
  const allLeaders = await prisma.leadershipProfile.findMany({
    where: { isActive: true, profileType: "leadership" },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      rank: true,
      title: true,
      unit: true,
      photoUrl: true,
    },
  });

  const groupLeaders = allLeaders.filter((l) => l.unit === GROUP_UNIT);
  const squadronLeaders = SQUADRONS.map((squadron) => ({
    squadron,
    leaders: allLeaders.filter((l) => l.unit === squadron.unit),
  }));

  return (
    <div>
      <PageHeader
        title="Meet Your Leadership"
        description="The command team of the 937th Training Group at JBSA-Fort Sam Houston."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        <GroupSection leaders={groupLeaders} />
        {squadronLeaders.map(({ squadron, leaders }) => (
          <SquadronSection
            key={squadron.unit}
            squadron={squadron}
            leaders={leaders}
          />
        ))}
      </div>
    </div>
  );
}
