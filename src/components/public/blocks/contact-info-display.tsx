import { Card, CardContent } from "@/components/ui/card";
import { DynamicIcon } from "@/lib/icon-map";
import {
  hrefForContact,
  type ContactInfoBlock,
  type ContactItem,
} from "@/lib/content-blocks";

const COLUMN_CLASSES: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
};

function ContactItemCard({ item }: { item: ContactItem }) {
  const href = hrefForContact(item);
  const emphasize = item.emphasize;

  const iconColor = emphasize ? "text-red-600" : "text-military-blue";
  const valueColor = emphasize
    ? "text-red-600"
    : "text-military-blue";
  const valueSize = emphasize
    ? "text-lg font-bold"
    : "text-sm font-medium";

  const body = (
    <Card
      className={`h-full ${
        emphasize ? "border-red-200 border-2" : ""
      } ${href ? "hover:shadow-md transition-shadow" : ""}`}
    >
      <CardContent className="flex items-center gap-3 p-4">
        <DynamicIcon name={item.icon} className={`h-5 w-5 ${iconColor}`} />
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{item.label}</p>
          <p className={`${valueSize} ${href ? valueColor : ""} truncate`}>
            {item.value}
          </p>
          {item.sublabel && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {item.sublabel}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (!href) return body;

  return (
    <a
      href={href}
      target={item.kind === "url" && href.startsWith("http") ? "_blank" : undefined}
      rel={
        item.kind === "url" && href.startsWith("http")
          ? "noopener noreferrer"
          : undefined
      }
      className="block"
    >
      {body}
    </a>
  );
}

export function ContactInfoDisplay({ block }: { block: ContactInfoBlock }) {
  if (block.items.length === 0) return null;
  const columns = COLUMN_CLASSES[block.columns] ?? COLUMN_CLASSES[3];

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 space-y-4">
      {block.heading && (
        <h2 className="text-lg font-bold">{block.heading}</h2>
      )}
      <div className={`grid gap-4 ${columns}`}>
        {block.items.map((item, i) => (
          <ContactItemCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
