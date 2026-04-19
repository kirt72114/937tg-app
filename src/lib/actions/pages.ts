"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { PageType } from "@prisma/client";
import type { PageBlock } from "@/lib/content-blocks";
import { toBlocksContent } from "@/lib/content-blocks";

export async function getPublishedPages() {
  return prisma.page.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getAllPages() {
  return prisma.page.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { creator: { select: { name: true } } },
  });
}

export async function getPageBySlug(slug: string) {
  return prisma.page.findUnique({ where: { slug } });
}

export async function getPageById(id: string) {
  return prisma.page.findUnique({ where: { id } });
}

type PageInput = {
  title: string;
  slug: string;
  blocks?: PageBlock[];
  metaDescription?: string;
  pageType?: PageType;
  externalUrl?: string;
  isPublished?: boolean;
  createdBy?: string;
};

export async function createPage(data: PageInput) {
  const maxOrder = await prisma.page.aggregate({ _max: { sortOrder: true } });
  const { blocks, ...rest } = data;
  const page = await prisma.page.create({
    data: {
      ...rest,
      content: blocks ? toBlocksContent(blocks) : undefined,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });
  revalidatePath("/admin/pages");
  revalidatePath(`/${page.slug}`);
  return page;
}

export async function updatePage(
  id: string,
  data: {
    title?: string;
    slug?: string;
    blocks?: PageBlock[];
    metaDescription?: string;
    pageType?: PageType;
    externalUrl?: string;
    isPublished?: boolean;
  }
) {
  const { blocks, ...rest } = data;
  const page = await prisma.page.update({
    where: { id },
    data: {
      ...rest,
      content: blocks !== undefined ? toBlocksContent(blocks) : undefined,
    },
  });
  revalidatePath("/admin/pages");
  revalidatePath(`/admin/pages/${id}`);
  revalidatePath(`/${page.slug}`);
  return page;
}

export async function deletePage(id: string) {
  const page = await prisma.page.delete({ where: { id } });
  revalidatePath("/admin/pages");
  revalidatePath(`/${page.slug}`);
}
