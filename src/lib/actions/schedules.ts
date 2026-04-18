"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { ScheduleType, Prisma } from "@prisma/client";

export async function getCurrentSchedules(type?: ScheduleType) {
  return prisma.schedule.findMany({
    where: { isCurrent: true, ...(type ? { scheduleType: type } : {}) },
    orderBy: [{ effectiveDate: "desc" }, { createdAt: "asc" }],
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

const DEFAULT_SCHEDULES: Array<{
  title: string;
  scheduleType: ScheduleType;
  content: object;
}> = [
  {
    title: "Rocco DFAC - Weekday Hours",
    scheduleType: "dfac",
    content: {
      meals: [
        { name: "Breakfast", time: "0600 - 0800", notes: "Hot breakfast served" },
        { name: "Lunch", time: "1100 - 1300", notes: "Full lunch menu" },
        { name: "Dinner", time: "1700 - 1900", notes: "Full dinner menu" },
        {
          name: "Midnight Meal",
          time: "2300 - 0100",
          notes: "Limited menu for night shift",
        },
      ],
    },
  },
  {
    title: "Rocco DFAC - Weekend Hours",
    scheduleType: "dfac",
    content: {
      meals: [
        {
          name: "Brunch",
          time: "0800 - 1200",
          notes: "Combined breakfast/lunch menu",
        },
        { name: "Dinner", time: "1700 - 1900", notes: "Full dinner menu" },
      ],
    },
  },
  {
    title: "Rocco DFAC - Holiday Hours",
    scheduleType: "dfac",
    content: {
      meals: [
        { name: "Brunch", time: "0900 - 1200", notes: "Special holiday brunch" },
        {
          name: "Holiday Dinner",
          time: "1600 - 1900",
          notes: "Traditional holiday meal",
        },
      ],
    },
  },
  {
    title: "Base Shuttle Loop",
    scheduleType: "shuttle",
    content: {
      operatingHours: {
        weekday: "Mon-Fri: 0600-2000",
        weekend: "Sat-Sun: 0800-1800",
      },
      frequency: "Every 30 minutes",
      stops: [
        { name: "METC Campus (Main Entrance)", time: ":00 / :30" },
        { name: "AiT Dormitories (Building 2840)", time: ":05 / :35" },
        { name: "937 TG Headquarters (Building 2841)", time: ":08 / :38" },
        { name: "Rocco DFAC (Building 2846)", time: ":12 / :42" },
        { name: "Jimmy Brought Fitness Center", time: ":16 / :46" },
        { name: "Main Exchange (BX)", time: ":22 / :52" },
        { name: "Brooke Army Medical Center (BAMC)", time: ":28 / :58" },
      ],
    },
  },
];

export async function seedDefaultSchedules() {
  let added = 0;
  for (const def of DEFAULT_SCHEDULES) {
    const existing = await prisma.schedule.findFirst({
      where: { title: def.title },
    });
    if (!existing) {
      await prisma.schedule.create({
        data: {
          title: def.title,
          scheduleType: def.scheduleType,
          content: def.content as Prisma.InputJsonValue,
          effectiveDate: new Date(),
          isCurrent: true,
        },
      });
      added++;
    }
  }
  revalidatePath("/admin/schedules");
  revalidatePath("/dfac-hours");
  revalidatePath("/shuttle");
  return { added };
}
