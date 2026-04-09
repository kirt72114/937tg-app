import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { ProfileCard } from "@/components/shared/profile-card";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Meet Your Leadership",
};

const leaders = [
  {
    name: "John Mitchell",
    rank: "Col.",
    title: "Group Commander",
    unit: "937th Training Group",
    bio: "As Group Commander, Col. Mitchell leads over 1,000 military and civilian personnel responsible for training the Air Force's next generation of medical professionals. He oversees all training operations, readiness, and student welfare.",
  },
  {
    name: "Sarah Chen",
    rank: "Lt Col.",
    title: "Vice Commander",
    unit: "937th Training Group",
    bio: "Lt Col. Chen serves as the principal deputy to the Group Commander, managing day-to-day operations and ensuring training excellence across all squadrons within the 937th Training Group.",
  },
  {
    name: "Robert Jackson",
    rank: "CMSgt",
    title: "Group Superintendent",
    unit: "937th Training Group",
    bio: "As the senior enlisted leader, CMSgt Jackson advises the Commander on all enlisted matters, morale, welfare, and professional development of over 800 enlisted personnel and Airmen in Training.",
  },
  {
    name: "David Rivera",
    rank: "Lt Col.",
    title: "Deputy Group Commander",
    unit: "937th Training Group",
    bio: "Lt Col. Rivera supports the Commander and Vice Commander in executing the group's mission, with focus on resource management, strategic planning, and interagency coordination at METC.",
  },
  {
    name: "Angela Foster",
    rank: "CMSgt",
    title: "Command Chief",
    unit: "937th Training Group",
    bio: "CMSgt Foster serves as the principal advisor to the Commander on all issues regarding health, welfare, morale, and professional development of the enlisted force assigned to the 937 TG.",
  },
];

export default function LeadershipPage() {
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
            <ProfileCard key={leader.name} {...leader} />
          ))}
        </div>
      </div>
    </div>
  );
}
