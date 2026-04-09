import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Scale, Phone, MapPin, Clock, Shield, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Area Defense Counsel",
};

const services = [
  "Representation during administrative actions (LOCs, LORs, Article 15s)",
  "Courts-martial defense representation",
  "Advice on military justice matters and your rights under the UCMJ",
  "Assistance with adverse personnel actions",
  "Representation at discharge boards and evaluation appeals",
  "Confidential legal consultations on any military legal matter",
];

export default function AdcPage() {
  return (
    <div>
      <PageHeader
        title="Area Defense Counsel (ADC)"
        description="Free, confidential legal representation for military members."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold mb-1">About the ADC</h2>
              <p className="text-sm text-muted-foreground">
                The Area Defense Counsel provides free, confidential legal representation
                to military members. The ADC is completely independent of your chain of command —
                nothing you discuss with your defense counsel will be shared with anyone
                without your consent.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Phone className="h-5 w-5 text-military-blue" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <a href="tel:2108083300" className="text-sm font-medium text-military-blue hover:underline">
                  210-808-3300
                </a>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <MapPin className="h-5 w-5 text-military-blue" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">Building 2841, Fort Sam Houston</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Clock className="h-5 w-5 text-military-blue" />
              <div>
                <p className="text-xs text-muted-foreground">Hours</p>
                <p className="text-sm font-medium">Mon-Fri 0800-1630</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-military-blue" />
              <CardTitle className="text-lg">Services Provided</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {services.map((service, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-military-blue mt-0.5" />
                  {service}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-military-navy text-white">
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-military-gold mx-auto mb-2" />
            <h2 className="font-bold mb-1">Your Right to Counsel</h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto">
              You have the right to consult with a defense counsel before making any statement
              or decision in a military justice matter. Don&apos;t wait — contact the ADC
              as soon as you become aware of any legal issue.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
