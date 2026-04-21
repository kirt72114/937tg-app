import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import {
  LeadershipUnitDetail,
  type UnitDetailContent,
} from "@/components/public/blocks/leadership-unit-detail";
import { getAllSquadrons } from "@/lib/actions/squadrons";
import { getAllSettings } from "@/lib/actions/settings";
import { getRosterProfiles } from "@/lib/actions/roster";
import { unitToSlug, GROUP_SLUG } from "@/lib/unit-slug";

export const dynamic = "force-dynamic";

function squadronAfscs(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

async function resolveUnit(
  slug: string
): Promise<UnitDetailContent | null> {
  if (slug === GROUP_SLUG) {
    const settings = await getAllSettings();
    return {
      kind: "group",
      unit: settings.siteName || "937th Training Group",
      description: settings.groupDescription || "",
      logoUrl: settings.groupLogoUrl || null,
    };
  }

  const squadrons = await getAllSquadrons();
  const match = squadrons.find((s) => unitToSlug(s.unit) === slug);
  if (!match) return null;

  return {
    kind: "squadron",
    unit: match.unit,
    motto: match.motto,
    mission: match.mission,
    vision: match.vision,
    afscs: squadronAfscs(match.afscs),
    logoUrl: match.logoUrl,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unit: string }>;
}): Promise<Metadata> {
  const { unit } = await params;
  const content = await resolveUnit(unit);
  if (!content) return {};
  return {
    title: content.unit,
    description:
      content.kind === "squadron"
        ? content.mission ?? undefined
        : undefined,
  };
}

export default async function LeadershipUnitPage({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit } = await params;
  const content = await resolveUnit(unit);
  if (!content) notFound();

  const leaders = await getRosterProfiles({
    profileType: "leadership",
    unit: content.unit,
  });

  return (
    <div>
      <PageHeader title={content.unit} />
      <div className="mx-auto max-w-5xl px-4 pt-6">
        <Link
          href="/leadership"
          className="inline-flex items-center gap-1 text-sm text-military-blue hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          All leadership
        </Link>
      </div>
      <LeadershipUnitDetail content={content} leaders={leaders} />
    </div>
  );
}
