import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Award, Star, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Airman Leadership Programs",
};

const ropePrograms = [
  {
    color: "Green",
    title: "Green Rope - Peer Leader",
    borderColor: "border-l-emerald-500",
    bgColor: "bg-emerald-50",
    badgeClass: "bg-emerald-500 text-white",
    description:
      "The Green Rope is the entry-level student leadership position. Green Ropes serve as peer mentors and assist fellow Airmen in Training with adjusting to military life and technical training.",
    requirements: [
      "Minimum 2 weeks in training",
      "No active UIF or disciplinary actions",
      "Maintain 80% or higher academic average",
      "Pass most recent fitness assessment",
      "Letter of recommendation from MTL",
    ],
    responsibilities: [
      "Mentor newly arrived Airmen in Training",
      "Assist with dormitory accountability formations",
      "Serve as a positive role model for peers",
      "Report concerns or issues to MTLs",
      "Help maintain dormitory standards",
    ],
  },
  {
    color: "Yellow",
    title: "Yellow Rope - Floor Leader",
    borderColor: "border-l-amber-500",
    bgColor: "bg-amber-50",
    badgeClass: "bg-amber-500 text-white",
    description:
      "The Yellow Rope is an intermediate leadership position. Yellow Ropes take on additional duties assisting MTLs with day-to-day floor operations and student management.",
    requirements: [
      "Minimum 30 days as a Green Rope",
      "Demonstrated leadership potential",
      "Maintain 85% or higher academic average",
      "No disciplinary actions as a Green Rope",
      "Recommendation from supervising MTL and current rope leadership",
    ],
    responsibilities: [
      "Assist MTLs with floor operations and inspections",
      "Lead dormitory details and work parties",
      "Mentor and evaluate Green Ropes",
      "Conduct peer-led training sessions",
      "Manage daily accountability for assigned floor",
      "Coordinate with MTLs on student issues",
    ],
  },
  {
    color: "Red",
    title: "Red Rope - Senior Student Leader",
    borderColor: "border-l-red-500",
    bgColor: "bg-red-50",
    badgeClass: "bg-red-500 text-white",
    description:
      "The Red Rope is the highest student leadership position. Red Ropes serve as the senior student leaders, managing all other rope holders and serving as the primary liaison between students and MTLs.",
    requirements: [
      "Minimum 30 days as a Yellow Rope",
      "Exceptional leadership record",
      "Maintain 90% or higher academic average",
      "Top fitness scores",
      "Endorsement from multiple MTLs and Group leadership",
      "Interview with senior NCO leadership",
    ],
    responsibilities: [
      "Serve as primary student liaison to MTL corps",
      "Manage and mentor all Green and Yellow Ropes",
      "Lead major formations and student events",
      "Represent students at leadership meetings",
      "Assist with in-processing of new students",
      "Coordinate special projects with MTLs",
      "Conduct rope holder evaluations",
    ],
  },
];

export default function LeadershipProgramsPage() {
  return (
    <div>
      <PageHeader
        title="Airman Leadership Programs"
        description="Student leadership opportunities through the Rope Program at the 937th Training Group."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold mb-1">The Rope Program</h2>
              <p className="text-sm text-muted-foreground">
                The Rope Program provides Airmen in Training with the opportunity to develop
                leadership skills while serving their peers. Student leaders wear colored
                rope aiguillettes on their uniform to signify their position. Each level
                carries increasing responsibility and is an excellent way to distinguish
                yourself during technical training.
              </p>
            </div>
          </CardContent>
        </Card>

        {ropePrograms.map((program) => (
          <Card
            key={program.color}
            className={`border-l-4 ${program.borderColor} overflow-hidden`}
          >
            <CardHeader className={program.bgColor}>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5" />
                <div>
                  <Badge className={program.badgeClass}>
                    {program.color} Rope
                  </Badge>
                  <CardTitle className="text-lg mt-1">{program.title}</CardTitle>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {program.description}
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {program.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-3">Responsibilities</h3>
                  <ul className="space-y-2">
                    {program.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-military-blue mt-0.5" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-military-navy text-white">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-bold mb-2">Interested in Becoming a Rope?</h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto">
              Speak with your MTL about eligibility and the application process.
              Leadership starts with stepping up — your MTL can guide you through
              the requirements and help you begin your leadership journey.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
