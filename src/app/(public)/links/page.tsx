import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { ChevronRight, Link as LinkIcon } from "lucide-react";
import { getAllCollections } from "@/lib/actions/links";

export const metadata: Metadata = {
  title: "Links",
};

export default async function LinksIndexPage() {
  const collections = await getAllCollections();

  return (
    <div>
      <PageHeader
        title="Links"
        description="Curated link collections and external resources."
      />
      <div className="mx-auto max-w-7xl px-4 py-8">
        {collections.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No link collections have been published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c) => (
              <Link key={c.id} href={`/links/${c.slug}`} className="group">
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue">
                        <LinkIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold flex items-center gap-1 mb-1">
                          {c.title}
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        </h3>
                        {c.description && (
                          <p className="text-xs text-muted-foreground">
                            {c.description}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-muted-foreground">
                          {c._count.items}{" "}
                          {c._count.items === 1 ? "link" : "links"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
