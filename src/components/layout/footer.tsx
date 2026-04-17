import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { getCollectionBySlug, FOOTER_SLUGS } from "@/lib/actions/links";

const QUICK_LINKS_FALLBACK = {
  title: "Quick Links",
  items: [
    { id: "f1", title: "Leadership", url: "/leadership" },
    { id: "f2", title: "Phone Numbers", url: "/phone-numbers" },
    { id: "f3", title: "Work Orders", url: "/work-orders" },
    { id: "f4", title: "Locations", url: "/locations" },
    { id: "f5", title: "In-Processing", url: "/in-processing" },
  ],
};

const RESOURCES_FALLBACK = {
  title: "Resources",
  items: [
    { id: "r1", title: "AiT Guide", url: "/ait-guide" },
    { id: "r2", title: "DFAC Hours", url: "/dfac-hours" },
    { id: "r3", title: "Shuttle Route", url: "/shuttle" },
    { id: "r4", title: "Military OneSource", url: "/military-onesource" },
    { id: "r5", title: "JBSA Connect", url: "/jbsa-connect" },
  ],
};

type FooterColumn = {
  title: string;
  items: { id: string; title: string; url: string }[];
};

async function loadColumn(
  slug: string,
  fallback: FooterColumn
): Promise<FooterColumn> {
  try {
    const c = await getCollectionBySlug(slug);
    if (!c || c.items.length === 0) return fallback;
    return {
      title: c.title,
      items: c.items.map((i) => ({ id: i.id, title: i.title, url: i.url })),
    };
  } catch {
    return fallback;
  }
}

function FooterLink({ url, title }: { url: string; title: string }) {
  const className =
    "text-xs text-gray-400 hover:text-military-gold transition-colors";
  if (url.startsWith("/")) {
    return (
      <Link href={url} className={className}>
        {title}
      </Link>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {title}
    </a>
  );
}

export async function Footer({
  settings,
}: {
  settings?: Record<string, string>;
}) {
  const siteName = settings?.siteName || SITE_CONFIG.name;
  const mission = settings?.mission || SITE_CONFIG.mission;
  const branch = settings?.branch || SITE_CONFIG.branch;
  const location = settings?.location || SITE_CONFIG.location;
  const footerText = settings?.footerText;

  const [quickLinks, resources] = await Promise.all([
    loadColumn(FOOTER_SLUGS.quick, QUICK_LINKS_FALLBACK),
    loadColumn(FOOTER_SLUGS.resources, RESOURCES_FALLBACK),
  ]);

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

          {[quickLinks, resources].map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white mb-3">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item.id}>
                    <FooterLink url={item.url} title={item.title} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
