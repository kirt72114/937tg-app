import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { ProfileCard } from "@/components/shared/profile-card";
import { Shield } from "lucide-react";
import { getLeadershipProfiles } from "@/lib/actions/leadership";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meet Your Leadership",
};

export default async function LeadershipPage() {
  const leaders = await getLeadershipProfiles();

  return (
    <div>
      <PageHeader
        title="Meet Your Leadership"
        description="The command team of the 937th Training Group at JBSA-Fort Sam Houston."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold mb-1">937th Training Group Leadership</h2>
              <p className="text-sm text-muted-foreground">
                The 937th Training Group develops Warrior Medics through comprehensive medical education
                and readiness training at the Medical Education and Training Campus (METC),
                JBSA-Fort Sam Houston. Our leadership team is committed to ensuring every Airman
                receives world-class training and support.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader) => (
            <ProfileCard
              key={leader.id}
              name={leader.name}
              rank={leader.rank}
              title={leader.title}
              unit={leader.unit}
              bio={typeof leader.bio === "object" && leader.bio !== null && "html" in leader.bio ? String(leader.bio.html) : undefined}
              photoUrl={leader.photoUrl ?? undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
