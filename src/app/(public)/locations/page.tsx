import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { MapPin, ExternalLink, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Locations",
};

const locations = [
  {
    name: "937 TG Headquarters",
    building: "Building 2841",
    address: "Fort Sam Houston, TX 78234",
    description: "Main headquarters for the 937th Training Group. Houses the Orderly Room, Commander's office, and First Sergeant.",
    category: "Training",
    badgeClass: "bg-blue-100 text-blue-700",
  },
  {
    name: "METC Campus",
    building: "3490 Gruber Rd",
    address: "JBSA-Fort Sam Houston, TX 78234",
    description: "Medical Education and Training Campus — the largest medical training facility in the DoD. Home to classrooms, labs, and simulation centers.",
    category: "Training",
    badgeClass: "bg-blue-100 text-blue-700",
  },
  {
    name: "AiT Dormitories",
    building: "Building 2840",
    address: "Fort Sam Houston, TX 78234",
    description: "Student housing for Airmen in Training. Managed by MTLs. Report any maintenance issues through the Work Orders page.",
    category: "Housing",
    badgeClass: "bg-purple-100 text-purple-700",
  },
  {
    name: "Rocco Dining Facility",
    building: "Building 2846",
    address: "Fort Sam Houston, TX 78234",
    description: "Primary dining facility for AiT students. See DFAC Hours page for current meal times and menu information.",
    category: "Dining",
    badgeClass: "bg-amber-100 text-amber-700",
  },
  {
    name: "Main Exchange (BX)",
    building: "2250 Wilson Way",
    address: "JBSA-Fort Sam Houston, TX 78234",
    description: "AAFES Main Exchange for shopping, food court, and services. Open to all military personnel and dependents.",
    category: "Services",
    badgeClass: "bg-green-100 text-green-700",
  },
  {
    name: "Commissary",
    building: "2315 Wilson Way",
    address: "JBSA-Fort Sam Houston, TX 78234",
    description: "Defense Commissary Agency grocery store. Tax-free groceries and household items for military members.",
    category: "Services",
    badgeClass: "bg-green-100 text-green-700",
  },
  {
    name: "Jimmy Brought Fitness Center",
    building: "Building 2797",
    address: "Fort Sam Houston, TX 78234",
    description: "Full gym facility with weight room, cardio equipment, basketball courts, and group fitness classes.",
    category: "Recreation",
    badgeClass: "bg-teal-100 text-teal-700",
  },
  {
    name: "Brooke Army Medical Center",
    building: "3551 Roger Brooke Dr",
    address: "JBSA-Fort Sam Houston, TX 78234",
    description: "The Army's premier medical center. Provides comprehensive medical, dental, and specialty care for military members and families.",
    category: "Medical",
    badgeClass: "bg-red-100 text-red-700",
  },
  {
    name: "Fort Sam Houston Chapel",
    building: "1605 Stanley Rd",
    address: "Fort Sam Houston, TX 78234",
    description: "Offers worship services, counseling, and religious support for all faiths. Open to all military members and families.",
    category: "Services",
    badgeClass: "bg-green-100 text-green-700",
  },
  {
    name: "Area Defense Counsel (ADC)",
    building: "Building 2841",
    address: "Fort Sam Houston, TX 78234",
    description: "Free, confidential legal representation for military members. The ADC is independent of the chain of command.",
    category: "Services",
    badgeClass: "bg-green-100 text-green-700",
  },
];

export default function LocationsPage() {
  return (
    <div>
      <PageHeader
        title="Locations"
        description="Key locations on and around JBSA-Fort Sam Houston for 937 TG personnel."
      />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc) => (
            <Card key={loc.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-sm">{loc.name}</h3>
                  <Badge className={`${loc.badgeClass} text-[10px] shrink-0`}>
                    {loc.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Building2 className="h-3 w-3" />
                  {loc.building}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  {loc.address}
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {loc.description}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.building + " " + loc.address)}`}
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
