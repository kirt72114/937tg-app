import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { MtlUnitDetail } from "@/components/public/blocks/mtl-unit-detail";
import { getAllSquadrons } from "@/lib/actions/squadrons";
import { getRosterProfiles } from "@/lib/actions/roster";
import { unitToSlug } from "@/lib/unit-slug";

export const dynamic = "force-dynamic";

async function resolveSquadron(slug: string) {
  const squadrons = await getAllSquadrons();
  return squadrons.find((s) => unitToSlug(s.unit) === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unit: string }>;
}): Promise<Metadata> {
  const { unit } = await params;
  const squadron = await resolveSquadron(unit);
  if (!squadron) return {};
  return {
    title: `${squadron.unit} MTLs`,
    description: squadron.mission ?? undefined,
  };
}

export default async function MtlUnitPage({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit } = await params;
  const squadron = await resolveSquadron(unit);
  if (!squadron) notFound();

  const profiles = await getRosterProfiles({
    profileType: "mtl",
    unit: squadron.unit,
  });

  return (
    <div>
      <PageHeader title={`${squadron.unit} MTLs`} />
      <div className="mx-auto max-w-5xl px-4 pt-6">
        <Link
          href="/mtls"
          className="inline-flex items-center gap-1 text-sm text-military-blue hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          All MTL teams
        </Link>
      </div>
      <MtlUnitDetail
        unit={squadron.unit}
        logoUrl={squadron.logoUrl}
        mission={squadron.mission}
        vision={squadron.vision}
        profiles={profiles}
      />
    </div>
  );
}
