"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  Users,
  UserCheck,
  Phone,
  MapPin,
  ClipboardList,
  Calendar,
  Link as LinkIcon,
  Menu,
  FolderOpen,
  UserCog,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FileText,
  Megaphone,
  Users,
  UserCheck,
  Phone,
  MapPin,
  ClipboardList,
  Calendar,
  Link: LinkIcon,
  Menu,
  FolderOpen,
  UserCog,
  Settings,
};

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Pages", href: "/admin/pages", icon: "FileText" },
  { label: "Announcements", href: "/admin/announcements", icon: "Megaphone" },
  { label: "Leadership", href: "/admin/leadership", icon: "Users" },
  { label: "MTLs", href: "/admin/mtls", icon: "UserCheck" },
  { label: "Phone Directory", href: "/admin/contacts", icon: "Phone" },
  { label: "Locations", href: "/admin/locations", icon: "MapPin" },
  { label: "Work Orders", href: "/admin/work-orders", icon: "ClipboardList" },
  { label: "Schedules", href: "/admin/schedules", icon: "Calendar" },
  { label: "Links", href: "/admin/links", icon: "Link" },
  { label: "Navigation", href: "/admin/navigation", icon: "Menu" },
  { label: "Files", href: "/admin/files", icon: "FolderOpen" },
  { label: "Users", href: "/admin/users", icon: "UserCog" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Don't wrap login page with admin layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold">
                937
              </div>
              <span className="text-sm font-semibold">Admin Panel</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {adminNavItems.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-2 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
            title={collapsed ? "Back to Site" : undefined}
          >
            <ChevronLeft className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Back to Site</span>}
          </Link>
          <button
            onClick={async () => {
              const { createClient } = await import("@/lib/supabase/client");
              const supabase = createClient();
              await supabase.auth.signOut();
              window.location.href = "/admin/login";
            }}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
            title={collapsed ? "Sign Out" : undefined}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar for mobile */}
        <div className="flex h-14 items-center gap-4 border-b bg-card px-4 md:hidden">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-military-gold text-military-navy text-[10px] font-bold">
              937
            </div>
            <span className="text-sm font-semibold">Admin</span>
          </Link>
        </div>

        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
