import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import {
  ExternalLink,
  ChevronLeft,
  Globe,
  MapPin,
  Shield,
  Heart,
  GraduationCap,
  Home,
  Users,
  UserCheck,
  Phone,
  BookOpen,
  Scale,
  DollarSign,
  LogIn,
  LogOut,
  ClipboardList,
  Search,
  UtensilsCrossed,
  Bus,
  Route,
  BadgeInfo,
  HeartHandshake,
  Award,
  ShieldAlert,
  Link as LinkLucide,
  Share2,
  FileText,
  Calendar,
  Star,
  Info,
} from "lucide-react";
import {
  getCollectionBySlug,
  getAllCollectionSlugs,
} from "@/lib/actions/links";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  MapPin,
  Shield,
  Heart,
  GraduationCap,
  Home,
  Users,
  UserCheck,
  Phone,
  BookOpen,
  Scale,
  DollarSign,
  LogIn,
  LogOut,
  ClipboardList,
  Search,
  UtensilsCrossed,
  Bus,
  Route,
  BadgeInfo,
  HeartHandshake,
  Award,
  ShieldAlert,
  Link: LinkLucide,
  Share2,
  FileText,
  Calendar,
  Star,
  Info,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return { title: "Links" };
  return {
    title: collection.title,
    description: collection.description ?? undefined,
  };
}

export async function generateStaticParams() {
  const collections = await getAllCollectionSlugs();
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function LinkCollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  return (
    <div>
      <PageHeader
        title={collection.title}
        description={collection.description ?? undefined}
      />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Link
          href="/links"
          className="inline-flex items-center gap-1 text-sm text-military-blue hover:underline mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          All link collections
        </Link>

        {collection.items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No links in this collection yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collection.items.map((item) => {
              const Icon = item.icon ? iconMap[item.icon] : null;
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue">
                          {Icon ? (
                            <Icon className="h-5 w-5" />
                          ) : (
                            <LinkLucide className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold flex items-center gap-1 mb-1">
                            {item.title}
                            <ExternalLink className="h-3 w-3 text-muted-foreground" />
                          </h3>
                          {item.description && (
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
