import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import type { ScheduleGridBlock } from "@/lib/content-blocks";

const COLUMNS_CLASS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export function ScheduleGridDisplay({ block }: { block: ScheduleGridBlock }) {
  if (block.columns.length === 0) return null;
  const colClass =
    COLUMNS_CLASS[Math.min(block.columns.length, 4)] ?? COLUMNS_CLASS[3];

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 space-y-4">
      {block.heading && (
        <h2 className="text-lg font-bold">{block.heading}</h2>
      )}
      <div className={`grid grid-cols-1 gap-6 ${colClass}`}>
        {block.columns.map((col, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{col.title}</CardTitle>
                {col.badge && (
                  <Badge variant={col.badgeVariant}>{col.badge}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {col.rows.map((row, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Clock className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{row.label}</p>
                      <p className="text-xs text-military-blue font-medium">
                        {row.value}
                      </p>
                      {row.notes && (
                        <p className="text-xs text-muted-foreground">
                          {row.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
