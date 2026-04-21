"use client";

import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Phone,
  ClipboardList,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/shared/nav-link";

const WORK_ORDERS_URL =
  "https://survey123.arcgis.com/share/5a631aa51d5440118b7083fe18c08569";

const mobileNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Leadership", href: "/leadership", icon: Users },
  { label: "Phone", href: "/phone-numbers", icon: Phone },
  { label: "Work Orders", href: WORK_ORDERS_URL, icon: ClipboardList },
  { label: "More", href: "#more", icon: MoreHorizontal },
];

export function MobileNav() {
  const pathname = usePathname();

  // Don't show on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg lg:hidden">
      <div className="flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const isInternal = item.href.startsWith("/");
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : isInternal &&
                item.href !== "#more" &&
                pathname.startsWith(item.href);

          const href = item.href === "#more" ? "/share" : item.href;

          return (
            <NavLink
              key={item.label}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2 text-xs transition-colors",
                isActive
                  ? "text-military-blue font-semibold"
                  : "text-muted-foreground hover:text-military-blue"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-military-blue" : "text-gray-500"
                )}
              />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
