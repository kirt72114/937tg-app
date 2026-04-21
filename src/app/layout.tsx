import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/header";
import type { NavItemData } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SITE_CONFIG } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { getAllSettings } from "@/lib/actions/settings";
import "./globals.css";

// The root layout queries nav items and settings from the DB on every render.
// Prerendering every descendant route at build time would open that many
// concurrent connections to Supabase's session pooler (pool_size: 15) and
// crash the build with EMAXCONNSESSION. Render on-demand instead.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getAllSettings();
  const name = settings.siteName || SITE_CONFIG.name;
  const shortName = settings.shortName || SITE_CONFIG.shortName;
  return {
    title: {
      default: name,
      template: `%s | ${shortName}`,
    },
    description: settings.siteDescription || SITE_CONFIG.description,
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: shortName,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

async function getNavItems(): Promise<NavItemData[] | undefined> {
  try {
    const items = await prisma.navigationItem.findMany({
      where: { isVisible: true },
      orderBy: [{ section: "asc" }, { sortOrder: "asc" }],
      select: { label: true, href: true, icon: true, section: true },
    });
    if (items.length === 0) return undefined;
    return items;
  } catch {
    return undefined;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navItems, settings] = await Promise.all([
    getNavItems(),
    getAllSettings(),
  ]);

  const primary = settings.primaryColor || "#1a3a6b";
  const accent = settings.accentColor || "#c5a04e";
  const navy = settings.navyColor || "#0f2444";
  const light = settings.lightColor || "#f0f4f8";
  const themeOverride = `:root{--color-military-blue:${primary};--color-military-gold:${accent};--color-military-navy:${navy};--color-military-light:${light};--primary:${primary};--accent:${accent};--background:${light};--ring:${primary};--sidebar:${navy};--sidebar-primary:${accent};--sidebar-accent:${primary};--sidebar-ring:${accent};}`;

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content={navy} />
        <style dangerouslySetInnerHTML={{ __html: themeOverride }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header navItems={navItems} settings={settings} />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer settings={settings} />
        <MobileNav />
      </body>
    </html>
  );
}
