import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Circle, Clock } from "lucide-react";
import type { PhasesBlock } from "@/lib/content-blocks";

export function PhasesDisplay({ block }: { block: PhasesBlock }) {
  if (block.phases.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 space-y-6">
      {block.phases.map((phase, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-center gap-3">
              {phase.badge && (
                <Badge variant={block.badgeVariant}>{phase.badge}</Badge>
              )}
              <div>
                <CardTitle className="text-lg">{phase.title}</CardTitle>
                {phase.timeframe && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" />
                    {phase.timeframe}
                  </p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {phase.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <Circle className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
