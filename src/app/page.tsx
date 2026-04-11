import Link from "next/link";
import Image from "next/image";
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
  Search,
  Shield,
  UserCheck,
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
    title: "In-Processing",
    href: "/in-processing",
    icon: LogIn,
    color: "bg-teal-50 text-teal-600 border-teal-200",
  },
  {
    title: "Phone Numbers",
    href: "/phone-numbers",
    icon: Phone,
    color: "bg-green-50 text-green-600 border-green-200",
  },
  {
    title: "Leadership",
    href: "/leadership",
    icon: Users,
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    title: "MTLs",
    href: "/mtls",
    icon: UserCheck,
    color: "bg-indigo-50 text-indigo-600 border-indigo-200",
  },
  {
    title: "Locations",
    href: "/locations",
    icon: MapPin,
    color: "bg-purple-50 text-purple-600 border-purple-200",
  },
  {
    title: "Work Orders",
    href: "/work-orders",
    icon: ClipboardList,
    color: "bg-orange-50 text-orange-600 border-orange-200",
  },
  {
    title: "AiT Guide",
    href: "/ait-guide",
    icon: BookOpen,
    color: "bg-amber-50 text-amber-600 border-amber-200",
  },
  {
    title: "METC",
    href: "/metc",
    icon: GraduationCap,
    color: "bg-cyan-50 text-cyan-600 border-cyan-200",
  },
  {
    title: "Out-Processing",
    href: "/out-processing",
    icon: LogOut,
    color: "bg-red-50 text-red-600 border-red-200",
  },
  {
    title: "WO Status",
    href: "/work-orders/status",
    icon: Search,
    color: "bg-slate-50 text-slate-600 border-slate-200",
  },
  {
    title: "Spartan/CQ",
    href: "/spartan-flight",
    icon: Shield,
    color: "bg-stone-50 text-stone-600 border-stone-200",
  },
  {
    title: "Leadership Programs",
    href: "/leadership-programs",
    icon: Award,
    color: "bg-yellow-50 text-yellow-600 border-yellow-200",
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
      {/* Hero Section — compact on mobile */}
      <section className="relative bg-military-navy text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-military-navy via-military-blue/30 to-military-navy" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 md:py-16">
          <div className="flex flex-col items-center text-center">
            {/* Real Logo */}
            <div className="mb-4 md:mb-6">
              <Image
                src="/images/937Logo.png"
                alt="937th Training Group Emblem"
                width={120}
                height={120}
                className="h-20 w-20 md:h-28 md:w-28 object-contain drop-shadow-lg"
                priority
              />
            </div>

            <h1 className="text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {SITE_CONFIG.name}
            </h1>
            <p className="mt-1 text-xs text-gray-400 md:text-sm">
              JBSA-Fort Sam Houston, TX
            </p>

            {/* Mission — visible on all sizes but compact on mobile */}
            <div className="mt-4 max-w-xl md:mt-6">
              <p className="text-xs text-military-gold font-semibold uppercase tracking-widest mb-1">
                Mission
              </p>
              <p className="text-sm text-gray-300 leading-relaxed md:text-base">
                {SITE_CONFIG.mission}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex gap-3 w-full max-w-sm md:max-w-none md:w-auto">
              <Button
                asChild
                size="lg"
                className="flex-1 md:flex-none bg-military-gold text-military-navy hover:bg-military-gold/90 font-semibold text-sm"
              >
                <Link href="/in-processing">In-Processing</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="flex-1 md:flex-none border-white/30 text-white hover:bg-white/10 text-sm"
              >
                <Link href="/phone-numbers">Phone Directory</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links — 3-column grid on mobile for thumb-friendly tapping */}
      <section className="mx-auto max-w-7xl px-3 py-6 md:px-4 md:py-10">
        <h2 className="text-base font-bold text-foreground mb-3 px-1 md:text-lg md:mb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="hover:shadow-md transition-all active:scale-95 h-full border">
                <CardContent className="flex flex-col items-center gap-1.5 p-3 text-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${link.color} border`}
                  >
                    <link.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-medium leading-tight text-foreground">
                    {link.title}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Announcements */}
      <section className="mx-auto max-w-7xl px-3 pb-6 md:px-4 md:pb-10">
        <h2 className="text-base font-bold text-foreground mb-3 px-1 md:text-lg md:mb-4">
          Announcements
        </h2>
        {announcements.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              No announcements at this time.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {announcements.map((announcement, i) => (
              <AnnouncementCard key={i} {...announcement} />
            ))}
          </div>
        )}
      </section>

      {/* Resources Strip */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-3 py-6 md:px-4 md:py-8">
          <h2 className="text-base font-bold text-foreground mb-3 px-1 md:text-lg md:mb-4">
            Resources
          </h2>
          <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-3 md:gap-3">
            {resourceLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card className="hover:shadow-md transition-shadow active:scale-[0.98] group">
                  <CardContent className="flex items-center gap-3 p-3 md:p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue shrink-0">
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
