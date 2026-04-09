import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { BadgeInfo, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "AFSCs",
};

const afscs = [
  { code: "4N0X1", title: "Aerospace Medical Technician", description: "Provides primary and specialty healthcare at military treatment facilities. Performs patient care, emergency treatment, and health management.", duration: "72 days" },
  { code: "4P0X1", title: "Pharmacy Technician", description: "Prepares and dispenses medications, manages pharmacy inventory, and provides pharmaceutical care under supervision.", duration: "51 days" },
  { code: "4T0X1", title: "Medical Laboratory Technician", description: "Performs laboratory procedures, analyzes specimens, and provides diagnostic data for patient treatment decisions.", duration: "72 days" },
  { code: "4R0X1", title: "Diagnostic Imaging Technician", description: "Operates diagnostic imaging equipment to produce radiographic images for medical diagnosis and treatment.", duration: "52 days" },
  { code: "4H0X1", title: "Cardiopulmonary Laboratory Technician", description: "Performs diagnostic testing of the heart and lungs, including EKGs, pulmonary function tests, and cardiac monitoring.", duration: "48 days" },
  { code: "4Y0X1", title: "Dental Assistant", description: "Assists dental officers in treatment procedures, manages dental records, and performs dental radiology.", duration: "35 days" },
  { code: "4A2X1", title: "Biomedical Equipment Technician", description: "Maintains, calibrates, and repairs medical equipment used in military healthcare facilities.", duration: "92 days" },
  { code: "4E0X1", title: "Public Health Technician", description: "Conducts health risk assessments, disease surveillance, and environmental health inspections.", duration: "54 days" },
];

export default function AfscsPage() {
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
                The 937th Training Group oversees Air Force students attending medical
                technical training at METC. Below are the primary AFSCs trained here.
                Training durations are approximate and subject to change.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {afscs.map((afsc) => (
            <Card key={afsc.code} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="default" className="font-mono">{afsc.code}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <GraduationCap className="h-3 w-3" />
                    ~{afsc.duration}
                  </div>
                </div>
                <h3 className="text-sm font-semibold mb-1">{afsc.title}</h3>
                <p className="text-xs text-muted-foreground">{afsc.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
