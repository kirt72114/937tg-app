import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Meet Your Leadership",
};

const GROUP_LEADERSHIP = {
  name: "937th Training Group",
  subtitle: "Medical Education & Training Campus (METC)",
  location: "JBSA-Fort Sam Houston, TX",
  description: `The 937th Training Group, headquartered at JBSA-Fort Sam Houston, Texas, is a crucial component of the 59th Medical Wing. The group is dedicated to providing world-class enlisted medical readiness training at the Medical Education and Training Campus.

With a dedicated team of 601 active-duty and civilian professionals, the group bears the responsibility for preparing over 14,700 students annually across 82 programs of instruction spanning 64 distinct courses and components, covering 51 enlisted Air Force specialty codes.

The group's mission extends to overseeing the completion of Phase II initial skills training for enlisted Air Force specialty codes and conducting officer clinical readiness training, ensuring personnel are ready to deliver healthcare in all settings and conditions.`,
  commander: {
    name: "Brian Caruthers",
    rank: "Col",
    title: "Commander",
    photo: "/images/leadership/col-caruthers-brian.jpg",
  },
  leaders: [
    {
      name: "Mark Hassett",
      rank: "Lt Col",
      title: "Deputy Commander",
      photo: "/images/leadership/ltcol-hassett-mark.jpg",
    },
    {
      name: "James Keller",
      rank: "CMSgt",
      title: "Senior Enlisted Leader",
      photo: null,
    },
  ],
};

