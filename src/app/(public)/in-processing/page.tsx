import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { CheckCircle2, Circle, Lightbulb, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "In-Processing",
};

const phases = [
  {
    title: "Phase 1: Arrival",
    timeframe: "Day 1",
    badge: "Day 1",
    items: [
      "Report to 937 TG Reception Center with your orders and military ID",
      "Receive dormitory room assignment and bedding",
      "Get issued meal card / DFAC access",
      "Complete initial safety and orientation briefing",
      "Register personal vehicle with Security Forces (if applicable)",
      "Receive welcome packet with base map and key phone numbers",
    ],
  },
  {
    title: "Phase 2: Administrative",
    timeframe: "Days 1-3",
    badge: "Days 1-3",
    items: [
      "In-process with the 937 TG Orderly Room (bring orders, ID, medical records)",
      "Update DEERS and personnel records",
      "Set up military email and CAC email certificates",
      "Complete mandatory online training (SAPR, Cyber Awareness, OPSEC, etc.)",
      "Enroll in TRICARE and verify medical benefits",
      "Register with the base Dental Clinic",
      "Set up direct deposit / verify finance records",
      "Obtain required uniforms and gear from supply",
    ],
  },
  {
    title: "Phase 3: Orientation",
    timeframe: "Week 1",
    badge: "Week 1",
    items: [
      "Attend 937 TG Commander's Welcome Brief",
      "Complete campus and base orientation tour",
      "Meet your assigned Military Training Leader (MTL)",
      "Review DFAC hours, shuttle routes, and base services",
      "Read and acknowledge the AiT Student Guide and standards",
      "Attend academic orientation for your training program",
      "Obtain your class schedule and training materials",
      "Complete initial fitness assessment (if required)",
    ],
  },
];

const tips = [
  "Bring multiple copies of your orders — you'll need them at several offices.",
  "Keep a folder with all your important documents organized and accessible.",
  "Save key phone numbers in your phone on Day 1 — especially your MTL and Orderly Room.",
  "Ask questions! Your MTL and fellow students are here to help you succeed.",
  "The DFAC schedule may differ on weekends — check the posted hours.",
  "Download or bookmark this app for quick access to all 937 TG resources.",
];

export default function InProcessingPage() {
  return (
    <div>
      <PageHeader
        title="In-Processing"
        description="Welcome to the 937th Training Group! Follow this checklist to complete your in-processing."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        {phases.map((phase, phaseIndex) => (
          <Card key={phase.title}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge variant="default">{phase.badge}</Badge>
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

        <Card className="border-military-gold border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-military-gold" />
              <CardTitle className="text-lg">Pro Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-military-gold mt-0.5" />
                  <span className="text-sm text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
