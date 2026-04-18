import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Award, Star, CheckCircle2 } from "lucide-react";
import { getAllRopePrograms } from "@/lib/actions/rope-programs";
import type { RopeColor } from "@prisma/client";

export const metadata: Metadata = {
  title: "Airman Leadership Programs",
};

const colorStyles: Record<
  RopeColor,
  { border: string; bg: string; badge: string; label: string }
> = {
  green: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50",
    badge: "bg-emerald-500 text-white",
    label: "Green",
  },
  yellow: {
    border: "border-l-amber-500",
    bg: "bg-amber-50",
    badge: "bg-amber-500 text-white",
    label: "Yellow",
  },
  red: {
    border: "border-l-red-500",
    bg: "bg-red-50",
    badge: "bg-red-500 text-white",
    label: "Red",
  },
};

function extractText(value: unknown): string {
  if (value && typeof value === "object" && "text" in value) {
    return String((value as { text?: unknown }).text ?? "");
  }
  return "";
}

function extractList(
  value: unknown,
  key: "requirements" | "responsibilities"
): string[] {
  if (value && typeof value === "object" && key in value) {
    const list = (value as Record<string, unknown>)[key];
    if (Array.isArray(list)) return list.map(String);
  }
  return [];
}

export default async function LeadershipProgramsPage() {
  const programs = await getAllRopePrograms();

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
                The Rope Program provides Airmen in Training with the
                opportunity to develop leadership skills while serving their
                peers. Student leaders wear colored rope aiguillettes on their
                uniform to signify their position. Each level carries increasing
                responsibility and is an excellent way to distinguish yourself
                during technical training.
              </p>
            </div>
          </CardContent>
        </Card>

        {programs.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              Rope programs have not been set up yet.
            </CardContent>
          </Card>
        ) : (
          programs.map((program) => {
            const style = colorStyles[program.ropeColor];
            const description = extractText(program.description);
            const requirements = extractList(program.requirements, "requirements");
            const responsibilities = extractList(
              program.requirements,
              "responsibilities"
            );

            return (
              <Card
                key={program.id}
                className={`border-l-4 ${style.border} overflow-hidden`}
              >
                <CardHeader className={style.bg}>
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5" />
                    <div>
                      <Badge className={style.badge}>
                        {style.label} Rope
                      </Badge>
                      <CardTitle className="text-lg mt-1">
                        {program.title}
                      </CardTitle>
                    </div>
                  </div>
                  {description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {description}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {requirements.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold mb-3">
                          Requirements
                        </h3>
                        <ul className="space-y-2">
                          {requirements.map((req, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {responsibilities.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold mb-3">
                          Responsibilities
                        </h3>
                        <ul className="space-y-2">
                          {responsibilities.map((resp, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-military-blue mt-0.5" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}

        <Card className="bg-military-navy text-white">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-bold mb-2">
              Interested in Becoming a Rope?
            </h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto">
              Speak with your MTL about eligibility and the application process.
              Leadership starts with stepping up — your MTL can guide you
              through the requirements and help you begin your leadership
              journey.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
