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
  Globe,
  DollarSign,
  Scale,
  Route,
  BadgeInfo,
  HeartHandshake,
  ShieldAlert,
  Heart,
  Home,
  Share2,
  FileText,
  Calendar,
  Star,
  Info,
  Link as LinkLucide,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnnouncementCard } from "@/components/shared/announcement-card";
import { SITE_CONFIG } from "@/lib/constants";
import { getActiveAnnouncements } from "@/lib/actions/announcements";
import { getCollectionBySlug, HOME_SLUGS } from "@/lib/actions/links";
import { getAllSettings } from "@/lib/actions/settings";

export const dynamic = "force-dynamic";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Phone, MapPin, ClipboardList, BookOpen, LogIn, LogOut, GraduationCap,
  UtensilsCrossed, Bus, Award, Search, Shield, UserCheck, Globe, DollarSign,
  Scale, Route, BadgeInfo, HeartHandshake, ShieldAlert, Heart, Home, Share2,
  FileText, Calendar, Star, Info, Link: LinkLucide,
};

const QUICK_PALETTE = [
  "bg-teal-50 text-teal-600 border-teal-200",
  "bg-green-50 text-green-600 border-green-200",
  "bg-blue-50 text-blue-600 border-blue-200",
  "bg-indigo-50 text-indigo-600 border-indigo-200",
  "bg-purple-50 text-purple-600 border-purple-200",
  "bg-orange-50 text-orange-600 border-orange-200",
  "bg-amber-50 text-amber-600 border-amber-200",
  "bg-cyan-50 text-cyan-600 border-cyan-200",
  "bg-red-50 text-red-600 border-red-200",
  "bg-slate-50 text-slate-600 border-slate-200",
  "bg-stone-50 text-stone-600 border-stone-200",
  "bg-yellow-50 text-yellow-600 border-yellow-200",
];

const QUICK_FALLBACK = [
  { id: "q1", title: "In-Processing", url: "/in-processing", icon: "LogIn" },
  { id: "q2", title: "Phone Numbers", url: "/phone-numbers", icon: "Phone" },
  { id: "q3", title: "Leadership", url: "/leadership", icon: "Users" },
  { id: "q4", title: "MTLs", url: "/mtls", icon: "UserCheck" },
  { id: "q5", title: "Locations", url: "/locations", icon: "MapPin" },
  { id: "q6", title: "Work Orders", url: "/work-orders", icon: "ClipboardList" },
  { id: "q7", title: "AiT Guide", url: "/ait-guide", icon: "BookOpen" },
  { id: "q8", title: "METC", url: "/metc", icon: "GraduationCap" },
  { id: "q9", title: "Out-Processing", url: "/out-processing", icon: "LogOut" },
  { id: "q10", title: "WO Status", url: "/work-orders/status", icon: "Search" },
  { id: "q11", title: "Spartan/CQ", url: "/spartan-flight", icon: "Shield" },
  { id: "q12", title: "Leadership Programs", url: "/leadership-programs", icon: "Award" },
];

const RESOURCES_FALLBACK = [
  { id: "r1", title: "DFAC Hours", url: "/dfac-hours", icon: "UtensilsCrossed" },
  { id: "r2", title: "Shuttle Route", url: "/shuttle", icon: "Bus" },
  { id: "r3", title: "Leadership Programs", url: "/leadership-programs", icon: "Award" },
];

type LinkRow = { id: string; title: string; url: string; icon: string | null };

async function loadHomeColumn(
  slug: string,
  fallback: LinkRow[]
): Promise<LinkRow[]> {
  try {
    const c = await getCollectionBySlug(slug);
    if (!c || c.items.length === 0) return fallback;
    return c.items.map((i) => ({
      id: i.id,
      title: i.title,
      url: i.url,
      icon: i.icon,
    }));
  } catch {
    return fallback;
  }
}

export default async function HomePage() {
  const [dbAnnouncements, quickLinks, resourceLinks, settings] =
    await Promise.all([
      getActiveAnnouncements(),
      loadHomeColumn(HOME_SLUGS.quick, QUICK_FALLBACK),
      loadHomeColumn(HOME_SLUGS.resources, RESOURCES_FALLBACK),
      getAllSettings(),
    ]);

  const announcements = dbAnnouncements.map((a) => ({
    title: a.title,
    content:
      typeof a.content === "object" && a.content !== null && "html" in a.content
        ? String(a.content.html)
        : "",
    priority: a.priority as "normal" | "important" | "urgent",
    date: a.publishDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    isPinned: a.isPinned,
  }));

  const siteName = settings.siteName || SITE_CONFIG.name;
  const location = settings.location || SITE_CONFIG.location;
  const mission = settings.mission || SITE_CONFIG.mission;

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
                alt={`${siteName} Emblem`}
                width={120}
                height={120}
                className="h-20 w-20 md:h-28 md:w-28 object-contain drop-shadow-lg"
                priority
              />
            </div>

            <h1 className="text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {siteName}
            </h1>
            <p className="mt-1 text-xs text-gray-400 md:text-sm">
              {location}
            </p>

            {/* Mission */}
            <div className="mt-4 max-w-xl md:mt-6">
              <p className="text-xs text-military-gold font-semibold uppercase tracking-widest mb-1">
                Mission
              </p>
              <p className="text-sm text-gray-300 leading-relaxed md:text-base">
                {mission}
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
                className="flex-1 md:flex-none border-white text-white hover:bg-white/20 text-sm"
              >
                <Link href="/phone-numbers">Phone Directory</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mx-auto max-w-7xl px-3 py-6 md:px-4 md:py-10">
        <h2 className="text-base font-bold text-foreground mb-3 px-1 md:text-lg md:mb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {quickLinks.map((link, idx) => {
            const Icon = link.icon ? iconMap[link.icon] : null;
            const color = QUICK_PALETTE[idx % QUICK_PALETTE.length];
            return (
              <Link key={link.id} href={link.url}>
                <Card className="hover:shadow-md transition-all active:scale-95 h-full border">
                  <CardContent className="flex flex-col items-center gap-1.5 p-3 text-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${color} border`}
                    >
                      {Icon ? <Icon className="h-5 w-5" /> : <LinkLucide className="h-5 w-5" />}
                    </div>
                    <span className="text-[11px] font-medium leading-tight text-foreground">
                      {link.title}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
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
            {resourceLinks.map((link) => {
              const Icon = link.icon ? iconMap[link.icon] : null;
              return (
                <Link key={link.id} href={link.url}>
                  <Card className="hover:shadow-md transition-shadow active:scale-[0.98] group">
                    <CardContent className="flex items-center gap-3 p-3 md:p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue shrink-0">
                        {Icon ? <Icon className="h-4 w-4" /> : <LinkLucide className="h-4 w-4" />}
                      </div>
                      <span className="flex-1 text-sm font-medium">
                        {link.title}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-military-blue transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
