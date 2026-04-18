"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const DEFAULT_SETTINGS: Record<string, string> = {
  siteName: "937th Training Group",
  shortName: "937 TG",
  branch: "United States Air Force",
  location: "JBSA-Fort Sam Houston, TX",
  siteDescription: "Official website of the 937th Training Group, JBSA-Fort Sam Houston",
  mission: "Together we develop Warrior Medics by providing comprehensive medical education and readiness training.",
  vision: "Premier Medics: Agile, Empowered and Innovative",
  groupDescription: `The 937th Training Group, headquartered at JBSA-Fort Sam Houston, Texas, is a crucial component of the 59th Medical Wing. The group is dedicated to providing world-class enlisted medical readiness training at the Medical Education and Training Campus.

With a dedicated team of 601 active-duty and civilian professionals, the group bears the responsibility for preparing over 14,700 students annually across 82 programs of instruction spanning 64 distinct courses and components, covering 51 enlisted Air Force specialty codes.

The group's mission extends to overseeing the completion of Phase II initial skills training for enlisted Air Force specialty codes and conducting officer clinical readiness training, ensuring personnel are ready to deliver healthcare in all settings and conditions.`,
  primaryColor: "#1a3a6b",
  accentColor: "#c5a04e",
  navyColor: "#0f2444",
  lightColor: "#f0f4f8",
  footerText: "",
};

export async function getAllSettings(): Promise<Record<string, string>> {
  const rows = await prisma.siteSetting.findMany();
  const settings = { ...DEFAULT_SETTINGS };
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  return settings;
}

export async function getSetting(key: string): Promise<string> {
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  return row?.value ?? DEFAULT_SETTINGS[key] ?? "";
}

export async function saveSettings(settings: Record<string, string>) {
  const operations = Object.entries(settings).map(([key, value]) =>
    prisma.siteSetting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    })
  );
  await prisma.$transaction(operations);
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
}
