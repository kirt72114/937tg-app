"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllSquadrons() {
  return prisma.squadron.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getSquadronById(id: string) {
  return prisma.squadron.findUnique({ where: { id } });
}

export async function createSquadron(data: {
  unit: string;
  motto?: string;
  mission?: string;
  vision?: string;
  afscs?: string[];
  logoUrl?: string;
}) {
  const maxOrder = await prisma.squadron.aggregate({ _max: { sortOrder: true } });
  const squadron = await prisma.squadron.create({
    data: {
      unit: data.unit,
      motto: data.motto,
      mission: data.mission,
      vision: data.vision,
      afscs: data.afscs ?? [],
      logoUrl: data.logoUrl,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });
  revalidatePath("/admin/squadrons");
  revalidatePath("/leadership");
  return squadron;
}

export async function updateSquadron(
  id: string,
  data: {
    unit?: string;
    motto?: string;
    mission?: string;
    vision?: string;
    afscs?: string[];
    logoUrl?: string;
  }
) {
  const squadron = await prisma.squadron.update({
    where: { id },
    data: {
      ...data,
      afscs: data.afscs ?? undefined,
    },
  });
  revalidatePath("/admin/squadrons");
  revalidatePath("/leadership");
  return squadron;
}

export async function deleteSquadron(id: string) {
  await prisma.squadron.delete({ where: { id } });
  revalidatePath("/admin/squadrons");
  revalidatePath("/leadership");
}

export async function reorderSquadron(id: string, direction: "up" | "down") {
  const current = await prisma.squadron.findUnique({ where: { id } });
  if (!current) return;

  const sibling = await prisma.squadron.findFirst({
    where: {
      sortOrder:
        direction === "up"
          ? { lt: current.sortOrder }
          : { gt: current.sortOrder },
    },
    orderBy: { sortOrder: direction === "up" ? "desc" : "asc" },
  });
  if (!sibling) return;

  await prisma.$transaction([
    prisma.squadron.update({
      where: { id: current.id },
      data: { sortOrder: sibling.sortOrder },
    }),
    prisma.squadron.update({
      where: { id: sibling.id },
      data: { sortOrder: current.sortOrder },
    }),
  ]);
  revalidatePath("/admin/squadrons");
  revalidatePath("/leadership");
}

const DEFAULT_SQUADRONS = [
  {
    unit: "381st Training Squadron",
    motto: "Forge to Excellence and Commitment",
    mission: "To train and empower mission-essential medics.",
    vision:
      "An inclusive team, developing one medic at a time for the future fight.",
    afscs: ["4Y0X1 - Dental Assistant", "4Y0X2 - Dental Laboratory"],
    sortOrder: 1,
  },
  {
    unit: "382d Training Squadron",
    motto: "Train Today's Medics for Tomorrow's Fight",
    mission:
      "Educate, develop, and inspire one enlisted medic at a time \u2014 ready to fight.",
    vision: "To be the premier training pipeline for joint medical forces.",
    afscs: [
      "4A0X1 - Health Services Management",
      "4A2X1 - Biomedical Equipment",
      "4N0X2 - Physical Medicine",
      "4P0X1 - Pharmacy",
      "4H0X1 - Diagnostic Imaging",
      "6A0X2 - Medical Materiel",
      "4D0X1 - Diet Therapy",
    ],
    sortOrder: 2,
  },
  {
    unit: "383d Training Squadron",
    motto: "METC's Finest, Mission Focused",
    mission: "Develop Warrior Medics.",
    vision: "Train. Inform. Transform.",
    afscs: [
      "4C0X1 - Mental Health Service",
      "4H0X1 - Cardiopulmonary Laboratory",
      "4N0X1 - Aerospace Medical Service",
      "4Y0X1 - Surgical Service",
    ],
    sortOrder: 3,
  },
  {
    unit: "937th Training Support Squadron",
    motto: "Leading the Best",
    mission:
      "Outfitting Warrior Medics to enable initial & adaptive expeditionary training",
    vision: "Our Support readies medics for Great Power Competition",
    afscs: [],
    sortOrder: 4,
  },
];

export async function seedDefaultSquadrons() {
  let added = 0;
  for (const def of DEFAULT_SQUADRONS) {
    const existing = await prisma.squadron.findUnique({
      where: { unit: def.unit },
    });
    if (!existing) {
      await prisma.squadron.create({ data: def });
      added++;
    }
  }
  revalidatePath("/admin/squadrons");
  revalidatePath("/leadership");
  return { added };
}
