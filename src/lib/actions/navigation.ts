"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { NavSection } from "@prisma/client";

export async function getAllNavItems() {
  return prisma.navigationItem.findMany({
    orderBy: [{ section: "asc" }, { sortOrder: "asc" }],
  });
}

export async function getVisibleNavItems() {
  return prisma.navigationItem.findMany({
    where: { isVisible: true },
    orderBy: [{ section: "asc" }, { sortOrder: "asc" }],
    select: { id: true, label: true, href: true, icon: true, section: true, sortOrder: true },
  });
}

export async function createNavItem(data: {
  label: string;
  href: string;
  icon?: string;
  section?: NavSection;
  isVisible?: boolean;
}) {
  const maxOrder = await prisma.navigationItem.aggregate({
    _max: { sortOrder: true },
    where: { section: data.section ?? "primary" },
  });

  const item = await prisma.navigationItem.create({
    data: {
      label: data.label,
      href: data.href,
      icon: data.icon,
      section: data.section ?? "primary",
      isVisible: data.isVisible ?? true,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });
  revalidatePath("/admin/navigation");
  revalidatePath("/");
  return item;
}

export async function updateNavItem(
  id: string,
  data: {
    label?: string;
    href?: string;
    icon?: string;
    section?: NavSection;
    isVisible?: boolean;
  }
) {
  const item = await prisma.navigationItem.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/navigation");
  revalidatePath("/");
  return item;
}

export async function deleteNavItem(id: string) {
  await prisma.navigationItem.delete({ where: { id } });
  revalidatePath("/admin/navigation");
  revalidatePath("/");
}

export async function reorderNavItem(id: string, direction: "up" | "down") {
  const current = await prisma.navigationItem.findUnique({ where: { id } });
  if (!current) return;

  const sibling = await prisma.navigationItem.findFirst({
    where: {
      section: current.section,
      sortOrder: direction === "up"
        ? { lt: current.sortOrder }
        : { gt: current.sortOrder },
    },
    orderBy: { sortOrder: direction === "up" ? "desc" : "asc" },
  });

  if (!sibling) return;

  await prisma.$transaction([
    prisma.navigationItem.update({
      where: { id: current.id },
      data: { sortOrder: sibling.sortOrder },
    }),
    prisma.navigationItem.update({
      where: { id: sibling.id },
      data: { sortOrder: current.sortOrder },
    }),
  ]);

  revalidatePath("/admin/navigation");
  revalidatePath("/");
}

export async function toggleNavVisibility(id: string) {
  const item = await prisma.navigationItem.findUnique({ where: { id } });
  if (!item) return;

  await prisma.navigationItem.update({
    where: { id },
    data: { isVisible: !item.isVisible },
  });
  revalidatePath("/admin/navigation");
  revalidatePath("/");
}

const DEFAULT_NAV_ITEMS: { label: string; href: string; icon: string; section: NavSection; sortOrder: number }[] = [
  { label: "Home", href: "/", icon: "Home", section: "primary", sortOrder: 1 },
  { label: "Meet Your Leadership", href: "/leadership", icon: "Users", section: "primary", sortOrder: 2 },
  { label: "Meet Your MTLs", href: "/mtls", icon: "UserCheck", section: "primary", sortOrder: 3 },
  { label: "METC", href: "/metc", icon: "GraduationCap", section: "primary", sortOrder: 4 },
  { label: "Important Phone Numbers", href: "/phone-numbers", icon: "Phone", section: "primary", sortOrder: 5 },
  { label: "AiT Guide", href: "/ait-guide", icon: "BookOpen", section: "primary", sortOrder: 6 },
  { label: "ADC", href: "/adc", icon: "Scale", section: "primary", sortOrder: 7 },
  { label: "Military OneSource", href: "/military-onesource", icon: "Globe", section: "primary", sortOrder: 8 },
  { label: "Finance", href: "/finance", icon: "DollarSign", section: "primary", sortOrder: 9 },
  { label: "In-Processing", href: "/in-processing", icon: "LogIn", section: "primary", sortOrder: 10 },
  { label: "Out-Processing", href: "/out-processing", icon: "LogOut", section: "primary", sortOrder: 11 },
  { label: "Locations", href: "/locations", icon: "MapPin", section: "primary", sortOrder: 12 },
  { label: "Work Orders", href: "/work-orders", icon: "ClipboardList", section: "primary", sortOrder: 13 },
  { label: "Work Order Status", href: "/work-orders/status", icon: "Search", section: "more", sortOrder: 1 },
  { label: "DFAC Hours", href: "/dfac-hours", icon: "UtensilsCrossed", section: "more", sortOrder: 2 },
  { label: "Shuttle Route", href: "/shuttle", icon: "Bus", section: "more", sortOrder: 3 },
  { label: "Route of March", href: "/route-of-march", icon: "Route", section: "more", sortOrder: 4 },
  { label: "AFSCs", href: "/afscs", icon: "BadgeInfo", section: "more", sortOrder: 5 },
  { label: "EFMP", href: "/efmp", icon: "HeartHandshake", section: "more", sortOrder: 6 },
  { label: "Airman Leadership Programs", href: "/leadership-programs", icon: "Award", section: "more", sortOrder: 7 },
  { label: "Spartan Flight/CQ", href: "/spartan-flight", icon: "Shield", section: "more", sortOrder: 8 },
  { label: "SAFEREP", href: "/saferep", icon: "ShieldAlert", section: "more", sortOrder: 9 },
  { label: "JBSA Connect", href: "/jbsa-connect", icon: "Link", section: "more", sortOrder: 10 },
  { label: "Share App", href: "/share", icon: "Share2", section: "more", sortOrder: 11 },
];

export async function seedDefaultNavigation() {
  let added = 0;
  for (const item of DEFAULT_NAV_ITEMS) {
    const existing = await prisma.navigationItem.findFirst({
      where: { href: item.href },
    });
    if (!existing) {
      await prisma.navigationItem.create({ data: item });
      added++;
    }
  }
  revalidatePath("/admin/navigation");
  revalidatePath("/");
  return { added };
}
