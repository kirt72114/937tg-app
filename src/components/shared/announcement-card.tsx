import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnnouncementCardProps {
  title: string;
  content: string;
  priority: "normal" | "important" | "urgent";
  date: string;
  isPinned?: boolean;
}

export function AnnouncementCard({
  title,
  content,
  priority,
  date,
  isPinned,
}: AnnouncementCardProps) {
  const priorityVariant = {
    normal: "secondary" as const,
    important: "warning" as const,
    urgent: "destructive" as const,
  };

  return (
    <Card className={isPinned ? "border-military-gold border-2" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{title}</CardTitle>
          <div className="flex items-center gap-2">
            {isPinned && (
              <Badge variant="default" className="bg-military-gold text-military-navy text-[10px]">
                Pinned
              </Badge>
            )}
            <Badge variant={priorityVariant[priority]} className="text-[10px]">
              {priority}
            </Badge>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{date}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
}
