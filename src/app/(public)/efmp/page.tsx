import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { HeartHandshake, Phone, CheckCircle2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "EFMP",
};

const services = [
  "Identification and enrollment of family members with special needs",
  "Assignment coordination to ensure medical and educational needs are met",
  "Referrals to local community resources and support services",
  "Assistance with Individualized Education Programs (IEPs)",
  "Connection to respite care and family support programs",
  "Transition assistance when PCSing to a new duty station",
];

const resources = [
  { title: "Air Force EFMP Portal", url: "https://www.afpc.af.mil/EFMP/", description: "Official Air Force EFMP information and resources" },
  { title: "Military OneSource EFMP", url: "https://www.militaryonesource.mil/efmp/", description: "Comprehensive EFMP resources and support" },
  { title: "STOMP (Specialized Training of Military Parents)", url: "#", description: "Training and support for military parents of children with special needs" },
];

export default function EfmpPage() {
  return (
    <div>
      <PageHeader
        title="Exceptional Family Member Program"
        description="Support and resources for military families with special needs."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-pink-700">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold mb-1">About EFMP</h2>
              <p className="text-sm text-muted-foreground">
                The Exceptional Family Member Program (EFMP) is a mandatory enrollment program
                that works with other military and civilian agencies to provide comprehensive
                and coordinated community support, housing, educational, and medical services
                to families with special needs.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Phone className="h-5 w-5 text-military-blue" />
            <div>
              <p className="text-xs text-muted-foreground">EFMP Contact</p>
              <a href="tel:2108083700" className="text-sm font-medium text-military-blue hover:underline">
                210-808-3700
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Services Provided</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {services.map((service, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-pink-600 mt-0.5" />
                  {service}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-lg font-bold mb-4">Resources</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {resources.map((resource) => (
              <a key={resource.title} href={resource.url} target="_blank" rel="noopener noreferrer">
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium flex items-center gap-1 mb-1">
                      {resource.title}
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </h3>
                    <p className="text-xs text-muted-foreground">{resource.description}</p>
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
