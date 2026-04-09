"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Phone,
  ClipboardList,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Leadership", href: "/leadership", icon: Users },
  { label: "Phone", href: "/phone-numbers", icon: Phone },
  { label: "Work Orders", href: "/work-orders", icon: ClipboardList },
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
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) && item.href !== "#more";

          return (
            <Link
              key={item.label}
              href={item.href === "#more" ? "/share" : item.href}
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
            </Link>
          );
        })}
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
