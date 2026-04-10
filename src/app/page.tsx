import Link from "next/link";
import {
  Users,
  Phone,
  MapPin,
  ClipboardList,
  BookOpen,
  LogIn,
  LogOut,
  GraduationCap,
  UtensilsCrossed,
  Bus,
  Award,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnnouncementCard } from "@/components/shared/announcement-card";
import { SITE_CONFIG } from "@/lib/constants";
import { getActiveAnnouncements } from "@/lib/actions/announcements";

export const dynamic = "force-dynamic";

const quickLinks = [
  {
    title: "Meet Your Leadership",
    href: "/leadership",
    icon: Users,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Phone Numbers",
    href: "/phone-numbers",
    icon: Phone,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Locations",
    href: "/locations",
    icon: MapPin,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Work Orders",
    href: "/work-orders",
    icon: ClipboardList,
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "In-Processing",
    href: "/in-processing",
    icon: LogIn,
    color: "bg-teal-100 text-teal-700",
  },
  {
    title: "Out-Processing",
    href: "/out-processing",
    icon: LogOut,
    color: "bg-red-100 text-red-700",
  },
  {
    title: "AiT Guide",
    href: "/ait-guide",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "METC",
    href: "/metc",
    icon: GraduationCap,
    color: "bg-indigo-100 text-indigo-700",
  },
];

const resourceLinks = [
  { title: "DFAC Hours", href: "/dfac-hours", icon: UtensilsCrossed },
  { title: "Shuttle Route", href: "/shuttle", icon: Bus },
  { title: "Leadership Programs", href: "/leadership-programs", icon: Award },
];

export default async function HomePage() {
  const dbAnnouncements = await getActiveAnnouncements();
  const announcements = dbAnnouncements.map((a) => ({
    title: a.title,
    content: typeof a.content === "object" && a.content !== null && "html" in a.content
      ? String(a.content.html)
      : "",
    priority: a.priority as "normal" | "important" | "urgent",
    date: a.publishDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    isPinned: a.isPinned,
  }));
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-military-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-military-navy via-military-blue to-military-navy opacity-90" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-20">
          <div className="flex flex-col items-center text-center">
            {/* Unit Emblem Placeholder */}
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-military-gold bg-military-navy shadow-xl md:h-32 md:w-32">
              <span className="text-3xl font-bold text-military-gold md:text-4xl">
                937
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              {SITE_CONFIG.name}
            </h1>
            <Badge
              variant="outline"
              className="mt-3 border-military-gold text-military-gold"
            >
              {SITE_CONFIG.branch}
            </Badge>

            {/* Mission & Vision */}
            <div className="mt-8 max-w-2xl space-y-4">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-military-gold">
                  Mission
                </h2>
                <p className="mt-1 text-sm text-gray-300 md:text-base">
                  {SITE_CONFIG.mission}
                </p>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-military-gold">
                  Vision
                </h2>
                <p className="mt-1 text-sm text-gray-300 md:text-base">
                  {SITE_CONFIG.vision}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-military-gold text-military-navy hover:bg-military-gold/90 font-semibold"
              >
                <Link href="/in-processing">In-Processing</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/phone-numbers">Phone Directory</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <h2 className="text-lg font-bold text-foreground mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 h-full">
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${link.color}`}
                  >
                    <link.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium leading-tight">
                    {link.title}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Announcements */}
      <section className="mx-auto max-w-7xl px-4 pb-8 md:pb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Announcements</h2>
        </div>
        <div className="space-y-3">
          {announcements.map((announcement, i) => (
            <AnnouncementCard key={i} {...announcement} />
          ))}
        </div>
      </section>

      {/* Resources Strip */}
      <section className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {resourceLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card className="hover:shadow-md transition-shadow group">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue">
                      <link.icon className="h-4 w-4" />
                    </div>
                    <span className="flex-1 text-sm font-medium">
                      {link.title}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-military-blue transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
