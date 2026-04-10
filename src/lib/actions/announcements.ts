"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { AnnouncementPriority } from "@prisma/client";

export async function getActiveAnnouncements() {
  return prisma.announcement.findMany({
    where: {
      publishDate: { lte: new Date() },
      OR: [{ expireDate: null }, { expireDate: { gte: new Date() } }],
    },
    orderBy: [{ isPinned: "desc" }, { publishDate: "desc" }],
  });
}

export async function getAllAnnouncements() {
  return prisma.announcement.findMany({
    orderBy: [{ isPinned: "desc" }, { publishDate: "desc" }],
  });
}

export async function createAnnouncement(data: {
  title: string;
  content?: string;
  priority?: AnnouncementPriority;
  isPinned?: boolean;
  expireDate?: Date;
  createdBy?: string;
}) {
  const announcement = await prisma.announcement.create({
    data: {
      title: data.title,
      content: data.content ? { html: data.content } : undefined,
      priority: data.priority ?? "normal",
      isPinned: data.isPinned ?? false,
      expireDate: data.expireDate,
      createdBy: data.createdBy,
    },
  });
  revalidatePath("/admin/announcements");
  revalidatePath("/");
  return announcement;
}

export async function updateAnnouncement(
  id: string,
  data: {
    title?: string;
    content?: string;
    priority?: AnnouncementPriority;
    isPinned?: boolean;
    expireDate?: Date | null;
  }
) {
  const announcement = await prisma.announcement.update({
    where: { id },
    data: {
      ...data,
      content: data.content !== undefined ? { html: data.content } : undefined,
    },
  });
  revalidatePath("/admin/announcements");
  revalidatePath("/");
  return announcement;
}

export async function deleteAnnouncement(id: string) {
  await prisma.announcement.delete({ where: { id } });
  revalidatePath("/admin/announcements");
  revalidatePath("/");
}
