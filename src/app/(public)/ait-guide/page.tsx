import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { BookOpen, Shield, Clock, Shirt, Smartphone, AlertTriangle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "AiT Guide",
};

const sections = [
  {
    title: "Standards of Conduct",
    icon: Shield,
    color: "bg-blue-100 text-blue-700",
    items: [
      "Maintain military bearing and professional appearance at all times",
      "Address all personnel by proper rank and title",
      "Adhere to curfew times: 2200 (Sun-Thu), 0000 (Fri-Sat)",
      "No alcohol consumption for students under 21; 21+ must follow base policy",
      "Report any safety concerns or incidents to your MTL immediately",
      "Maintain accountability — always sign in/out when leaving the dormitory",
    ],
  },
  {
    title: "Daily Schedule",
    icon: Clock,
    color: "bg-green-100 text-green-700",
    items: [
      "0500 - Reveille / Wake up",
      "0530 - Physical Training (Mon, Wed, Fri)",
      "0630 - Personal hygiene and room preparation",
      "0700 - Breakfast at DFAC",
      "0730 - Formation / Accountability",
      "0800-1600 - Academic training",
      "1630 - Return to dormitory / Personal time",
      "2100 - Room check / Accountability",
      "2200 - Lights out (weekdays)",
    ],
  },
  {
    title: "Uniform Standards",
    icon: Shirt,
    color: "bg-purple-100 text-purple-700",
    items: [
      "OCPs required for all training days unless otherwise directed",
      "PT gear required for scheduled physical training",
      "Civilian attire authorized during off-duty hours (must be appropriate)",
      "Maintain clean, pressed uniforms at all times",
      "Name tapes, rank, and all required accoutrements properly placed",
      "Hair must be within Air Force standards at all times",
    ],
  },
  {
    title: "Technology & Electronics",
    icon: Smartphone,
    color: "bg-amber-100 text-amber-700",
    items: [
      "Cell phones may be used during personal time only",
      "No phones during formations, classes, or duty hours unless authorized",
      "No recording devices in classrooms without instructor approval",
      "Wi-Fi available in dormitory common areas",
      "Gaming consoles allowed in rooms during personal time",
      "Social media use must comply with OPSEC and Air Force policy",
    ],
  },
];

const importantRules = [
  "Absolutely no fraternization between students and permanent party",
  "Zero tolerance for drug use — random testing is conducted",
  "Dormitory rooms are subject to inspection at any time",
  "Off-limits areas and establishments are posted — compliance is mandatory",
  "Battle buddy system required when traveling off-base after dark",
];

export default function AitGuidePage() {
  return (
    <div>
      <PageHeader
        title="Airmen in Training Guide"
        description="Essential information for all AiT students at the 937th Training Group."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold mb-1">Welcome, Airman</h2>
              <p className="text-sm text-muted-foreground">
                This guide outlines the standards, expectations, and daily life for Airmen in Training
                at the 937th Training Group. Read it carefully and refer back to it as needed. Your MTL
                is your primary resource for questions — never hesitate to ask.
              </p>
            </div>
          </CardContent>
        </Card>

        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${section.color}`}>
                  <section.icon className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-military-blue mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}

        <Card className="border-red-200 border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <CardTitle className="text-lg">Critical Rules</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {importantRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                  <span className="font-medium">{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
