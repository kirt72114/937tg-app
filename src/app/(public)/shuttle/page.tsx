import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Bus, Clock, MapPin, AlertTriangle } from "lucide-react";
import { getCurrentSchedules } from "@/lib/actions/schedules";

export const metadata: Metadata = {
  title: "Shuttle Route",
};

type Stop = { name: string; time: string };
type ShuttleContent = {
  operatingHours?: { weekday?: string; weekend?: string };
  frequency?: string;
  stops?: Stop[];
};

function extractShuttle(content: unknown): ShuttleContent {
  if (!content || typeof content !== "object") return {};
  const c = content as Record<string, unknown>;
  const stopsRaw = c.stops;
  const stops =
    Array.isArray(stopsRaw)
      ? stopsRaw
          .filter(
            (s): s is Stop =>
              typeof s === "object" && s !== null && "name" in s && "time" in s
          )
          .map((s) => ({ name: String(s.name), time: String(s.time) }))
      : undefined;
  const hours = c.operatingHours as ShuttleContent["operatingHours"];
  const frequency = typeof c.frequency === "string" ? c.frequency : undefined;
  return { operatingHours: hours, frequency, stops };
}

export default async function ShuttlePage() {
  const schedules = await getCurrentSchedules("shuttle");
  const primary = schedules[0];
  const data = extractShuttle(primary?.content);
  const stops = data.stops ?? [];

  return (
    <div>
      <PageHeader
        title="Shuttle Route"
        description="Base shuttle schedule and route information for JBSA-Fort Sam Houston."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        {!primary ? (
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              No shuttle schedule has been posted yet.
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Bus className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Service</p>
                    <p className="text-sm font-medium">{primary.title}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Clock className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Operating Hours
                    </p>
                    {data.operatingHours?.weekday && (
                      <p className="text-sm font-medium">
                        {data.operatingHours.weekday}
                      </p>
                    )}
                    {data.operatingHours?.weekend && (
                      <p className="text-xs text-muted-foreground">
                        {data.operatingHours.weekend}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Frequency</p>
                    <p className="text-sm font-medium">
                      {data.frequency ?? "—"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bus className="h-5 w-5 text-teal-600" />
                  <CardTitle className="text-lg">
                    Route Stops &amp; Estimated Times
                  </CardTitle>
                </div>
                <p className="text-xs text-muted-foreground">
                  Times shown are minutes past the hour (e.g., :00 = on the
                  hour, :30 = half past)
                </p>
              </CardHeader>
              <CardContent>
                {stops.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    No stops listed.
                  </p>
                ) : (
                  <div className="space-y-0">
                    {stops.map((stop, i) => (
                      <div
                        key={stop.name}
                        className="flex items-center gap-4 py-3 border-b last:border-0"
                      >
                        <div className="flex flex-col items-center w-6">
                          <div className="h-3 w-3 rounded-full bg-teal-500 border-2 border-white shadow" />
                          {i < stops.length - 1 && (
                            <div className="w-0.5 h-6 bg-teal-200" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{stop.name}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className="font-mono text-xs"
                        >
                          {stop.time}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        <Card className="border-amber-200">
          <CardContent className="flex items-start gap-4 p-6">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Note: </span>
              Shuttle service may be reduced or suspended during holidays,
              inclement weather, or special events. Always have a backup plan
              for transportation to training.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
