import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  type ContentBlock,
  type InfoCardBlock,
  type ListCardBlock,
  type CalloutBlock,
  type ContactGridBlock,
  type StepsCardBlock,
  type CtaBannerBlock,
  type ResourceGridBlock,
  getColorClasses,
} from "@/lib/block-types";
import { getIcon } from "@/lib/block-icons";
import {
  CheckCircle2,
  Circle,
  AlertTriangle,
  Info,
  Lightbulb,
  ShieldAlert,
  Clock,
  ExternalLink,
} from "lucide-react";

const proseClasses =
  "prose prose-sm max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_li]:my-1 [&_blockquote]:border-l-4 [&_blockquote]:border-military-blue [&_blockquote]:bg-military-blue/5 [&_blockquote]:pl-4 [&_blockquote]:pr-4 [&_blockquote]:py-3 [&_blockquote]:my-4 [&_blockquote]:rounded-r-md [&_blockquote_p]:my-0 [&_a]:text-military-blue [&_a]:underline [&_a]:font-medium [&_hr]:my-6 [&_hr]:border-t [&_hr]:border-border [&_img]:rounded-lg [&_img]:border [&_img]:my-4 [&_img]:max-w-full [&_code]:bg-muted [&_code]:rounded [&_code]:px-1 [&_code]:text-xs [&_pre]:bg-muted [&_pre]:rounded [&_pre]:p-3 [&_pre]:text-xs [&_pre]:overflow-x-auto [&_strong]:font-semibold";

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      {blocks.map((block, i) => (
        <BlockItem key={i} block={block} />
      ))}
    </div>
  );
}

function BlockItem({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "richText":
      return <RichTextRenderer html={block.data.html} />;
    case "infoCard":
      return <InfoCardRenderer data={block.data} />;
    case "listCard":
      return <ListCardRenderer data={block.data} />;
    case "callout":
      return <CalloutRenderer data={block.data} />;
    case "contactGrid":
      return <ContactGridRenderer data={block.data} />;
    case "stepsCard":
      return <StepsCardRenderer data={block.data} />;
    case "ctaBanner":
      return <CtaBannerRenderer data={block.data} />;
    case "resourceGrid":
      return <ResourceGridRenderer data={block.data} />;
    default:
      return null;
  }
}

