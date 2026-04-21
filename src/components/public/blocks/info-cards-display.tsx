import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { DynamicIcon, getColorClasses } from "@/lib/icon-map";
import type { InfoCardsBlock } from "@/lib/content-blocks";

const COLUMN_CLASSES: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function InfoCardsDisplay({ block }: { block: InfoCardsBlock }) {
  const columns = COLUMN_CLASSES[block.columns] ?? COLUMN_CLASSES[2];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      {block.heading && (
        <h2 className="text-lg font-bold">{block.heading}</h2>
      )}
      <div className={`grid gap-4 ${columns}`}>
        {block.cards.map((card, i) => {
          const colorClasses = getColorClasses(card.color);
          const body = (
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="flex items-start gap-4 p-6">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colorClasses}`}
                >
                  <DynamicIcon name={card.icon} className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 flex items-center gap-1">
                    {card.title}
                    {card.url && (
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );

          if (card.url) {
            return (
              <a
                key={i}
                href={card.url}
                target={card.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  card.url.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="block"
              >
                {body}
              </a>
            );
          }
          return <div key={i}>{body}</div>;
        })}
      </div>
    </div>
  );
}
