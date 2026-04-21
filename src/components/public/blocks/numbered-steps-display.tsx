import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/lib/icon-map";
import type { NumberedStepsBlock } from "@/lib/content-blocks";

// Tailwind needs these visible at build time so arbitrary values in the
// string literals below still resolve. Keep the mapping small and explicit.
const COLOR_RING: Record<string, { bg: string; line: string }> = {
  "military-blue": {
    bg: "bg-military-blue text-white",
    line: "bg-military-blue/20",
  },
  teal: {
    bg: "bg-teal-500 text-white",
    line: "bg-teal-200",
  },
  blue: {
    bg: "bg-blue-500 text-white",
    line: "bg-blue-200",
  },
  amber: {
    bg: "bg-amber-500 text-white",
    line: "bg-amber-200",
  },
  green: {
    bg: "bg-green-500 text-white",
    line: "bg-green-200",
  },
  red: {
    bg: "bg-red-500 text-white",
    line: "bg-red-200",
  },
  indigo: {
    bg: "bg-indigo-500 text-white",
    line: "bg-indigo-200",
  },
};

function getRing(color: string) {
  return COLOR_RING[color] ?? COLOR_RING["military-blue"];
}

export function NumberedStepsDisplay({ block }: { block: NumberedStepsBlock }) {
  if (block.steps.length === 0) return null;
  const ring = getRing(block.color);
  const useNumbers = block.style === "numbered";

  const card = (
    <Card>
      {(block.title || block.subtitle || block.icon) && (
        <CardHeader>
          {block.title && (
            <div className="flex items-center gap-2">
              {block.icon && (
                <DynamicIcon
                  name={block.icon}
                  className="h-5 w-5 text-military-blue"
                />
              )}
              <CardTitle className="text-lg">{block.title}</CardTitle>
            </div>
          )}
          {block.subtitle && (
            <p className="text-sm text-muted-foreground">{block.subtitle}</p>
          )}
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-0">
          {block.steps.map((step, i) => {
            const isLast = i === block.steps.length - 1;
            return (
              <div
                key={i}
                className="flex items-center gap-4 py-3 border-b last:border-0"
              >
                <div className="flex flex-col items-center w-6 shrink-0">
                  {useNumbers ? (
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${ring.bg}`}
                    >
                      {i + 1}
                    </div>
                  ) : (
                    <div
                      className={`h-3 w-3 rounded-full border-2 border-white shadow ${ring.bg}`}
                    />
                  )}
                  {!isLast && (
                    <div className={`w-0.5 h-6 mt-1 ${ring.line}`} />
                  )}
                </div>
                <p className="flex-1 text-sm pt-0.5">{step.text}</p>
                {step.badge && (
                  <Badge variant="outline" className="font-mono text-xs">
                    {step.badge}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return <div className="mx-auto max-w-7xl px-4 py-4">{card}</div>;
}
