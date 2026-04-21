import { Card, CardContent } from "@/components/ui/card";
import type { StatsBlock } from "@/lib/content-blocks";

export function StatsDisplay({ block }: { block: StatsBlock }) {
  if (block.stats.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      {block.heading && (
        <h2 className="text-lg font-bold">{block.heading}</h2>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {block.stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center">
              <p className="text-lg font-bold text-military-blue">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
