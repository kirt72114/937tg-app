"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Home,
  Users,
  UserCheck,
  GraduationCap,
  Phone,
  BookOpen,
  Scale,
  Globe,
  DollarSign,
  LogIn,
  LogOut,
  MapPin,
  ClipboardList,
  Menu,
  ChevronDown,
  Search,
  UtensilsCrossed,
  Bus,
  Route,
  BadgeInfo,
  HeartHandshake,
  Award,
  Shield,
  ShieldAlert,
  Link as LinkIcon,
  Share2,
  FileText,
  Calendar,
  Star,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants";

export type NavItemData = {
  label: string;
  href: string;
  icon: string | null;
  section: string;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Users,
  UserCheck,
  GraduationCap,
  Phone,
  BookOpen,
  Scale,
  Globe,
  DollarSign,
  LogIn,
  LogOut,
  MapPin,
  ClipboardList,
  Menu,
  Search,
  UtensilsCrossed,
  Bus,
  Route,
  BadgeInfo,
  HeartHandshake,
  Award,
  Shield,
  ShieldAlert,
  Link: LinkIcon,
  Share2,
  FileText,
  Calendar,
  Star,
  Info,
};

function toNavItems(items: readonly { label: string; href: string; icon: string }[]): NavItemData[] {
  return items.map((i) => ({ label: i.label, href: i.href, icon: i.icon, section: "primary" }));
}

export function Header({ navItems }: { navItems?: NavItemData[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const primaryItems = navItems
    ? navItems.filter((i) => i.section === "primary")
    : toNavItems(NAV_ITEMS.primary);
  const moreItems = navItems
    ? navItems.filter((i) => i.section === "more")
    : toNavItems(NAV_ITEMS.more);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-military-navy text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/937Logo.png"
            alt="937 TG"
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
          />
          <div className="hidden sm:block">
            <div className="text-sm font-bold leading-tight">
              {SITE_CONFIG.name}
            </div>
            <div className="text-xs text-gray-300">
              {SITE_CONFIG.branch}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {primaryItems.slice(0, 7).map((item) => {
            const Icon = item.icon ? iconMap[item.icon] : null;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-military-blue hover:text-white transition-colors"
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span className="hidden xl:inline">{item.label}</span>
              </Link>
            );
          })}

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-military-blue hover:text-white transition-colors"
            >
              <Menu className="h-4 w-4" />
              <span className="hidden xl:inline">More</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {moreOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMoreOpen(false)}
                />
                <div className="absolute right-0 top-full z-50 mt-1 w-64 rounded-lg border bg-white text-foreground shadow-lg">
                  <div className="p-2">
                    {[...primaryItems.slice(7), ...moreItems].map(
                      (item) => {
                        const Icon = item.icon ? iconMap[item.icon] : null;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMoreOpen(false)}
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                          >
                            {Icon && (
                              <Icon className="h-4 w-4 text-military-blue" />
                            )}
                            {item.label}
                          </Link>
                        );
                      }
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-military-blue">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-military-navy text-white border-military-blue p-0">
            <SheetHeader className="p-6 pb-4">
              <SheetTitle className="text-white flex items-center gap-3">
                <Image
                  src="/images/937Logo.png"
                  alt="937 TG"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <div>
                  <div className="text-sm font-bold">{SITE_CONFIG.shortName}</div>
                  <div className="text-xs text-gray-300 font-normal">
                    {SITE_CONFIG.branch}
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-100px)]">
              <div className="px-4 pb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 px-3">
                  Main Menu
                </div>
                {primaryItems.map((item) => {
                  const Icon = item.icon ? iconMap[item.icon] : null;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-200 hover:bg-military-blue hover:text-white transition-colors"
                    >
                      {Icon && <Icon className="h-4 w-4 text-military-gold" />}
                      {item.label}
                    </Link>
                  );
                })}

                {moreItems.length > 0 && (
                  <>
                    <Separator className="my-4 bg-military-blue" />
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 px-3">
                      More Resources
                    </div>
                    {moreItems.map((item) => {
                      const Icon = item.icon ? iconMap[item.icon] : null;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-200 hover:bg-military-blue hover:text-white transition-colors"
                        >
                          {Icon && <Icon className="h-4 w-4 text-military-gold" />}
                          {item.label}
                        </Link>
                      );
                    })}
                  </>
                )}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
