import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Link as LinkIcon } from "lucide-react";
import { getAllCollections } from "@/lib/actions/links";
import { RESERVED_SLUGS } from "@/lib/links-constants";
import type { LinkCollectionsListBlock } from "@/lib/content-blocks";

const COLUMN_CLASSES: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

export async function LinkCollectionsListDisplay({
  block,
}: {
  block: LinkCollectionsListBlock;
}) {
  const all = await getAllCollections();
  const collections = block.hideReserved
    ? all.filter((c) => !RESERVED_SLUGS.has(c.slug))
    : all;

  const columns = COLUMN_CLASSES[block.columns] ?? COLUMN_CLASSES[3];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      {block.heading && (
        <h2 className="text-lg font-bold">{block.heading}</h2>
      )}
      {collections.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No link collections have been published yet.
        </p>
      ) : (
        <div className={`grid gap-4 ${columns}`}>
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
  );
}
