import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { DynamicIcon, getColorClasses } from "@/lib/icon-map";
import type { ChecklistBlock, ChecklistVariant } from "@/lib/content-blocks";

type VariantConfig = {
  cardClass: string;
  itemIconName: "CheckCircle2" | "AlertTriangle" | "Info";
  itemIconClass: string;
  itemClass: string;
};

const VARIANTS: Record<ChecklistVariant, VariantConfig> = {
  normal: {
    cardClass: "",
    itemIconName: "CheckCircle2",
    itemIconClass: "text-military-blue",
    itemClass: "",
  },
  warning: {
    cardClass: "border-red-200 border-2",
    itemIconName: "AlertTriangle",
    itemIconClass: "text-red-500",
    itemClass: "font-medium",
  },
  success: {
    cardClass: "border-green-200 border-2",
    itemIconName: "CheckCircle2",
    itemIconClass: "text-green-600",
    itemClass: "",
  },
  info: {
    cardClass: "border-blue-200 border-2",
    itemIconName: "Info",
    itemIconClass: "text-blue-600",
    itemClass: "",
  },
};

function ItemIcon({
  name,
  className,
}: {
  name: VariantConfig["itemIconName"];
  className?: string;
}) {
  if (name === "CheckCircle2") return <CheckCircle2 className={className} />;
  if (name === "AlertTriangle") return <AlertTriangle className={className} />;
  return <Info className={className} />;
}

export function ChecklistDisplay({ block }: { block: ChecklistBlock }) {
  const variant = VARIANTS[block.variant] ?? VARIANTS.normal;
  const colorClasses = getColorClasses(block.color);

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <Card className={variant.cardClass}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${colorClasses}`}
            >
              <DynamicIcon name={block.icon} className="h-4 w-4" />
            </div>
            <CardTitle className="text-lg">{block.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <ItemIcon
                  name={variant.itemIconName}
                  className={`h-4 w-4 shrink-0 mt-0.5 ${variant.itemIconClass}`}
                />
                <div className="flex-1">
                  <p className={variant.itemClass}>{item.text}</p>
                  {item.subtext && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.subtext}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
