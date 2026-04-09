import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { ExternalLink, Globe, MapPin, Shield, Heart, GraduationCap, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "JBSA Connect",
};

const resources = [
  { title: "JBSA Official Website", url: "https://www.jbsa.mil", description: "Official Joint Base San Antonio website with news, events, and resources", icon: Globe },
  { title: "JBSA Fort Sam Houston", url: "https://www.jbsa.mil/About-Us/Fort-Sam-Houston/", description: "Fort Sam Houston specific information, maps, and services", icon: MapPin },
  { title: "JBSA MWR", url: "https://www.jbsamwr.com", description: "Morale, Welfare, and Recreation activities and facilities", icon: Heart },
  { title: "Military & Family Readiness", url: "#", description: "Programs and services for military members and their families", icon: Home },
  { title: "JBSA Education Center", url: "#", description: "Educational programs, tuition assistance, and testing services", icon: GraduationCap },
  { title: "JBSA Security Forces", url: "#", description: "Base security, gate hours, and visitor information", icon: Shield },
];

export default function JbsaConnectPage() {
  return (
    <div>
      <PageHeader
        title="JBSA Connect"
        description="External resources and links for Joint Base San Antonio."
      />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue">
                      <resource.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold flex items-center gap-1 mb-1">
                        {resource.title}
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </h3>
                      <p className="text-xs text-muted-foreground">{resource.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
