import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LinkCardProps {
  title: string;
  description?: string;
  href: string;
  icon?: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function LinkCard({
  title,
  description,
  href,
  icon,
  className,
  external,
}: LinkCardProps) {
  const Comp = external ? "a" : Link;
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Card
      className={cn(
        "hover:shadow-md transition-shadow cursor-pointer group",
        className
      )}
    >
      <Comp href={href} {...externalProps}>
        <CardContent className="flex items-center gap-4 p-4">
          {icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-military-blue/10 text-military-blue">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground truncate">
                {description}
              </p>
            )}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-military-blue transition-colors" />
        </CardContent>
      </Comp>
    </Card>
  );
}
