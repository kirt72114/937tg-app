"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllAfscs() {
  return prisma.afsc.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getActiveAfscs() {
  return prisma.afsc.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getAfscById(id: string) {
  return prisma.afsc.findUnique({ where: { id } });
}

export async function createAfsc(data: {
  code: string;
  title: string;
  description?: string;
  duration?: string;
}) {
  const maxOrder = await prisma.afsc.aggregate({ _max: { sortOrder: true } });
  const afsc = await prisma.afsc.create({
    data: {
      code: data.code,
      title: data.title,
      description: data.description,
      duration: data.duration,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });
  revalidatePath("/admin/afscs");
  revalidatePath("/afscs");
  return afsc;
}

export async function updateAfsc(
  id: string,
  data: {
    code?: string;
    title?: string;
    description?: string;
    duration?: string;
    isActive?: boolean;
  }
) {
  const afsc = await prisma.afsc.update({ where: { id }, data });
  revalidatePath("/admin/afscs");
  revalidatePath("/afscs");
  return afsc;
}

export async function deleteAfsc(id: string) {
  await prisma.afsc.delete({ where: { id } });
  revalidatePath("/admin/afscs");
  revalidatePath("/afscs");
}

export async function reorderAfsc(id: string, direction: "up" | "down") {
  const current = await prisma.afsc.findUnique({ where: { id } });
  if (!current) return;

  const sibling = await prisma.afsc.findFirst({
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
    prisma.afsc.update({
      where: { id: current.id },
      data: { sortOrder: sibling.sortOrder },
    }),
    prisma.afsc.update({
      where: { id: sibling.id },
      data: { sortOrder: current.sortOrder },
    }),
  ]);
  revalidatePath("/admin/afscs");
  revalidatePath("/afscs");
}

const DEFAULT_AFSCS = [
  {
    code: "4N0X1",
    title: "Aerospace Medical Technician",
    description:
      "Provides primary and specialty healthcare at military treatment facilities. Performs patient care, emergency treatment, and health management.",
    duration: "72 days",
  },
  {
    code: "4P0X1",
    title: "Pharmacy Technician",
    description:
      "Prepares and dispenses medications, manages pharmacy inventory, and provides pharmaceutical care under supervision.",
    duration: "51 days",
  },
  {
    code: "4T0X1",
    title: "Medical Laboratory Technician",
    description:
      "Performs laboratory procedures, analyzes specimens, and provides diagnostic data for patient treatment decisions.",
    duration: "72 days",
  },
  {
    code: "4R0X1",
    title: "Diagnostic Imaging Technician",
    description:
      "Operates diagnostic imaging equipment to produce radiographic images for medical diagnosis and treatment.",
    duration: "52 days",
  },
  {
    code: "4H0X1",
    title: "Cardiopulmonary Laboratory Technician",
    description:
      "Performs diagnostic testing of the heart and lungs, including EKGs, pulmonary function tests, and cardiac monitoring.",
    duration: "48 days",
  },
  {
    code: "4Y0X1",
    title: "Dental Assistant",
    description:
      "Assists dental officers in treatment procedures, manages dental records, and performs dental radiology.",
    duration: "35 days",
  },
  {
    code: "4A2X1",
    title: "Biomedical Equipment Technician",
    description:
      "Maintains, calibrates, and repairs medical equipment used in military healthcare facilities.",
    duration: "92 days",
  },
  {
    code: "4E0X1",
    title: "Public Health Technician",
    description:
      "Conducts health risk assessments, disease surveillance, and environmental health inspections.",
    duration: "54 days",
  },
];

export async function seedDefaultAfscs() {
  let added = 0;
  for (let i = 0; i < DEFAULT_AFSCS.length; i++) {
    const def = DEFAULT_AFSCS[i];
    const existing = await prisma.afsc.findUnique({
      where: { code: def.code },
    });
    if (!existing) {
      await prisma.afsc.create({
        data: { ...def, sortOrder: i + 1 },
      });
      added++;
    }
  }
  revalidatePath("/admin/afscs");
  revalidatePath("/afscs");
  return { added };
}
