import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle2 } from "lucide-react";
import type { ProgramTiersBlock } from "@/lib/content-blocks";

type TierClasses = { border: string; bg: string; badge: string };

const TIER_CLASSES: Record<string, TierClasses> = {
  blue: {
    border: "border-l-blue-500",
    bg: "bg-blue-50",
    badge: "bg-blue-500 text-white",
  },
  green: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50",
    badge: "bg-emerald-500 text-white",
  },
  amber: {
    border: "border-l-amber-500",
    bg: "bg-amber-50",
    badge: "bg-amber-500 text-white",
  },
  red: {
    border: "border-l-red-500",
    bg: "bg-red-50",
    badge: "bg-red-500 text-white",
  },
  indigo: {
    border: "border-l-indigo-500",
    bg: "bg-indigo-50",
    badge: "bg-indigo-500 text-white",
  },
  purple: {
    border: "border-l-purple-500",
    bg: "bg-purple-50",
    badge: "bg-purple-500 text-white",
  },
  pink: {
    border: "border-l-pink-500",
    bg: "bg-pink-50",
    badge: "bg-pink-500 text-white",
  },
  teal: {
    border: "border-l-teal-500",
    bg: "bg-teal-50",
    badge: "bg-teal-500 text-white",
  },
  orange: {
    border: "border-l-orange-500",
    bg: "bg-orange-50",
    badge: "bg-orange-500 text-white",
  },
  slate: {
    border: "border-l-slate-500",
    bg: "bg-slate-50",
    badge: "bg-slate-500 text-white",
  },
  "military-blue": {
    border: "border-l-military-blue",
    bg: "bg-military-blue/10",
    badge: "bg-military-blue text-white",
  },
};

function getTierClasses(color: string): TierClasses {
  return TIER_CLASSES[color] ?? TIER_CLASSES.blue;
}

export function ProgramTiersDisplay({ block }: { block: ProgramTiersBlock }) {
  if (block.tiers.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 space-y-8">
      {block.tiers.map((tier, i) => {
        const classes = getTierClasses(tier.color);
        return (
          <Card
            key={i}
            className={`border-l-4 ${classes.border} overflow-hidden`}
          >
            <CardHeader className={classes.bg}>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5" />
                <div>
                  <Badge className={classes.badge}>{tier.badge}</Badge>
                  <CardTitle className="text-lg mt-1">{tier.title}</CardTitle>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {tier.description}
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {tier.sections.map((section, si) => (
                  <div key={si}>
                    <h3 className="text-sm font-semibold mb-3">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, ii) => (
                        <li
                          key={ii}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-military-blue mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
