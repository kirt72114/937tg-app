import { Card, CardContent } from "@/components/ui/card";
import { DynamicIcon } from "@/lib/icon-map";
import type { HighlightCardBlock, HighlightVariant } from "@/lib/content-blocks";

const VARIANTS: Record<
  HighlightVariant,
  { cardClass: string; iconClass: string; titleClass: string; bodyClass: string }
> = {
  navy: {
    cardClass: "bg-military-navy text-white",
    iconClass: "text-military-gold",
    titleClass: "font-bold",
    bodyClass: "text-sm text-gray-300",
  },
  warning: {
    cardClass: "border-amber-200 border-2 bg-amber-50/50",
    iconClass: "text-amber-600",
    titleClass: "font-bold text-amber-900",
    bodyClass: "text-sm text-amber-900/80",
  },
  info: {
    cardClass: "border-blue-200 border-2 bg-blue-50/50",
    iconClass: "text-blue-600",
    titleClass: "font-bold text-blue-900",
    bodyClass: "text-sm text-blue-900/80",
  },
  success: {
    cardClass: "border-green-200 border-2 bg-green-50/50",
    iconClass: "text-green-600",
    titleClass: "font-bold text-green-900",
    bodyClass: "text-sm text-green-900/80",
  },
};

export function HighlightCardDisplay({ block }: { block: HighlightCardBlock }) {
  const variant = VARIANTS[block.variant] ?? VARIANTS.navy;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <Card className={variant.cardClass}>
        <CardContent className="p-6 text-center">
          <DynamicIcon
            name={block.icon}
            className={`h-8 w-8 ${variant.iconClass} mx-auto mb-2`}
          />
          <h2 className={`mb-1 ${variant.titleClass}`}>{block.title}</h2>
          <p className={`${variant.bodyClass} max-w-lg mx-auto`}>
            {block.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
