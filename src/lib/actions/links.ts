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
  return collection;
}

export async function deleteCollection(id: string) {
  await prisma.linkCollection.delete({ where: { id } });
  revalidatePath("/admin/links");
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
  return item;
}

export async function updateLinkItem(
  id: string,
  data: { title?: string; url?: string; description?: string; icon?: string }
) {
  const item = await prisma.linkItem.update({ where: { id }, data });
  revalidatePath("/admin/links");
  return item;
}

export async function deleteLinkItem(id: string) {
  await prisma.linkItem.delete({ where: { id } });
  revalidatePath("/admin/links");
}

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
}
