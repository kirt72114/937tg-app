import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/header";
import type { NavItemData } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SITE_CONFIG } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_CONFIG.shortName,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f2444",
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
  const navItems = await getNavItems();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <Header navItems={navItems} />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
