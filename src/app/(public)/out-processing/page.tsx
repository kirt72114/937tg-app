import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Circle, AlertTriangle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Out-Processing",
};

const phases = [
  {
    title: "Phase 1: Notification",
    timeframe: "2+ weeks before departure",
    badge: "2+ Weeks Out",
    items: [
      "Receive PCS orders or graduation notification",
      "Schedule out-processing appointment with the Orderly Room",
      "Obtain and begin your clearing checklist",
      "Notify your MTL of your departure date",
      "Begin organizing personal items and packing",
    ],
  },
  {
    title: "Phase 2: Clearing",
    timeframe: "1-2 weeks before departure",
    badge: "1-2 Weeks Out",
    items: [
      "Clear dormitory room (schedule room inspection with your MTL)",
      "Return all issued equipment, linens, and gear to supply",
      "Clear with supply and logistics",
      "Complete medical records review and transfer",
      "Finance final out-processing and travel voucher",
      "Turn in meal card to the DFAC",
      "Clear with the base library (return any borrowed items)",
      "Return any training materials or textbooks",
    ],
  },
  {
    title: "Phase 3: Final Steps",
    timeframe: "Last 3 days",
    badge: "Final Days",
    items: [
      "Attend final formation or graduation rehearsal",
      "Complete all out-processing checklist signatures",
      "Collect copies of training records and certificates",
      "Set up mail forwarding to your next duty station",
      "Update personnel records with new duty station information",
      "Turn in temporary base access passes (if applicable)",
      "Ensure all personal items are removed from dormitory",
      "Report to the Orderly Room for final out-processing sign-off",
    ],
  },
];

const reminders = [
  "Start your clearing process early — some offices have limited appointment availability.",
  "Double-check that you have copies of ALL training certificates before departing.",
  "Ensure your travel voucher is submitted and correct before leaving.",
  "Update your forwarding address with the post office and USPS.",
  "Take photos of your cleared room before turning in the key.",
];

export default function OutProcessingPage() {
  return (
    <div>
      <PageHeader
        title="Out-Processing"
        description="Checklist for departing personnel — follow these steps to ensure a smooth transition."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        {phases.map((phase) => (
          <Card key={phase.title}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{phase.badge}</Badge>
                <div>
                  <CardTitle className="text-lg">{phase.title}</CardTitle>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" />
                    {phase.timeframe}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Circle className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}

        <Card className="border-amber-400 border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-lg">Important Reminders</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {reminders.map((reminder, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{reminder}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
