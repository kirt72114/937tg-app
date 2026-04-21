"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { RopeColor, Prisma } from "@prisma/client";

export type RopeRequirements = {
  requirements: string[];
  responsibilities: string[];
};

export type RopeDescription = {
  text: string;
};

export async function getAllRopePrograms() {
  return prisma.ropeProgram.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getRopeProgramById(id: string) {
  return prisma.ropeProgram.findUnique({ where: { id } });
}

export async function createRopeProgram(data: {
  ropeColor: RopeColor;
  title: string;
  descriptionText: string;
  requirements: string[];
  responsibilities: string[];
}) {
  const maxOrder = await prisma.ropeProgram.aggregate({
    _max: { sortOrder: true },
  });
  const program = await prisma.ropeProgram.create({
    data: {
      ropeColor: data.ropeColor,
      title: data.title,
      description: { text: data.descriptionText } as Prisma.InputJsonValue,
      requirements: {
        requirements: data.requirements,
        responsibilities: data.responsibilities,
      } as Prisma.InputJsonValue,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });
  revalidatePath("/admin/rope-programs");
  revalidatePath("/leadership-programs");
  return program;
}

export async function updateRopeProgram(
  id: string,
  data: {
    ropeColor?: RopeColor;
    title?: string;
    descriptionText?: string;
    requirements?: string[];
    responsibilities?: string[];
  }
) {
  const current = await prisma.ropeProgram.findUnique({ where: { id } });
  if (!current) throw new Error("Program not found");

  const currentReq = (current.requirements as {
    requirements?: string[];
    responsibilities?: string[];
  } | null) ?? { requirements: [], responsibilities: [] };

  const program = await prisma.ropeProgram.update({
    where: { id },
    data: {
      ropeColor: data.ropeColor,
      title: data.title,
      ...(data.descriptionText !== undefined
        ? {
            description: {
              text: data.descriptionText,
            } as Prisma.InputJsonValue,
          }
        : {}),
      ...(data.requirements !== undefined ||
      data.responsibilities !== undefined
        ? {
            requirements: {
              requirements:
                data.requirements ?? currentReq.requirements ?? [],
              responsibilities:
                data.responsibilities ?? currentReq.responsibilities ?? [],
            } as Prisma.InputJsonValue,
          }
        : {}),
    },
  });
  revalidatePath("/admin/rope-programs");
  revalidatePath("/leadership-programs");
  return program;
}

export async function deleteRopeProgram(id: string) {
  await prisma.ropeProgram.delete({ where: { id } });
  revalidatePath("/admin/rope-programs");
  revalidatePath("/leadership-programs");
}

export async function reorderRopeProgram(id: string, direction: "up" | "down") {
  const current = await prisma.ropeProgram.findUnique({ where: { id } });
  if (!current) return;

  const sibling = await prisma.ropeProgram.findFirst({
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
    prisma.ropeProgram.update({
      where: { id: current.id },
      data: { sortOrder: sibling.sortOrder },
    }),
    prisma.ropeProgram.update({
      where: { id: sibling.id },
      data: { sortOrder: current.sortOrder },
    }),
  ]);
  revalidatePath("/admin/rope-programs");
  revalidatePath("/leadership-programs");
}

const DEFAULT_PROGRAMS: Array<{
  ropeColor: RopeColor;
  title: string;
  descriptionText: string;
  requirements: string[];
  responsibilities: string[];
  sortOrder: number;
}> = [
  {
    ropeColor: "green",
    title: "Green Rope - Peer Leader",
    descriptionText:
      "The Green Rope is the entry-level student leadership position. Green Ropes serve as peer mentors and assist fellow Airmen in Training with adjusting to military life and technical training.",
    requirements: [
      "Minimum 2 weeks in training",
      "No active UIF or disciplinary actions",
      "Maintain 80% or higher academic average",
      "Pass most recent fitness assessment",
      "Letter of recommendation from MTL",
    ],
    responsibilities: [
      "Mentor newly arrived Airmen in Training",
      "Assist with dormitory accountability formations",
      "Serve as a positive role model for peers",
      "Report concerns or issues to MTLs",
      "Help maintain dormitory standards",
    ],
    sortOrder: 1,
  },
  {
    ropeColor: "yellow",
    title: "Yellow Rope - Floor Leader",
    descriptionText:
      "The Yellow Rope is an intermediate leadership position. Yellow Ropes take on additional duties assisting MTLs with day-to-day floor operations and student management.",
    requirements: [
      "Minimum 30 days as a Green Rope",
      "Demonstrated leadership potential",
      "Maintain 85% or higher academic average",
      "No disciplinary actions as a Green Rope",
      "Recommendation from supervising MTL and current rope leadership",
    ],
    responsibilities: [
      "Assist MTLs with floor operations and inspections",
      "Lead dormitory details and work parties",
      "Mentor and evaluate Green Ropes",
      "Conduct peer-led training sessions",
      "Manage daily accountability for assigned floor",
      "Coordinate with MTLs on student issues",
    ],
    sortOrder: 2,
  },
  {
    ropeColor: "red",
    title: "Red Rope - Senior Student Leader",
    descriptionText:
      "The Red Rope is the highest student leadership position. Red Ropes serve as the senior student leaders, managing all other rope holders and serving as the primary liaison between students and MTLs.",
    requirements: [
      "Minimum 30 days as a Yellow Rope",
      "Exceptional leadership record",
      "Maintain 90% or higher academic average",
      "Top fitness scores",
      "Endorsement from multiple MTLs and Group leadership",
      "Interview with senior NCO leadership",
    ],
    responsibilities: [
      "Serve as primary student liaison to MTL corps",
      "Manage and mentor all Green and Yellow Ropes",
      "Lead major formations and student events",
      "Represent students at leadership meetings",
      "Assist with in-processing of new students",
      "Coordinate special projects with MTLs",
      "Conduct rope holder evaluations",
    ],
    sortOrder: 3,
  },
];

export async function seedDefaultRopePrograms() {
  let added = 0;
  for (const def of DEFAULT_PROGRAMS) {
    const existing = await prisma.ropeProgram.findFirst({
      where: { ropeColor: def.ropeColor },
    });
    if (!existing) {
      await prisma.ropeProgram.create({
        data: {
          ropeColor: def.ropeColor,
          title: def.title,
          description: {
            text: def.descriptionText,
          } as Prisma.InputJsonValue,
          requirements: {
            requirements: def.requirements,
            responsibilities: def.responsibilities,
          } as Prisma.InputJsonValue,
          sortOrder: def.sortOrder,
        },
      });
      added++;
    }
  }
  revalidatePath("/admin/rope-programs");
  revalidatePath("/leadership-programs");
  return { added };
}
