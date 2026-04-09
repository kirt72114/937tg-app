import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Route, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Route of March",
};

const routeSteps = [
  "Form up at AiT Dormitories (Building 2840) parking lot",
  "March south on Stanley Road",
  "Turn left onto Gruber Road",
  "Continue to METC Campus main entrance (Building 2841)",
  "Formation dismissal at designated training building",
];

const guidelines = [
  "Arrive at formation area 10 minutes prior to step-off time",
  "Maintain proper formation alignment and cadence at all times",
  "Road guards will be posted at all intersections — follow their instructions",
  "No cell phones during march — stow all electronic devices",
  "Carry water during warm weather months (April - October)",
  "Report any injuries or issues to your element leader immediately",
  "Reflective belts required during hours of limited visibility",
];

export default function RouteOfMarchPage() {
  return (
    <div>
      <PageHeader
        title="Route of March"
        description="Formation route details for daily marches to and from training."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5 text-military-blue" />
              <CardTitle className="text-lg">Daily Formation Route</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              The standard route of march from the dormitories to the METC training campus.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {routeSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4 py-3 border-b last:border-0">
                  <div className="flex flex-col items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-military-blue text-white text-xs font-bold">
                      {i + 1}
                    </div>
                    {i < routeSteps.length - 1 && <div className="w-0.5 h-6 bg-military-blue/20 mt-1" />}
                  </div>
                  <p className="text-sm pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Clock className="h-5 w-5 text-military-blue" />
              <div>
                <p className="text-xs text-muted-foreground">Morning Formation</p>
                <p className="text-sm font-medium">0720 form up / 0730 step-off</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Clock className="h-5 w-5 text-military-blue" />
              <div>
                <p className="text-xs text-muted-foreground">Afternoon Return</p>
                <p className="text-sm font-medium">1630 form up / 1640 step-off</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Formation Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {guidelines.map((guideline, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-military-blue mt-0.5" />
                  {guideline}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
