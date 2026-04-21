import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { getAllSquadrons } from "@/lib/actions/squadrons";
import { getAllSettings } from "@/lib/actions/settings";
import { MissingImage } from "@/components/shared/missing-image";
import { unitToSlug, GROUP_SLUG } from "@/lib/unit-slug";

type HubTile = {
  unit: string;
  slug: string;
  subtitle: string | null;
  logoUrl: string | null;
};

function Tile({ tile }: { tile: HubTile }) {
  return (
    <Link
      href={`/leadership/${tile.slug}`}
      className="group flex items-center gap-4 rounded-lg border border-military-blue/20 bg-white p-4 shadow-sm hover:border-military-blue hover:shadow-md transition-all"
    >
      <div className="shrink-0">
        {tile.logoUrl ? (
          <img
            src={tile.logoUrl}
            alt={`${tile.unit} patch`}
            className="h-16 w-16 md:h-20 md:w-20 object-contain"
          />
        ) : (
          <MissingImage
            label="Patch Missing"
            className="h-16 w-16 md:h-20 md:w-20"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-base md:text-lg font-semibold text-military-navy">
          {tile.unit}
        </h2>
        {tile.subtitle && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {tile.subtitle}
          </p>
        )}
      </div>
      <ChevronRight className="h-5 w-5 text-military-blue shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export async function LeadershipSquadronsDisplay() {
  const [squadrons, settings] = await Promise.all([
    getAllSquadrons(),
    getAllSettings(),
  ]);

  const groupUnit = settings.siteName || "937th Training Group";

  const tiles: HubTile[] = [
    {
      unit: groupUnit,
      slug: GROUP_SLUG,
      subtitle: settings.location || "JBSA-Fort Sam Houston, TX",
      logoUrl: settings.groupLogoUrl || null,
    },
    ...squadrons.map((s) => ({
      unit: s.unit,
      slug: unitToSlug(s.unit),
      subtitle: s.motto,
      logoUrl: s.logoUrl,
    })),
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-3">
      {tiles.map((tile) => (
        <Tile key={tile.slug} tile={tile} />
      ))}
    </div>
  );
}