const SQUADRONS = [
  {
    name: "381st Training Squadron",
    motto: "Forge to Excellence and Commitment",
    commander: {
      name: "Heather Brooks",
      rank: "Lt Col",
      title: "Commander",
      photo: "/images/leadership/ltcol-brooks-heather.jpg",
    },
    leaders: [
      {
        name: "Erica Gunderson",
        rank: "Capt",
        title: "Section Commander",
        photo: "/images/leadership/capt-gunderson-erica.jpg",
      },
      {
        name: "Justin Rhodes",
        rank: "MSG",
        title: "Senior Enlisted Leader",
        photo: "/images/leadership/msg-rhodes-justin.jpg",
      },
      {
        name: "Nathan Bentley",
        rank: "MSgt",
        title: "First Sergeant",
        photo: "/images/leadership/msgt-bentley-nathan.png",
      },
    ],
    mission: "To train and empower mission-essential medics.",
    vision:
      "An inclusive team, developing one medic at a time for the future fight.",
    afscs: [
      "4Y0X1 - Dental Assistant",
      "4Y0X2 - Dental Laboratory",
    ],
  },
  {
    name: "382d Training Squadron",
    motto: "Train Today's Medics for Tomorrow's Fight",
    commander: {
      name: "Christopher Dufford",
      rank: "Lt Col",
      title: "Commander",
      photo: "/images/leadership/ltcol-dufford-christopher.jpg",
    },
    leaders: [
      {
        name: "Michael Mask",
        rank: "Capt",
        title: "Section Commander",
        photo: "/images/leadership/capt-mask-michael.jpg",
      },
      {
        name: "Veronica Everest",
        rank: "CMSgt",
        title: "Senior Enlisted Leader",
        photo: "/images/leadership/cmsgt-everest-veronica.jpg",
      },
      {
        name: "Stacey Williamson",
        rank: "MSgt",
        title: "First Sergeant",
        photo: "/images/leadership/msgt-williamson-stacey.jpg",
      },
    ],
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
    name: "383d Training Squadron",
    motto: "METC's Finest, Mission Focused",
    commander: {
      name: "Tracy Davis",
      rank: "Lt Col",
      title: "Commander",
      photo: "/images/leadership/ltcol-davis-tracy.png",
    },
    leaders: [
      {
        name: "Rubert Laco",
        rank: "Maj",
        title: "Section Commander",
        photo: "/images/leadership/maj-laco-rubert.jpg",
      },
      {
        name: "Patricia Lazano",
        rank: "CMSgt",
        title: "Senior Enlisted Leader",
        photo: null,
      },
      {
        name: "James Kendall",
        rank: "SMSgt",
        title: "First Sergeant",
        photo: "/images/leadership/smsgt-kendall-james.jpg",
      },
    ],
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

function LeaderPhoto({
  name,
  rank,
  photo,
  size = "sm",
}: {
  name: string;
  rank: string;
  photo: string | null;
  size?: "lg" | "sm";
}) {
  const dimensions =
    size === "lg" ? "h-64 w-52 md:h-80 md:w-64" : "h-28 w-24 md:h-36 md:w-28";

  if (photo) {
    return (
      <img
        src={photo}
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

function GroupSection() {
  const { commander, leaders, description } = GROUP_LEADERSHIP;

  return (
    <section className="rounded-lg bg-military-navy text-white overflow-hidden">
      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src="/images/937Logo.png"
            alt="937th Training Group Emblem"
            className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white p-1"
          />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {GROUP_LEADERSHIP.name}
            </h2>
            <p className="text-sm text-gray-300">
              {GROUP_LEADERSHIP.subtitle}
            </p>
            <p className="text-xs text-gray-400">
              {GROUP_LEADERSHIP.location}
            </p>
          </div>
        </div>

        {/* Commander photo + info */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center md:items-start">
            <LeaderPhoto
              name={commander.name}
              rank={commander.rank}
              photo={commander.photo}
              size="lg"
            />
            {/* Other leaders photos */}
            <div className="flex gap-3 mt-4">
              {leaders.map((leader) => (
                <LeaderPhoto
                  key={leader.name}
                  name={leader.name}
                  rank={leader.rank}
                  photo={leader.photo}
                  size="sm"
                />
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-6">
            {/* Leadership roster */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-military-gold">
                  Commander
                </p>
                <p className="text-sm">
                  {commander.rank} {commander.name}
                </p>
              </div>
              {leaders.map((leader) => (
                <div key={leader.name}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-military-gold">
                    {leader.title}
                  </p>
                  <p className="text-sm">
                    {leader.rank} {leader.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              {description}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SquadronSection({
  squadron,
}: {
  squadron: (typeof SQUADRONS)[number];
}) {
  return (
    <section className="rounded-lg bg-[#3a6fbf] text-white overflow-hidden">
      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-full bg-military-navy text-military-gold border-2 border-military-gold text-xl font-bold">
            {squadron.name.match(/\d+/)?.[0]}
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{squadron.name}</h2>
            {squadron.motto && (
              <p className="text-sm italic text-blue-100">
                &ldquo;{squadron.motto}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* Content grid */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Photos */}
          <div className="flex flex-col items-center md:items-start">
            <LeaderPhoto
              name={squadron.commander.name}
              rank={squadron.commander.rank}
              photo={squadron.commander.photo}
              size="lg"
            />
            <div className="flex gap-3 mt-4">
              {squadron.leaders.map((leader) => (
                <LeaderPhoto
                  key={leader.name}
                  name={leader.name}
                  rank={leader.rank}
                  photo={leader.photo}
                  size="sm"
                />
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1 space-y-6">
            {/* Leadership roster */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-yellow-300">
                    Commander
                  </p>
                  <p className="text-sm">
                    {squadron.commander.rank} {squadron.commander.name}
                  </p>
                </div>
                {squadron.leaders.map((leader) => (
                  <div key={leader.name}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-yellow-300">
                      {leader.title}
                    </p>
                    <p className="text-sm">
                      {leader.rank} {leader.name}
                    </p>
                  </div>
                ))}
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

            {/* AFSCs */}
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

export default function LeadershipPage() {
  return (
    <div>
      <PageHeader
        title="Meet Your Leadership"
        description="The command team of the 937th Training Group at JBSA-Fort Sam Houston."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        <GroupSection />
        {SQUADRONS.map((squadron) => (
          <SquadronSection key={squadron.name} squadron={squadron} />
        ))}
      </div>
    </div>
  );
}
