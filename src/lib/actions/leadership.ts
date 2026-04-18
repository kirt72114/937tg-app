"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { ProfileType } from "@prisma/client";

export async function getLeadershipProfiles() {
  return prisma.leadershipProfile.findMany({
    where: { isActive: true, profileType: "leadership" },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getMtlProfiles() {
  return prisma.leadershipProfile.findMany({
    where: { isActive: true, profileType: "mtl" },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getAllProfiles(type?: ProfileType) {
  return prisma.leadershipProfile.findMany({
    where: type ? { profileType: type } : undefined,
    orderBy: { sortOrder: "asc" },
  });
}

export async function createProfile(data: {
  name: string;
  rank: string;
  title: string;
  unit?: string;
  bio?: string;
  photoUrl?: string;
  profileType: ProfileType;
}) {
  const maxOrder = await prisma.leadershipProfile.aggregate({
    _max: { sortOrder: true },
  });
  const profile = await prisma.leadershipProfile.create({
    data: {
      ...data,
      bio: data.bio ? { html: data.bio } : undefined,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });
  revalidatePath("/admin/leadership");
  revalidatePath("/admin/mtls");
  revalidatePath("/leadership");
  revalidatePath("/mtls");
  return profile;
}

export async function updateProfile(
  id: string,
  data: {
    name?: string;
    rank?: string;
    title?: string;
    unit?: string;
    bio?: string;
    photoUrl?: string;
    isActive?: boolean;
    sortOrder?: number;
  }
) {
  const profile = await prisma.leadershipProfile.update({
    where: { id },
    data: {
      ...data,
      bio: data.bio !== undefined ? { html: data.bio } : undefined,
    },
  });
  revalidatePath("/admin/leadership");
  revalidatePath("/admin/mtls");
  revalidatePath("/leadership");
  revalidatePath("/mtls");
  return profile;
}

export async function deleteProfile(id: string) {
  await prisma.leadershipProfile.delete({ where: { id } });
  revalidatePath("/admin/leadership");
  revalidatePath("/admin/mtls");
  revalidatePath("/leadership");
  revalidatePath("/mtls");
}

export async function reorderProfile(id: string, direction: "up" | "down") {
  const current = await prisma.leadershipProfile.findUnique({ where: { id } });
  if (!current) return;

  const neighbor = await prisma.leadershipProfile.findFirst({
    where: {
      profileType: current.profileType,
      sortOrder:
        direction === "up"
          ? { lt: current.sortOrder }
          : { gt: current.sortOrder },
    },
    orderBy: { sortOrder: direction === "up" ? "desc" : "asc" },
  });

  if (!neighbor) return;

  await prisma.$transaction([
    prisma.leadershipProfile.update({
      where: { id: current.id },
      data: { sortOrder: neighbor.sortOrder },
    }),
    prisma.leadershipProfile.update({
      where: { id: neighbor.id },
      data: { sortOrder: current.sortOrder },
    }),
  ]);

  revalidatePath("/admin/leadership");
  revalidatePath("/admin/mtls");
  revalidatePath("/leadership");
  revalidatePath("/mtls");
}

const DEFAULT_LEADERS: Array<{
  name: string;
  rank: string;
  title: string;
  unit: string;
  photoUrl: string | null;
  sortOrder: number;
}> = [
  // 937th Training Group
  { name: "Brian Caruthers", rank: "Col", title: "Commander", unit: "937th Training Group", photoUrl: "/images/leadership/col-caruthers-brian.jpg", sortOrder: 1 },
  { name: "Mark Hassett", rank: "Lt Col", title: "Deputy Commander", unit: "937th Training Group", photoUrl: "/images/leadership/ltcol-hassett-mark.jpg", sortOrder: 2 },
  { name: "James Keller", rank: "CMSgt", title: "Senior Enlisted Leader", unit: "937th Training Group", photoUrl: null, sortOrder: 3 },
  // 381st Training Squadron
  { name: "Heather Brooks", rank: "Lt Col", title: "Commander", unit: "381st Training Squadron", photoUrl: "/images/leadership/ltcol-brooks-heather.jpg", sortOrder: 10 },
  { name: "Erica Gunderson", rank: "Capt", title: "Section Commander", unit: "381st Training Squadron", photoUrl: "/images/leadership/capt-gunderson-erica.jpg", sortOrder: 11 },
  { name: "Justin Rhodes", rank: "MSG", title: "Senior Enlisted Leader", unit: "381st Training Squadron", photoUrl: "/images/leadership/msg-rhodes-justin.jpg", sortOrder: 12 },
  { name: "Nathan Bentley", rank: "MSgt", title: "First Sergeant", unit: "381st Training Squadron", photoUrl: "/images/leadership/msgt-bentley-nathan.png", sortOrder: 13 },
  // 382d Training Squadron
  { name: "Christopher Dufford", rank: "Lt Col", title: "Commander", unit: "382d Training Squadron", photoUrl: "/images/leadership/ltcol-dufford-christopher.jpg", sortOrder: 20 },
  { name: "Michael Mask", rank: "Capt", title: "Section Commander", unit: "382d Training Squadron", photoUrl: "/images/leadership/capt-mask-michael.jpg", sortOrder: 21 },
  { name: "Veronica Everest", rank: "CMSgt", title: "Senior Enlisted Leader", unit: "382d Training Squadron", photoUrl: "/images/leadership/cmsgt-everest-veronica.jpg", sortOrder: 22 },
  { name: "Stacey Williamson", rank: "MSgt", title: "First Sergeant", unit: "382d Training Squadron", photoUrl: "/images/leadership/msgt-williamson-stacey.jpg", sortOrder: 23 },
  // 383d Training Squadron
  { name: "Tracy Davis", rank: "Lt Col", title: "Commander", unit: "383d Training Squadron", photoUrl: "/images/leadership/ltcol-davis-tracy.png", sortOrder: 30 },
  { name: "Rubert Laco", rank: "Maj", title: "Section Commander", unit: "383d Training Squadron", photoUrl: "/images/leadership/maj-laco-rubert.jpg", sortOrder: 31 },
  { name: "Fabrizio Lamarca", rank: "CMSgt", title: "Senior Enlisted Leader", unit: "383d Training Squadron", photoUrl: null, sortOrder: 32 },
  { name: "James Kendall", rank: "SMSgt", title: "First Sergeant", unit: "383d Training Squadron", photoUrl: "/images/leadership/smsgt-kendall-james.jpg", sortOrder: 33 },
];

export async function seedDefaultLeadership() {
  const existing = await prisma.leadershipProfile.count({
    where: { profileType: "leadership" },
  });

  // Only insert missing leaders — idempotent.
  let added = 0;
  for (const leader of DEFAULT_LEADERS) {
    const match = await prisma.leadershipProfile.findFirst({
      where: {
        name: leader.name,
        unit: leader.unit,
        profileType: "leadership",
      },
    });
    if (!match) {
      await prisma.leadershipProfile.create({
        data: { ...leader, profileType: "leadership" },
      });
      added++;
    }
  }

  revalidatePath("/admin/leadership");
  revalidatePath("/leadership");

  return { existingBefore: existing, added };
}
