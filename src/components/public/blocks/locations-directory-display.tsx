import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink } from "lucide-react";
import { getLocations } from "@/lib/actions/locations";
import type { LocationsDirectoryBlock } from "@/lib/content-blocks";

const COLUMN_CLASSES: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

const CATEGORY_COLORS: Record<string, string> = {
  Training: "bg-blue-100 text-blue-700",
  Housing: "bg-purple-100 text-purple-700",
  Dining: "bg-amber-100 text-amber-700",
  Services: "bg-green-100 text-green-700",
  Recreation: "bg-teal-100 text-teal-700",
  Medical: "bg-red-100 text-red-700",
  Support: "bg-indigo-100 text-indigo-700",
  Education: "bg-cyan-100 text-cyan-700",
  Access: "bg-gray-100 text-gray-700",
};

type LocationRow = {
  id: string;
  name: string;
  address: string;
  category: string;
};

export async function LocationsDirectoryDisplay({
  block,
}: {
  block: LocationsDirectoryBlock;
}) {
  const all = await getLocations();
  const filtered: LocationRow[] =
    block.categories && block.categories.length > 0
      ? all.filter((l) => block.categories!.includes(l.category))
      : all;

  const columns = COLUMN_CLASSES[block.columns] ?? COLUMN_CLASSES[3];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      {block.heading && (
        <h2 className="text-lg font-bold">{block.heading}</h2>
      )}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-sm text-muted-foreground">
            No locations available.
          </CardContent>
        </Card>
      ) : (
        <div className={`grid gap-4 ${columns}`}>
          {filtered.map((loc) => (
            <Card key={loc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-sm">{loc.name}</h3>
                  <Badge
                    className={`${
                      CATEGORY_COLORS[loc.category] || "bg-gray-100 text-gray-700"
                    } text-[10px] shrink-0`}
                  >
                    {loc.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  {loc.address}
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    loc.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-military-blue hover:underline"
                >
                  Get Directions
                  <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
