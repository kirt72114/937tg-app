import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, UserCheck, Target } from "lucide-react";

import { getAllSquadrons } from "@/lib/actions/squadrons";
import { getUnitsWithProfileType } from "@/lib/actions/roster";
import { MissingImage } from "@/components/shared/missing-image";
import { unitToSlug } from "@/lib/unit-slug";

type HubTile = {
  unit: string;
  slug: string;
  subtitle: string | null;
  logoUrl: string | null;
};

function Tile({ tile }: { tile: HubTile }) {
  return (
    <Link
      href={`/mtls/${tile.slug}`}
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

export async function MtlCardsDisplay() {
  const [squadrons, mtlUnits] = await Promise.all([
    getAllSquadrons(),
    getUnitsWithProfileType("mtl"),
  ]);

  const tiles: HubTile[] = squadrons
    .filter((s) => mtlUnits.has(s.unit))
    .map((s) => ({
      unit: s.unit,
      slug: unitToSlug(s.unit),
      subtitle: s.motto,
      logoUrl: s.logoUrl,
    }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold mb-1">What is an MTL?</h2>
              <p className="text-sm text-muted-foreground">
                Military Training Leaders (MTLs) are experienced Non-Commissioned Officers
                assigned to supervise Airmen in Training (AiT) in their dormitories. They
                serve as mentors, role models, and the first line of support for students
                throughout their technical training journey.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold mb-1">MTL Mission</h2>
              <p className="text-sm text-muted-foreground">
                Our MTLs are dedicated to mentoring, training, and developing the next
                generation of Warrior Medics. They ensure a safe, disciplined, and
                professional living environment while fostering personal growth and
                military readiness in every student.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {tiles.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-sm text-muted-foreground">
            No MTL teams yet. Add MTL profiles in the admin panel and assign
            them to a squadron.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {tiles.map((tile) => (
            <Tile key={tile.slug} tile={tile} />
          ))}
        </div>
      )}
    </div>
  );
}
