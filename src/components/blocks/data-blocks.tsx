import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  CheckCircle2,
  GraduationCap,
  MapPin,
  ExternalLink,
  Download,
  FileText,
  FileImage,
  FileSpreadsheet,
  File as FileIcon,
  Link as LinkIcon,
  ChevronRight,
  Clock,
  Bus,
} from "lucide-react";
import { getAllRopePrograms } from "@/lib/actions/rope-programs";
import { getActiveAfscs } from "@/lib/actions/afscs";
import { getLocations } from "@/lib/actions/locations";
import { listPublicFiles } from "@/lib/actions/files";
import { getAllCollections } from "@/lib/actions/links";
import { getCurrentSchedules } from "@/lib/actions/schedules";
import { getMtlProfiles } from "@/lib/actions/leadership";
import { getContacts } from "@/lib/actions/contacts";
import { getAllSquadrons } from "@/lib/actions/squadrons";
import { getAllSettings } from "@/lib/actions/settings";
import { RESERVED_SLUGS } from "@/lib/links-constants";
import { PhoneDirectory } from "@/components/shared/phone-directory";
import { ShareWidget } from "@/components/shared/share-widget";
import { WorkOrderForm } from "@/components/shared/work-order-form";
import { ProfileCard } from "@/components/shared/profile-card";
import { prisma } from "@/lib/prisma";
import type { RopeColor } from "@prisma/client";

function extractText(value: unknown): string {
  if (value && typeof value === "object" && "text" in value) {
    return String((value as { text?: unknown }).text ?? "");
  }
  return "";
}

function extractList(
  value: unknown,
  key: "requirements" | "responsibilities"
): string[] {
  if (value && typeof value === "object" && key in value) {
    const list = (value as Record<string, unknown>)[key];
    if (Array.isArray(list)) return list.map(String);
  }
  return [];
}

const ropeColorStyles: Record<
  RopeColor,
  { border: string; bg: string; badge: string; label: string }
> = {
  green: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50",
    badge: "bg-emerald-500 text-white",
    label: "Green",
  },
  yellow: {
    border: "border-l-amber-500",
    bg: "bg-amber-50",
    badge: "bg-amber-500 text-white",
    label: "Yellow",
  },
  red: {
    border: "border-l-red-500",
    bg: "bg-red-50",
    badge: "bg-red-500 text-white",
    label: "Red",
  },
};

