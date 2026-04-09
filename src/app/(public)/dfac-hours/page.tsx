import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { UtensilsCrossed, Clock, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "DFAC Hours",
};

const weekdayMeals = [
  { meal: "Breakfast", time: "0600 - 0800", notes: "Hot breakfast served" },
  { meal: "Lunch", time: "1100 - 1300", notes: "Full lunch menu" },
  { meal: "Dinner", time: "1700 - 1900", notes: "Full dinner menu" },
  { meal: "Midnight Meal", time: "2300 - 0100", notes: "Limited menu for night shift" },
];

const weekendMeals = [
  { meal: "Brunch", time: "0800 - 1200", notes: "Combined breakfast/lunch menu" },
  { meal: "Dinner", time: "1700 - 1900", notes: "Full dinner menu" },
];

const holidayMeals = [
  { meal: "Brunch", time: "0900 - 1200", notes: "Special holiday brunch" },
  { meal: "Holiday Dinner", time: "1600 - 1900", notes: "Traditional holiday meal" },
];

export default function DfacHoursPage() {
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
                Building 2846, Fort Sam Houston. Meal card required for entry. All AiT
                students are authorized to eat at the DFAC during posted meal times.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Weekday Schedule</CardTitle>
                <Badge variant="default">Mon - Fri</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weekdayMeals.map((meal) => (
                  <div key={meal.meal} className="flex items-start gap-3">
                    <Clock className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{meal.meal}</p>
                      <p className="text-xs text-military-blue font-medium">{meal.time}</p>
                      <p className="text-xs text-muted-foreground">{meal.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Weekend Schedule</CardTitle>
                <Badge variant="secondary">Sat - Sun</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weekendMeals.map((meal) => (
                  <div key={meal.meal} className="flex items-start gap-3">
                    <Clock className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{meal.meal}</p>
                      <p className="text-xs text-military-blue font-medium">{meal.time}</p>
                      <p className="text-xs text-muted-foreground">{meal.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Holiday Schedule</CardTitle>
                <Badge variant="outline">Holidays</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {holidayMeals.map((meal) => (
                  <div key={meal.meal} className="flex items-start gap-3">
                    <Clock className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{meal.meal}</p>
                      <p className="text-xs text-military-blue font-medium">{meal.time}</p>
                      <p className="text-xs text-muted-foreground">{meal.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-amber-200">
          <CardContent className="flex items-start gap-4 p-6">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Note: </span>
              Hours are subject to change for holidays, training exercises, or special events.
              Check with your MTL or the DFAC directly for the most current schedule.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
