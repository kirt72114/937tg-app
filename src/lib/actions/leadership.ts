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