export async function RopeProgramsRenderer() {
  const programs = await getAllRopePrograms();

  if (programs.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-sm text-muted-foreground">
          Rope programs have not been set up yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {programs.map((program) => {
        const style = ropeColorStyles[program.ropeColor];
        const description = extractText(program.description);
        const requirements = extractList(program.requirements, "requirements");
        const responsibilities = extractList(
          program.requirements,
          "responsibilities"
        );

        return (
          <Card
            key={program.id}
            className={`border-l-4 ${style.border} overflow-hidden`}
          >
            <CardHeader className={style.bg}>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5" />
                <div>
                  <Badge className={style.badge}>{style.label} Rope</Badge>
                  <CardTitle className="text-lg mt-1">
                    {program.title}
                  </CardTitle>
                </div>
              </div>
              {description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {description}
                </p>
              )}
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {requirements.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {requirements.map((req, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {responsibilities.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3">
                      Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      {responsibilities.map((resp, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-military-blue mt-0.5" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export async function AfscGridRenderer() {
  const afscs = await getActiveAfscs();

  if (afscs.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-sm text-muted-foreground">
          No AFSCs have been published yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {afscs.map((afsc) => (
        <Card key={afsc.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge variant="default" className="font-mono">
                {afsc.code}
              </Badge>
              {afsc.duration && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <GraduationCap className="h-3 w-3" />~{afsc.duration}
                </div>
              )}
            </div>
            <h3 className="text-sm font-semibold mb-1">{afsc.title}</h3>
            {afsc.description && (
              <p className="text-xs text-muted-foreground">
                {afsc.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const locationCategoryColors: Record<string, string> = {
  Training: "bg-blue-100 text-blue-700",
  Housing: "bg-purple-100 text-purple-700",
  Dining: "bg-amber-100 text-amber-700",
  Services: "bg-green-100 text-green-700",
  Recreation: "bg-teal-100 text-teal-700",
  Medical: "bg-red-100 text-red-700",
  Support: "bg-indigo-100 text-indigo-700",
  Education: "bg-cyan-100 text-cyan-700",
  Access: "bg-gray-100 text-gray-700",
};

export async function LocationGridRenderer() {
  const locations = await getLocations();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {locations.map((loc) => (
        <Card key={loc.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="font-semibold text-sm">{loc.name}</h3>
              <Badge
                className={`${locationCategoryColors[loc.category] || "bg-gray-100 text-gray-700"} text-[10px] shrink-0`}
              >
                {loc.category}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
              <MapPin className="h-3 w-3" />
              {loc.address}
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-military-blue hover:underline"
            >
              Get Directions
              <ExternalLink className="h-3 w-3" />
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function fileIconFor(mimeType: string) {
  if (mimeType.startsWith("image/")) return FileImage;
  if (mimeType.includes("pdf") || mimeType.includes("text")) return FileText;
  if (mimeType.includes("sheet") || mimeType.includes("csv"))
    return FileSpreadsheet;
  return FileIcon;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const fileDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export async function FileGridRenderer() {
  const files = await listPublicFiles();

  if (files.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-sm text-muted-foreground">
          No files have been uploaded yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {files.map((f) => {
        const Icon = fileIconFor(f.mimeType);
        return (
          <a
            key={f.id}
            href={f.publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="group"
          >
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold flex items-center gap-1 mb-1 truncate">
                      {f.filename}
                      <Download className="h-3 w-3 text-muted-foreground shrink-0" />
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(f.sizeBytes)} &middot;{" "}
                      {fileDateFormatter.format(new Date(f.createdAt))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        );
      })}
    </div>
  );
}

type Meal = { name: string; time: string; notes?: string };

function extractMeals(content: unknown): Meal[] {
  if (content && typeof content === "object" && "meals" in content) {
    const meals = (content as { meals?: unknown }).meals;
    if (Array.isArray(meals)) {
      return meals
        .filter(
          (m): m is Meal =>
            typeof m === "object" &&
            m !== null &&
            "name" in m &&
            "time" in m
        )
        .map((m) => ({
          name: String(m.name),
          time: String(m.time),
          notes: m.notes ? String(m.notes) : undefined,
        }));
    }
  }
  return [];
}

function dfacBadgeVariant(
  title: string
): "default" | "secondary" | "outline" {
  const t = title.toLowerCase();
  if (t.includes("holiday")) return "outline";
  if (t.includes("weekend")) return "secondary";
  return "default";
}

function dfacLabel(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("holiday")) return "Holidays";
  if (t.includes("weekend")) return "Sat - Sun";
  if (t.includes("weekday")) return "Mon - Fri";
  return "Current";
}

async function DfacScheduleRenderer() {
  const schedules = await getCurrentSchedules("dfac");

  if (schedules.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-sm text-muted-foreground">
          No DFAC schedules have been posted yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {schedules.map((schedule) => {
        const meals = extractMeals(schedule.content);
        return (
          <Card key={schedule.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{schedule.title}</CardTitle>
                <Badge variant={dfacBadgeVariant(schedule.title)}>
                  {dfacLabel(schedule.title)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {meals.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No meals listed.
                </p>
              ) : (
                <div className="space-y-3">
                  {meals.map((meal) => (
                    <div key={meal.name} className="flex items-start gap-3">
                      <Clock className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">{meal.name}</p>
                        <p className="text-xs text-military-blue font-medium">
                          {meal.time}
                        </p>
                        {meal.notes && (
                          <p className="text-xs text-muted-foreground">
                            {meal.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

type Stop = { name: string; time: string };
type ShuttleContent = {
  operatingHours?: { weekday?: string; weekend?: string };
  frequency?: string;
  stops?: Stop[];
};

function extractShuttle(content: unknown): ShuttleContent {
  if (!content || typeof content !== "object") return {};
  const c = content as Record<string, unknown>;
  const stopsRaw = c.stops;
  const stops = Array.isArray(stopsRaw)
    ? stopsRaw
        .filter(
          (s): s is Stop =>
            typeof s === "object" && s !== null && "name" in s && "time" in s
        )
        .map((s) => ({ name: String(s.name), time: String(s.time) }))
    : undefined;
  const hours = c.operatingHours as ShuttleContent["operatingHours"];
  const frequency = typeof c.frequency === "string" ? c.frequency : undefined;
  return { operatingHours: hours, frequency, stops };
}

async function ShuttleScheduleRenderer() {
  const schedules = await getCurrentSchedules("shuttle");
  const primary = schedules[0];

  if (!primary) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-sm text-muted-foreground">
          No shuttle schedule has been posted yet.
        </CardContent>
      </Card>
    );
  }

  const data = extractShuttle(primary.content);
  const stops = data.stops ?? [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Bus className="h-5 w-5 text-teal-600" />
            <div>
              <p className="text-xs text-muted-foreground">Service</p>
              <p className="text-sm font-medium">{primary.title}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Clock className="h-5 w-5 text-teal-600" />
            <div>
              <p className="text-xs text-muted-foreground">Operating Hours</p>
              {data.operatingHours?.weekday && (
                <p className="text-sm font-medium">
                  {data.operatingHours.weekday}
                </p>
              )}
              {data.operatingHours?.weekend && (
                <p className="text-xs text-muted-foreground">
                  {data.operatingHours.weekend}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <MapPin className="h-5 w-5 text-teal-600" />
            <div>
              <p className="text-xs text-muted-foreground">Frequency</p>
              <p className="text-sm font-medium">{data.frequency ?? "—"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bus className="h-5 w-5 text-teal-600" />
            <CardTitle className="text-lg">
              Route Stops &amp; Estimated Times
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground">
            Times shown are minutes past the hour (e.g., :00 = on the hour, :30
            = half past)
          </p>
        </CardHeader>
        <CardContent>
          {stops.length === 0 ? (
            <p className="text-xs text-muted-foreground">No stops listed.</p>
          ) : (
            <div className="space-y-0">
              {stops.map((stop, i) => (
                <div
                  key={stop.name}
                  className="flex items-center gap-4 py-3 border-b last:border-0"
                >
                  <div className="flex flex-col items-center w-6">
                    <div className="h-3 w-3 rounded-full bg-teal-500 border-2 border-white shadow" />
                    {i < stops.length - 1 && (
                      <div className="w-0.5 h-6 bg-teal-200" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{stop.name}</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">
                    {stop.time}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export async function ScheduleDisplayRenderer({
  scheduleType,
}: {
  scheduleType: "dfac" | "shuttle";
}) {
  if (scheduleType === "shuttle") return <ShuttleScheduleRenderer />;
  return <DfacScheduleRenderer />;
}

export async function MtlGridRenderer() {
  const mtls = await getMtlProfiles();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {mtls.map((mtl) => (
        <ProfileCard
          key={mtl.id}
          name={mtl.name}
          rank={mtl.rank}
          title={mtl.title}
          unit={mtl.unit}
          photoUrl={mtl.photoUrl ?? undefined}
        />
      ))}
    </div>
  );
}

export async function PhoneDirectoryRenderer() {
  const contacts = await getContacts();
  return <PhoneDirectory contacts={contacts} />;
}

export function ShareWidgetRenderer() {
  return <ShareWidget />;
}

export function WorkOrderFormRenderer() {
  return <WorkOrderForm />;
}

type LeadershipLeader = {
  id: string;
  name: string;
  rank: string;
  title: string;
  unit: string;
  photoUrl: string | null;
};

const LEADERSHIP_TITLE_ORDER = [
  "Commander",
  "Deputy Commander",
  "Section Commander",
  "Senior Enlisted Leader",
  "First Sergeant",
];

function orderLeadershipLeaders(
  leaders: LeadershipLeader[]
): LeadershipLeader[] {
  return [...leaders].sort((a, b) => {
    const ai = LEADERSHIP_TITLE_ORDER.indexOf(a.title);
    const bi = LEADERSHIP_TITLE_ORDER.indexOf(b.title);
    const aIndex = ai === -1 ? 999 : ai;
    const bIndex = bi === -1 ? 999 : bi;
    return aIndex - bIndex;
  });
}

function squadronAfscList(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
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
      // eslint-disable-next-line @next/next/no-img-element
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
  leaders: LeadershipLeader[];
  groupUnit: string;
  groupDescription: string;
  location: string;
}) {
  const ordered = orderLeadershipLeaders(leaders);
  const commander = ordered.find((l) => l.title === "Commander");
  const others = ordered.filter((l) => l.title !== "Commander");

  return (
    <section className="rounded-lg bg-military-navy text-white overflow-hidden">
      <div className="p-6 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
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

type SquadronItem = {
  id: string;
  unit: string;
  motto: string | null;
  mission: string | null;
  vision: string | null;
  afscs: unknown;
};

function SquadronSection({
  squadron,
  leaders,
}: {
  squadron: SquadronItem;
  leaders: LeadershipLeader[];
}) {
  const ordered = orderLeadershipLeaders(leaders);
  const commander = ordered.find((l) => l.title === "Commander");
  const others = ordered.filter((l) => l.title !== "Commander");
  const squadronNumber = squadron.unit.match(/\d+/)?.[0] ?? "";
  const afscs = squadronAfscList(squadron.afscs);

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

export async function LeadershipDisplayRenderer() {
  const [allLeaders, squadrons, settings] = await Promise.all([
    prisma.leadershipProfile.findMany({
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
    }),
    getAllSquadrons(),
    getAllSettings(),
  ]);

  const groupUnit = settings.siteName || "937th Training Group";
  const groupDescription = settings.groupDescription || "";
  const location = settings.location || "JBSA-Fort Sam Houston, TX";

  const groupLeaders = allLeaders.filter((l) => l.unit === groupUnit);
  const squadronLeaders = squadrons.map((squadron) => ({
    squadron,
    leaders: allLeaders.filter((l) => l.unit === squadron.unit),
  }));

  return (
    <div className="space-y-8">
      <GroupSection
        leaders={groupLeaders}
        groupUnit={groupUnit}
        groupDescription={groupDescription}
        location={location}
      />
      {squadronLeaders.map(({ squadron, leaders }) => (
        <SquadronSection
          key={squadron.id}
          squadron={squadron}
          leaders={leaders}
        />
      ))}
    </div>
  );
}

export async function LinkCollectionsRenderer() {
  const all = await getAllCollections();
  const collections = all.filter((c) => !RESERVED_SLUGS.has(c.slug));

  if (collections.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No link collections have been published yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((c) => (
        <Link key={c.id} href={`/links/${c.slug}`} className="group">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue">
                  <LinkIcon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold flex items-center gap-1 mb-1">
                    {c.title}
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  </h3>
                  {c.description && (
                    <p className="text-xs text-muted-foreground">
                      {c.description}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    {c._count.items} {c._count.items === 1 ? "link" : "links"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
