"use server";

import { prisma } from "@/lib/prisma";
import type { RosterFilter } from "@/lib/content-blocks";

export type RosterProfile = {
  id: string;
  name: string;
  rank: string;
  title: string;
  unit: string;
  photoUrl: string | null;
  bio: unknown;
};

export async function getRosterProfiles(
  filter: RosterFilter
): Promise<RosterProfile[]> {
  if (filter.ids && filter.ids.length > 0) {
    const profiles = await prisma.leadershipProfile.findMany({
      where: { id: { in: filter.ids }, isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        rank: true,
        title: true,
        unit: true,
        photoUrl: true,
        bio: true,
      },
    });
    // Preserve the caller-provided order.
    const order = new Map(filter.ids.map((id, i) => [id, i]));
    return [...profiles].sort(
      (a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0)
    );
  }

  return prisma.leadershipProfile.findMany({
    where: {
      isActive: true,
      profileType: filter.profileType,
      unit: filter.unit,
    },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      rank: true,
      title: true,
      unit: true,
      photoUrl: true,
      bio: true,
    },
  });
}

export async function getUnitsWithProfileType(
  profileType: "leadership" | "mtl"
): Promise<Set<string>> {
  const rows = await prisma.leadershipProfile.findMany({
    where: { profileType, isActive: true },
    select: { unit: true },
    distinct: ["unit"],
  });
  return new Set(rows.map((r) => r.unit));
}
