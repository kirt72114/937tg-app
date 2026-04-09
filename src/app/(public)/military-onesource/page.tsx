import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { ExternalLink, Globe, Phone, Heart, Brain, DollarSign, Scale, GraduationCap, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Military OneSource",
};

const services = [
  { title: "Counseling Services", description: "Free, confidential non-medical counseling (up to 12 sessions per issue)", icon: Brain, color: "bg-purple-100 text-purple-700" },
  { title: "Financial Counseling", description: "Free financial planning, tax preparation, and debt management assistance", icon: DollarSign, color: "bg-green-100 text-green-700" },
  { title: "Legal Services", description: "Legal consultation for personal matters including wills, powers of attorney, and tax issues", icon: Scale, color: "bg-blue-100 text-blue-700" },
  { title: "Spouse & Family Support", description: "Employment assistance, relocation support, and family life programs", icon: Users, color: "bg-pink-100 text-pink-700" },
  { title: "Education & Career", description: "Tuition assistance guidance, career counseling, and transition support", icon: GraduationCap, color: "bg-amber-100 text-amber-700" },
  { title: "Health & Wellness", description: "Wellness coaching, stress management, and healthy living resources", icon: Heart, color: "bg-red-100 text-red-700" },
];

export default function MilitaryOneSourcePage() {
  return (
    <div>
      <PageHeader
        title="Military OneSource"
        description="Free, confidential support for military members and their families — 24/7."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="bg-military-navy text-white">
            <CardContent className="flex items-center gap-4 p-6">
              <Phone className="h-8 w-8 text-military-gold" />
              <div>
                <p className="text-xs text-gray-300">Call Anytime (24/7)</p>
                <a href="tel:8003429647" className="text-xl font-bold text-military-gold hover:underline">
                  800-342-9647
                </a>
              </div>
            </CardContent>
          </Card>
          <a href="https://www.militaryonesource.mil" target="_blank" rel="noopener noreferrer">
            <Card className="bg-military-blue text-white hover:bg-military-blue/90 transition-colors h-full">
              <CardContent className="flex items-center gap-4 p-6">
                <Globe className="h-8 w-8 text-military-gold" />
                <div>
                  <p className="text-xs text-gray-300">Visit Website</p>
                  <p className="text-lg font-bold flex items-center gap-1">
                    militaryonesource.mil
                    <ExternalLink className="h-4 w-4" />
                  </p>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>

        <h2 className="text-lg font-bold">Available Services</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${service.color}`}>
                    <service.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">{service.title}</h3>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
