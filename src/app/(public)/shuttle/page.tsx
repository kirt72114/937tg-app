import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Bus, Clock, MapPin, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Shuttle Route",
};

const stops = [
  { name: "METC Campus (Main Entrance)", time: ":00 / :30" },
  { name: "AiT Dormitories (Building 2840)", time: ":05 / :35" },
  { name: "937 TG Headquarters (Building 2841)", time: ":08 / :38" },
  { name: "Rocco DFAC (Building 2846)", time: ":12 / :42" },
  { name: "Jimmy Brought Fitness Center", time: ":16 / :46" },
  { name: "Main Exchange (BX)", time: ":22 / :52" },
  { name: "Brooke Army Medical Center (BAMC)", time: ":28 / :58" },
];

export default function ShuttlePage() {
  return (
    <div>
      <PageHeader
        title="Shuttle Route"
        description="Base shuttle schedule and route information for JBSA-Fort Sam Houston."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Bus className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-xs text-muted-foreground">Service</p>
                <p className="text-sm font-medium">Base Shuttle Loop</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Clock className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-xs text-muted-foreground">Operating Hours</p>
                <p className="text-sm font-medium">Mon-Fri: 0600-2000</p>
                <p className="text-xs text-muted-foreground">Sat-Sun: 0800-1800</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <MapPin className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-xs text-muted-foreground">Frequency</p>
                <p className="text-sm font-medium">Every 30 minutes</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bus className="h-5 w-5 text-teal-600" />
              <CardTitle className="text-lg">Route Stops & Estimated Times</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">
              Times shown are minutes past the hour (e.g., :00 = on the hour, :30 = half past)
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {stops.map((stop, i) => (
                <div key={stop.name} className="flex items-center gap-4 py-3 border-b last:border-0">
                  <div className="flex flex-col items-center w-6">
                    <div className="h-3 w-3 rounded-full bg-teal-500 border-2 border-white shadow" />
                    {i < stops.length - 1 && <div className="w-0.5 h-6 bg-teal-200" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{stop.name}</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">
                    {stop.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardContent className="flex items-start gap-4 p-6">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Note: </span>
              Shuttle service may be reduced or suspended during holidays, inclement weather,
              or special events. Always have a backup plan for transportation to training.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
