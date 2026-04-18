import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { UtensilsCrossed, Clock, AlertTriangle } from "lucide-react";
import { getCurrentSchedules } from "@/lib/actions/schedules";

export const metadata: Metadata = {
  title: "DFAC Hours",
};

type Meal = { name: string; time: string; notes?: string };

function extractMeals(content: unknown): Meal[] {
  if (content && typeof content === "object" && "meals" in content) {
    const meals = (content as { meals?: unknown }).meals;
    if (Array.isArray(meals)) {
      return meals
        .filter(
          (m): m is Meal =>
            typeof m === "object" &&
            m !== null &&
            "name" in m &&
            "time" in m
        )
        .map((m) => ({
          name: String(m.name),
          time: String(m.time),
          notes: m.notes ? String(m.notes) : undefined,
        }));
    }
  }
  return [];
}

function badgeVariantFor(
  title: string
): "default" | "secondary" | "outline" {
  const t = title.toLowerCase();
  if (t.includes("holiday")) return "outline";
  if (t.includes("weekend")) return "secondary";
  return "default";
}

function labelFor(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("holiday")) return "Holidays";
  if (t.includes("weekend")) return "Sat - Sun";
  if (t.includes("weekday")) return "Mon - Fri";
  return "Current";
}

export default async function DfacHoursPage() {
  const schedules = await getCurrentSchedules("dfac");

  return (
    <div>
      <PageHeader
        title="DFAC Hours"
        description="Rocco Dining Facility meal schedule and information."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold mb-1">Rocco Dining Facility</h2>
              <p className="text-sm text-muted-foreground">
                Building 2846, Fort Sam Houston. Meal card required for entry.
                All AiT students are authorized to eat at the DFAC during posted
                meal times.
              </p>
            </div>
          </CardContent>
        </Card>

        {schedules.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              No DFAC schedules have been posted yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {schedules.map((schedule) => {
              const meals = extractMeals(schedule.content);
              return (
                <Card key={schedule.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {schedule.title}
                      </CardTitle>
                      <Badge variant={badgeVariantFor(schedule.title)}>
                        {labelFor(schedule.title)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {meals.length === 0 ? (
                      <p className="text-xs text-muted-foreground">
                        No meals listed.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {meals.map((meal) => (
                          <div
                            key={meal.name}
                            className="flex items-start gap-3"
                          >
                            <Clock className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">
                                {meal.name}
                              </p>
                              <p className="text-xs text-military-blue font-medium">
                                {meal.time}
                              </p>
                              {meal.notes && (
                                <p className="text-xs text-muted-foreground">
                                  {meal.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <Card className="border-amber-200">
          <CardContent className="flex items-start gap-4 p-6">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Note: </span>
              Hours are subject to change for holidays, training exercises, or
              special events. Check with your MTL or the DFAC directly for the
              most current schedule.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
