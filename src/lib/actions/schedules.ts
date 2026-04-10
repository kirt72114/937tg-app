"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { ScheduleType, Prisma } from "@prisma/client";

export async function getCurrentSchedules(type?: ScheduleType) {
  return prisma.schedule.findMany({
    where: { isCurrent: true, ...(type ? { scheduleType: type } : {}) },
    orderBy: { effectiveDate: "desc" },
  });
}

export async function getAllSchedules() {
  return prisma.schedule.findMany({
    orderBy: [{ isCurrent: "desc" }, { effectiveDate: "desc" }],
  });
}

export async function createSchedule(data: {
  title: string;
  scheduleType: ScheduleType;
  content: object;
  effectiveDate: Date;
}) {
  const schedule = await prisma.schedule.create({
    data: {
      title: data.title,
      scheduleType: data.scheduleType,
      content: data.content as Prisma.InputJsonValue,
      effectiveDate: data.effectiveDate,
    },
  });
  revalidatePath("/admin/schedules");
  revalidatePath("/dfac-hours");
  revalidatePath("/shuttle");
  return schedule;
}

export async function updateSchedule(
  id: string,
  data: {
    title?: string;
    scheduleType?: ScheduleType;
    content?: object;
    effectiveDate?: Date;
    isCurrent?: boolean;
  }
) {
  const schedule = await prisma.schedule.update({ where: { id }, data });
  revalidatePath("/admin/schedules");
  revalidatePath("/dfac-hours");
  revalidatePath("/shuttle");
  return schedule;
}

export async function deleteSchedule(id: string) {
  await prisma.schedule.delete({ where: { id } });
  revalidatePath("/admin/schedules");
  revalidatePath("/dfac-hours");
  revalidatePath("/shuttle");
}
