"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const DEFAULT_SETTINGS: Record<string, string> = {
  siteName: "937th Training Group",
  siteDescription: "Official website of the 937th Training Group, JBSA-Fort Sam Houston",
  mission: "Together we develop Warrior Medics by providing comprehensive medical education and readiness training.",
  vision: "Premier Medics: Agile, Empowered and Innovative",
  primaryColor: "#1a3a6b",
  accentColor: "#c5a04e",
  footerText: "937th Training Group | JBSA-Fort Sam Houston, TX | United States Air Force",
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
