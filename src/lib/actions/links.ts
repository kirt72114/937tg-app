"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllCollections() {
  return prisma.linkCollection.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { items: true } } },
  });
}

export async function getCollectionWithItems(id: string) {
  return prisma.linkCollection.findUnique({
    where: { id },
    include: { items: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getCollectionBySlug(slug: string) {
  return prisma.linkCollection.findUnique({
    where: { slug },
    include: { items: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getAllCollectionSlugs() {
  return prisma.linkCollection.findMany({
    orderBy: { sortOrder: "asc" },
    select: { slug: true },
  });
}

export async function createCollection(data: {
  title: string;
  slug: string;
  description?: string;
}) {
  const maxOrder = await prisma.linkCollection.aggregate({
    _max: { sortOrder: true },
  });
  const collection = await prisma.linkCollection.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });
  revalidatePath("/admin/links");
  revalidatePath("/", "layout");
  return collection;
}

export async function updateCollection(
  id: string,
  data: { title?: string; slug?: string; description?: string }
) {
  const collection = await prisma.linkCollection.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/links");
  revalidatePath("/", "layout");
  return collection;
}

export async function deleteCollection(id: string) {
  await prisma.linkCollection.delete({ where: { id } });
  revalidatePath("/admin/links");
  revalidatePath("/", "layout");
}

export async function reorderCollection(id: string, direction: "up" | "down") {
  const current = await prisma.linkCollection.findUnique({ where: { id } });
  if (!current) return;

  const sibling = await prisma.linkCollection.findFirst({
    where: {
      sortOrder: direction === "up"
        ? { lt: current.sortOrder }
        : { gt: current.sortOrder },
    },
    orderBy: { sortOrder: direction === "up" ? "desc" : "asc" },
  });
  if (!sibling) return;

  await prisma.$transaction([
    prisma.linkCollection.update({
      where: { id: current.id },
      data: { sortOrder: sibling.sortOrder },
    }),
    prisma.linkCollection.update({
      where: { id: sibling.id },
      data: { sortOrder: current.sortOrder },
    }),
  ]);
  revalidatePath("/admin/links");
  revalidatePath("/", "layout");
}

// ─── Link Items ───────────────────────────────────────

export async function createLinkItem(data: {
  collectionId: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
}) {
  const maxOrder = await prisma.linkItem.aggregate({
    _max: { sortOrder: true },
    where: { collectionId: data.collectionId },
  });
  const item = await prisma.linkItem.create({
    data: {
      collectionId: data.collectionId,
      title: data.title,
      url: data.url,
      description: data.description,
      icon: data.icon,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });
  revalidatePath("/admin/links");
  revalidatePath("/", "layout");
  return item;
}

export async function updateLinkItem(
  id: string,
  data: { title?: string; url?: string; description?: string; icon?: string }
) {
  const item = await prisma.linkItem.update({ where: { id }, data });
  revalidatePath("/admin/links");
  revalidatePath("/", "layout");
  return item;
}

export async function deleteLinkItem(id: string) {
  await prisma.linkItem.delete({ where: { id } });
  revalidatePath("/admin/links");
  revalidatePath("/", "layout");
}

// ─── Reserved Collections ─────────────────────────────

export const FOOTER_SLUGS = {
  quick: "footer-quick",
  resources: "footer-resources",
} as const;

export const HOME_SLUGS = {
  quick: "home-quick",
  resources: "home-resources",
} as const;

export const RESERVED_SLUGS = new Set<string>([
  FOOTER_SLUGS.quick,
  FOOTER_SLUGS.resources,
  HOME_SLUGS.quick,
  HOME_SLUGS.resources,
]);

const RESERVED_DEFAULTS: {
  slug: string;
  title: string;
  description: string;
  sortOrder: number;
  items: { title: string; url: string; icon?: string }[];
}[] = [
  {
    slug: FOOTER_SLUGS.quick,
    title: "Quick Links",
    description: "Left footer column",
    sortOrder: 100,
    items: [
      { title: "Leadership", url: "/leadership" },
      { title: "Phone Numbers", url: "/phone-numbers" },
      { title: "Work Orders", url: "/work-orders" },
      { title: "Locations", url: "/locations" },
      { title: "In-Processing", url: "/in-processing" },
    ],
  },
  {
    slug: FOOTER_SLUGS.resources,
    title: "Resources",
    description: "Right footer column",
    sortOrder: 101,
    items: [
      { title: "AiT Guide", url: "/ait-guide" },
      { title: "DFAC Hours", url: "/dfac-hours" },
      { title: "Shuttle Route", url: "/shuttle" },
      { title: "Military OneSource", url: "/military-onesource" },
      { title: "JBSA Connect", url: "/jbsa-connect" },
    ],
  },
  {
    slug: HOME_SLUGS.quick,
    title: "Quick Links",
    description: "Homepage tile grid",
    sortOrder: 102,
    items: [
      { title: "In-Processing", url: "/in-processing", icon: "LogIn" },
      { title: "Phone Numbers", url: "/phone-numbers", icon: "Phone" },
      { title: "Leadership", url: "/leadership", icon: "Users" },
      { title: "MTLs", url: "/mtls", icon: "UserCheck" },
      { title: "Locations", url: "/locations", icon: "MapPin" },
      { title: "Work Orders", url: "/work-orders", icon: "ClipboardList" },
      { title: "AiT Guide", url: "/ait-guide", icon: "BookOpen" },
      { title: "METC", url: "/metc", icon: "GraduationCap" },
      { title: "Out-Processing", url: "/out-processing", icon: "LogOut" },
      { title: "WO Status", url: "/work-orders/status", icon: "Search" },
      { title: "Spartan/CQ", url: "/spartan-flight", icon: "Shield" },
      { title: "Leadership Programs", url: "/leadership-programs", icon: "Award" },
    ],
  },
  {
    slug: HOME_SLUGS.resources,
    title: "Resources",
    description: "Homepage resources strip",
    sortOrder: 103,
    items: [
      { title: "DFAC Hours", url: "/dfac-hours", icon: "UtensilsCrossed" },
      { title: "Shuttle Route", url: "/shuttle", icon: "Bus" },
      { title: "Leadership Programs", url: "/leadership-programs", icon: "Award" },
    ],
  },
];

export async function seedReservedCollections() {
  let collectionsAdded = 0;
  let itemsAdded = 0;
  for (const def of RESERVED_DEFAULTS) {
    let collection = await prisma.linkCollection.findUnique({
      where: { slug: def.slug },
    });
    if (!collection) {
      collection = await prisma.linkCollection.create({
        data: {
          slug: def.slug,
          title: def.title,
          description: def.description,
          sortOrder: def.sortOrder,
        },
      });
      collectionsAdded++;
      for (let i = 0; i < def.items.length; i++) {
        const item = def.items[i];
        await prisma.linkItem.create({
          data: {
            collectionId: collection.id,
            title: item.title,
            url: item.url,
            icon: item.icon,
            sortOrder: i + 1,
          },
        });
        itemsAdded++;
      }
    }
  }
  revalidatePath("/admin/links");
  revalidatePath("/", "layout");
  return { collectionsAdded, itemsAdded };
}

/** @deprecated use seedReservedCollections */
export const seedFooterCollections = seedReservedCollections;

export async function reorderLinkItem(id: string, direction: "up" | "down") {
  const current = await prisma.linkItem.findUnique({ where: { id } });
  if (!current) return;

  const sibling = await prisma.linkItem.findFirst({
    where: {
      collectionId: current.collectionId,
      sortOrder: direction === "up"
        ? { lt: current.sortOrder }
        : { gt: current.sortOrder },
    },
    orderBy: { sortOrder: direction === "up" ? "desc" : "asc" },
  });
  if (!sibling) return;

  await prisma.$transaction([
    prisma.linkItem.update({
      where: { id: current.id },
      data: { sortOrder: sibling.sortOrder },
    }),
    prisma.linkItem.update({
      where: { id: sibling.id },
      data: { sortOrder: current.sortOrder },
    }),
  ]);
  revalidatePath("/admin/links");
  revalidatePath("/", "layout");
}
