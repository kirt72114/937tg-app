import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { BadgeInfo, GraduationCap } from "lucide-react";
import { getActiveAfscs } from "@/lib/actions/afscs";

export const metadata: Metadata = {
  title: "AFSCs",
};

export default async function AfscsPage() {
  const afscs = await getActiveAfscs();

  return (
    <div>
      <PageHeader
        title="Air Force Specialty Codes (AFSCs)"
        description="Medical AFSCs trained at the 937th Training Group and METC."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <BadgeInfo className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold mb-1">Medical Training Programs</h2>
              <p className="text-sm text-muted-foreground">
                The 937th Training Group oversees Air Force students attending
                medical technical training at METC. Below are the primary AFSCs
                trained here. Training durations are approximate and subject to
                change.
              </p>
            </div>
          </CardContent>
        </Card>

        {afscs.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              No AFSCs have been published yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {afscs.map((afsc) => (
              <Card
                key={afsc.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="default" className="font-mono">
                      {afsc.code}
                    </Badge>
                    {afsc.duration && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <GraduationCap className="h-3 w-3" />~{afsc.duration}
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{afsc.title}</h3>
                  {afsc.description && (
                    <p className="text-xs text-muted-foreground">
                      {afsc.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
