import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { ShieldAlert, Phone, CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "SAFEREP",
};

const reportableItems = [
  "Unsafe conditions in dormitories, training facilities, or common areas",
  "Hazardous material spills or exposure",
  "Workplace injuries or near-miss incidents",
  "Vehicle accidents (on or off base)",
  "Faulty or damaged equipment",
  "Fire hazards or electrical issues",
  "Slip, trip, and fall hazards",
  "Any condition that could cause injury or property damage",
];

export default function SaferepPage() {
  return (
    <div>
      <PageHeader
        title="SAFEREP"
        description="Safety reporting information — if you see something unsafe, report it."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-700">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold mb-1">Safety is Everyone&apos;s Responsibility</h2>
              <p className="text-sm text-muted-foreground">
                The 937th Training Group is committed to maintaining a safe environment for
                all personnel. If you observe an unsafe condition or experience a safety incident,
                report it immediately. All reports can be made anonymously.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="border-red-200 border-2">
            <CardContent className="flex items-center gap-3 p-4">
              <Phone className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-xs text-muted-foreground">Emergency (immediate danger)</p>
                <a href="tel:911" className="text-lg font-bold text-red-600 hover:underline">911</a>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Phone className="h-5 w-5 text-military-blue" />
              <div>
                <p className="text-xs text-muted-foreground">Safety Office (non-emergency)</p>
                <a href="tel:2108083800" className="text-sm font-medium text-military-blue hover:underline">
                  210-808-3800
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What to Report</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {reportableItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-military-navy text-white">
          <CardContent className="p-6 text-center">
            <ShieldAlert className="h-8 w-8 text-military-gold mx-auto mb-2" />
            <h2 className="font-bold mb-1">See Something? Say Something.</h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto">
              You will never be penalized for reporting a safety concern in good faith.
              Your report could prevent an injury or save a life. Report to your MTL,
              supervisor, or call the Safety Office directly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
