"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLocations() {
  return prisma.location.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createLocation(data: {
  name: string;
  address: string;
  category: string;
  mapUrl?: string;
  latitude?: number;
  longitude?: number;
}) {
  const maxOrder = await prisma.location.aggregate({ _max: { sortOrder: true } });
  const location = await prisma.location.create({
    data: { ...data, sortOrder: (maxOrder._max.sortOrder ?? 0) + 1 },
  });
  revalidatePath("/admin/locations");
  revalidatePath("/locations");
  return location;
}

export async function updateLocation(
  id: string,
  data: {
    name?: string;
    address?: string;
    category?: string;
    mapUrl?: string;
    latitude?: number;
    longitude?: number;
    sortOrder?: number;
  }
) {
  const location = await prisma.location.update({ where: { id }, data });
  revalidatePath("/admin/locations");
  revalidatePath("/locations");
  return location;
}

export async function deleteLocation(id: string) {
  await prisma.location.delete({ where: { id } });
  revalidatePath("/admin/locations");
  revalidatePath("/locations");
}

export async function reorderLocation(id: string, direction: "up" | "down") {
  const current = await prisma.location.findUnique({ where: { id } });
  if (!current) return;

  const neighbor = await prisma.location.findFirst({
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
    prisma.location.update({
      where: { id: current.id },
      data: { sortOrder: neighbor.sortOrder },
    }),
    prisma.location.update({
      where: { id: neighbor.id },
      data: { sortOrder: current.sortOrder },
    }),
  ]);

  revalidatePath("/admin/locations");
  revalidatePath("/locations");
}
