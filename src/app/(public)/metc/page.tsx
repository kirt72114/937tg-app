import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { GraduationCap, ExternalLink, Building2, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "METC",
};

const facts = [
  { label: "Established", value: "2010" },
  { label: "Location", value: "JBSA-Fort Sam Houston, TX" },
  { label: "Campus Size", value: "32 acres" },
  { label: "Annual Graduates", value: "28,000+" },
  { label: "Training Programs", value: "50+" },
  { label: "Service Branches", value: "Army, Navy, Air Force" },
];

const resources = [
  { title: "METC Official Website", url: "https://www.metc.mil", description: "Official website of the Medical Education & Training Campus" },
  { title: "METC Library", url: "#", description: "Access digital resources, study materials, and research databases" },
  { title: "Student Services", url: "#", description: "Academic counseling, tutoring, and student support services" },
  { title: "Simulation Center", url: "#", description: "State-of-the-art medical simulation and training facilities" },
];

export default function MetcPage() {
  return (
    <div>
      <PageHeader
        title="METC"
        description="Medical Education & Training Campus — the DoD's premier joint military medical training facility."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold mb-1">About METC</h2>
              <p className="text-sm text-muted-foreground">
                The Medical Education and Training Campus (METC) is the nation&apos;s largest
                military medical training facility, located at JBSA-Fort Sam Houston, Texas.
                METC consolidates enlisted medical training from all three services into one
                state-of-the-art campus, providing world-class education to develop the next
                generation of military healthcare professionals.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {facts.map((fact) => (
            <Card key={fact.label}>
              <CardContent className="p-4 text-center">
                <p className="text-lg font-bold text-military-blue">{fact.value}</p>
                <p className="text-xs text-muted-foreground">{fact.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Resources & Links</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="flex items-start gap-3 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium flex items-center gap-1">
                        {resource.title}
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </h3>
                      <p className="text-xs text-muted-foreground">{resource.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
