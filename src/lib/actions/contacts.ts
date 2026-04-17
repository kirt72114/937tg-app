"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getContacts() {
  return prisma.contact.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getAllContacts() {
  return prisma.contact.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createContact(data: {
  name: string;
  phone: string;
  category: string;
  description?: string;
}) {
  const maxOrder = await prisma.contact.aggregate({ _max: { sortOrder: true } });
  const contact = await prisma.contact.create({
    data: { ...data, sortOrder: (maxOrder._max.sortOrder ?? 0) + 1 },
  });
  revalidatePath("/admin/contacts");
  revalidatePath("/phone-numbers");
  return contact;
}

export async function updateContact(
  id: string,
  data: {
    name?: string;
    phone?: string;
    category?: string;
    description?: string;
    isActive?: boolean;
    sortOrder?: number;
  }
) {
  const contact = await prisma.contact.update({ where: { id }, data });
  revalidatePath("/admin/contacts");
  revalidatePath("/phone-numbers");
  return contact;
}

export async function deleteContact(id: string) {
  await prisma.contact.delete({ where: { id } });
  revalidatePath("/admin/contacts");
  revalidatePath("/phone-numbers");
}

export async function reorderContact(id: string, direction: "up" | "down") {
  const current = await prisma.contact.findUnique({ where: { id } });
  if (!current) return;

  const neighbor = await prisma.contact.findFirst({
    where: {
      sortOrder:
        direction === "up"
          ? { lt: current.sortOrder }
          : { gt: current.sortOrder },
    },
    orderBy: { sortOrder: direction === "up" ? "desc" : "asc" },
  });

  if (!neighbor) return;

  await prisma.$transaction([
    prisma.contact.update({
      where: { id: current.id },
      data: { sortOrder: neighbor.sortOrder },
    }),
    prisma.contact.update({
      where: { id: neighbor.id },
      data: { sortOrder: current.sortOrder },
    }),
  ]);

  revalidatePath("/admin/contacts");
  revalidatePath("/phone-numbers");
}
