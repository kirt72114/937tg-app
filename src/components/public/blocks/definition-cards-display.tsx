import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/lib/icon-map";
import type { DefinitionCardsBlock } from "@/lib/content-blocks";

const COLUMN_CLASSES: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

export function DefinitionCardsDisplay({
  block,
}: {
  block: DefinitionCardsBlock;
}) {
  const columns = COLUMN_CLASSES[block.columns] ?? COLUMN_CLASSES[2];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      {block.heading && (
        <h2 className="text-lg font-bold">{block.heading}</h2>
      )}
      <div className={`grid gap-4 ${columns}`}>
        {block.cards.map((card, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="default" className="font-mono">
                  {card.badge}
                </Badge>
                {card.meta && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {card.metaIcon && (
                      <DynamicIcon name={card.metaIcon} className="h-3 w-3" />
                    )}
                    {card.meta}
                  </div>
                )}
              </div>
              <h3 className="text-sm font-semibold mb-1">{card.title}</h3>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