function RichTextRenderer({ html }: { html: string }) {
  if (!html) return null;
  return (
    <article
      className={proseClasses}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function InfoCardRenderer({ data }: { data: InfoCardBlock["data"] }) {
  const Icon = getIcon(data.icon);
  const colors = getColorClasses(data.iconColor);
  return (
    <Card>
      <CardContent className="flex items-start gap-4 p-6">
        {Icon && (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              colors.bg,
              colors.text
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <h2 className="font-semibold mb-1">{data.title}</h2>
          <p className="text-sm text-muted-foreground">{data.text}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ListCardRenderer({ data }: { data: ListCardBlock["data"] }) {
  const Icon = getIcon(data.icon);
  const colors = getColorClasses(data.iconColor);

  const variantStyles: Record<string, string> = {
    default: "",
    warning: "border-amber-200",
    critical: "border-red-200 border-2",
    tip: "border-military-gold border-2",
  };

  const variantIcons: Record<string, typeof CheckCircle2> = {
    default: CheckCircle2,
    warning: AlertTriangle,
    critical: AlertTriangle,
    tip: CheckCircle2,
  };

  const variantIconColors: Record<string, string> = {
    default: "text-military-blue",
    warning: "text-amber-500",
    critical: "text-red-500",
    tip: "text-military-gold",
  };

  const BulletIcon = variantIcons[data.variant || "default"];
  const bulletColor = variantIconColors[data.variant || "default"];
  const hasDetailItems =
    data.items.length > 0 && typeof data.items[0] === "object";

  return (
    <Card className={variantStyles[data.variant || "default"]}>
      <CardHeader>
        <div className="flex items-center gap-3">
          {Icon && (
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg",
                colors.bg,
                colors.text
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
          )}
          <CardTitle className="text-lg">{data.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {hasDetailItems ? (
          <div className="space-y-4">
            {(
              data.items as Array<{ title: string; description: string }>
            ).map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
              >
                <BulletIcon
                  className={cn("h-4 w-4 shrink-0 mt-1", bulletColor)}
                />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-2.5">
            {(data.items as string[]).map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <BulletIcon
                  className={cn("h-4 w-4 shrink-0 mt-0.5", bulletColor)}
                />
                <span
                  className={
                    data.variant === "critical" ? "font-medium" : undefined
                  }
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function CalloutRenderer({ data }: { data: CalloutBlock["data"] }) {
  const variantConfig: Record<
    string,
    {
      icon: typeof Info;
      border: string;
      iconColor: string;
    }
  > = {
    info: {
      icon: Info,
      border: "border-blue-200",
      iconColor: "text-blue-500",
    },
    warning: {
      icon: AlertTriangle,
      border: "border-amber-200",
      iconColor: "text-amber-500",
    },
    critical: {
      icon: ShieldAlert,
      border: "border-red-200",
      iconColor: "text-red-500",
    },
    tip: {
      icon: Lightbulb,
      border: "border-military-gold",
      iconColor: "text-military-gold",
    },
  };

  const config = variantConfig[data.variant] || variantConfig.info;
  const CalloutIcon = config.icon;

  return (
    <Card className={config.border}>
      <CardContent className="flex items-start gap-4 p-6">
        <CalloutIcon
          className={cn("h-5 w-5 shrink-0 mt-0.5", config.iconColor)}
        />
        <div>
          {data.title && (
            <h3 className="font-semibold text-sm mb-1">{data.title}</h3>
          )}
          <p className="text-sm text-muted-foreground">{data.text}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactGridRenderer({ data }: { data: ContactGridBlock["data"] }) {
  const cols = data.columns || 3;
  const gridClass =
    cols === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-3";

  return (
    <div className={cn("grid gap-4", gridClass)}>
      {data.entries.map((entry, i) => {
        const Icon = getIcon(entry.icon);
        const colors = getColorClasses(entry.iconColor);
        const isLink = !!entry.href;

        const content = (
          <CardContent className="flex items-center gap-3 p-4">
            {Icon && <Icon className={cn("h-5 w-5", colors.text)} />}
            <div>
              <p className="text-xs text-muted-foreground">{entry.label}</p>
              {isLink ? (
                <a
                  href={entry.href}
                  className={cn(
                    "text-sm font-medium hover:underline",
                    colors.text
                  )}
                >
                  {entry.value}
                </a>
              ) : (
                <p className="text-sm font-medium">{entry.value}</p>
              )}
              {entry.subtext && (
                <p className="text-xs text-muted-foreground">
                  {entry.subtext}
                </p>
              )}
            </div>
          </CardContent>
        );

        const borderStyle =
          entry.iconColor === "red" ? "border-red-200 border-2" : "";

        return (
          <Card key={i} className={borderStyle}>
            {content}
          </Card>
        );
      })}
    </div>
  );
}

function StepsCardRenderer({ data }: { data: StepsCardBlock["data"] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Badge variant="default">{data.badge}</Badge>
          <div>
            <CardTitle className="text-lg">{data.title}</CardTitle>
            {data.timeframe && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Clock className="h-3 w-3" />
                {data.timeframe}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {data.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <Circle className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function CtaBannerRenderer({ data }: { data: CtaBannerBlock["data"] }) {
  const Icon = getIcon(data.icon);

  const variantStyles: Record<string, { bg: string; text: string; subtext: string; iconColor: string }> = {
    dark: {
      bg: "bg-military-navy text-white",
      text: "text-white",
      subtext: "text-gray-300",
      iconColor: "text-military-gold",
    },
    blue: {
      bg: "bg-military-blue text-white",
      text: "text-white",
      subtext: "text-blue-100",
      iconColor: "text-white",
    },
    gold: {
      bg: "bg-military-gold text-military-navy",
      text: "text-military-navy",
      subtext: "text-military-navy/70",
      iconColor: "text-military-navy",
    },
  };

  const styles = variantStyles[data.variant || "dark"] || variantStyles.dark;

  return (
    <Card className={styles.bg}>
      <CardContent className="p-6 text-center">
        {Icon && (
          <Icon className={cn("h-8 w-8 mx-auto mb-2", styles.iconColor)} />
        )}
        <h2 className={cn("font-bold mb-1", styles.text)}>{data.title}</h2>
        <p className={cn("text-sm max-w-lg mx-auto", styles.subtext)}>
          {data.text}
        </p>
      </CardContent>
    </Card>
  );
}

function ResourceGridRenderer({ data }: { data: ResourceGridBlock["data"] }) {
  const cols = data.columns || 3;
  const gridClass =
    cols === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={cn("grid gap-4", gridClass)}>
      {data.resources.map((resource, i) => {
        const Icon = getIcon(resource.icon);
        return (
          <a
            key={i}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  {Icon && (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue">
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold flex items-center gap-1 mb-1">
                      {resource.title}
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {resource.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        );
      })}
    </div>
  );
}
