import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Shield, Clock, Phone, CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Spartan Flight / CQ",
};

const cqDuties = [
  "Monitor dormitory entrance and maintain visitor log",
  "Conduct hourly floor checks and accountability",
  "Report emergencies and security incidents to MTL on duty",
  "Ensure quiet hours are maintained (2200-0600)",
  "Monitor fire and safety systems",
  "Assist students with after-hours issues",
  "Maintain CQ log with all notable events",
];

const whatToBring = [
  "Military ID / CAC",
  "Water and authorized snacks",
  "Study materials (academics encouraged during downtime)",
  "Uniform items for next duty day",
  "Phone charger",
];

export default function SpartanFlightPage() {
  return (
    <div>
      <PageHeader
        title="Spartan Flight / CQ Duty"
        description="Charge of Quarters duty information and schedules for AiT students."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold mb-1">About CQ Duty</h2>
              <p className="text-sm text-muted-foreground">
                Charge of Quarters (CQ) is a rotating duty assigned to AiT students to
                maintain security and accountability in the dormitories during after-duty hours.
                CQ runners work in shifts alongside the Duty MTL to ensure the safety and
                well-being of all dormitory residents.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Clock className="h-5 w-5 text-military-blue" />
              <div>
                <p className="text-xs text-muted-foreground">Shift 1</p>
                <p className="text-sm font-medium">1800 - 0000</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Clock className="h-5 w-5 text-military-blue" />
              <div>
                <p className="text-xs text-muted-foreground">Shift 2</p>
                <p className="text-sm font-medium">0000 - 0600</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Phone className="h-5 w-5 text-military-blue" />
              <div>
                <p className="text-xs text-muted-foreground">CQ Desk</p>
                <a href="tel:2108083150" className="text-sm font-medium text-military-blue hover:underline">
                  210-808-3150
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CQ Duties</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {cqDuties.map((duty, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-military-blue mt-0.5" />
                    {duty}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What to Bring</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {whatToBring.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-military-gold mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="border-amber-200">
          <CardContent className="flex items-start gap-4 p-6">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Important: </span>
              CQ duty is a military requirement. Failure to report for duty or abandoning
              your post may result in disciplinary action. If you have a conflict, notify
              your MTL as soon as possible to arrange a swap.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
