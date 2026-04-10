import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { MapPin, ExternalLink, Building2 } from "lucide-react";
import { getLocations } from "@/lib/actions/locations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Locations",
};

const categoryColors: Record<string, string> = {
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

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div>
      <PageHeader
        title="Locations"
        description="Key locations on and around JBSA-Fort Sam Houston for 937 TG personnel."
      />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc) => (
            <Card key={loc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-sm">{loc.name}</h3>
                  <Badge className={`${categoryColors[loc.category] || "bg-gray-100 text-gray-700"} text-[10px] shrink-0`}>
                    {loc.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  {loc.address}
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
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
      </div>
    </div>
  );
}
