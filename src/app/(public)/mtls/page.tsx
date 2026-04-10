import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { ProfileCard } from "@/components/shared/profile-card";
import { UserCheck, Target } from "lucide-react";
import { getMtlProfiles } from "@/lib/actions/leadership";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meet Your MTLs",
};

export default async function MtlsPage() {
  const mtls = await getMtlProfiles();

  return (
    <div>
      <PageHeader
        title="Meet Your MTLs"
        description="Military Training Leaders are the NCOs dedicated to mentoring and developing Airmen in Training."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold mb-1">What is an MTL?</h2>
                <p className="text-sm text-muted-foreground">
                  Military Training Leaders (MTLs) are experienced Non-Commissioned Officers
                  assigned to supervise Airmen in Training (AiT) in their dormitories. They serve
                  as mentors, role models, and the first line of support for students throughout
                  their technical training journey.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold mb-1">MTL Mission</h2>
                <p className="text-sm text-muted-foreground">
                  Our MTLs are dedicated to mentoring, training, and developing the next generation
                  of Warrior Medics. They ensure a safe, disciplined, and professional living
                  environment while fostering personal growth and military readiness in every student.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {mtls.map((mtl) => (
            <ProfileCard
              key={mtl.id}
              name={mtl.name}
              rank={mtl.rank}
              title={mtl.title}
              unit={mtl.unit}
              photoUrl={mtl.photoUrl ?? undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
