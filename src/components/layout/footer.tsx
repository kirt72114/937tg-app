import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer({ settings }: { settings?: Record<string, string> }) {
  const siteName = settings?.siteName || SITE_CONFIG.name;
  const mission = settings?.mission || SITE_CONFIG.mission;
  const branch = settings?.branch || SITE_CONFIG.branch;
  const location = settings?.location || SITE_CONFIG.location;
  const footerText = settings?.footerText;

  return (
    <footer className="border-t bg-military-navy text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-military-gold font-bold text-military-navy text-lg">
                937
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  {siteName}
                </div>
                <div className="text-xs text-gray-400">
                  {location}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {mission}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Leadership", href: "/leadership" },
                { label: "Phone Numbers", href: "/phone-numbers" },
                { label: "Work Orders", href: "/work-orders" },
                { label: "Locations", href: "/locations" },
                { label: "In-Processing", href: "/in-processing" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-400 hover:text-military-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                { label: "AiT Guide", href: "/ait-guide" },
                { label: "DFAC Hours", href: "/dfac-hours" },
                { label: "Shuttle Route", href: "/shuttle" },
                { label: "Military OneSource", href: "/military-onesource" },
                { label: "JBSA Connect", href: "/jbsa-connect" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-400 hover:text-military-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-military-blue pt-4 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {footerText || `${branch} \u2022 ${location}`}
          </p>
        </div>
      </div>
    </footer>
  );
}
