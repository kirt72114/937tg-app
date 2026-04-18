"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { PageType } from "@prisma/client";

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

export async function createPage(data: {
  title: string;
  slug: string;
  content?: string | object;
  metaDescription?: string;
  pageType?: PageType;
  externalUrl?: string;
  isPublished?: boolean;
  createdBy?: string;
}) {
  const maxOrder = await prisma.page.aggregate({ _max: { sortOrder: true } });
  const contentValue =
    typeof data.content === "string"
      ? { html: data.content }
      : data.content ?? undefined;
  const page = await prisma.page.create({
    data: {
      title: data.title,
      slug: data.slug,
      content: contentValue,
      metaDescription: data.metaDescription,
      pageType: data.pageType,
      externalUrl: data.externalUrl,
      isPublished: data.isPublished,
      createdBy: data.createdBy,
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
    content?: string | object;
    metaDescription?: string;
    pageType?: PageType;
    externalUrl?: string;
    isPublished?: boolean;
  }
) {
  const contentValue =
    data.content === undefined
      ? undefined
      : typeof data.content === "string"
        ? { html: data.content }
        : data.content;
  const page = await prisma.page.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      content: contentValue,
      metaDescription: data.metaDescription,
      pageType: data.pageType,
      externalUrl: data.externalUrl,
      isPublished: data.isPublished,
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
