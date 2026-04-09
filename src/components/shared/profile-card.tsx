import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  name: string;
  rank: string;
  title: string;
  unit?: string;
  bio?: string;
  photoUrl?: string;
}

export function ProfileCard({
  name,
  rank,
  title,
  unit,
  bio,
  photoUrl,
}: ProfileCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[3/4] bg-gradient-to-br from-military-navy to-military-blue flex items-center justify-center">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${rank} ${name}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-white">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-military-gold bg-military-navy text-2xl font-bold text-military-gold">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span className="text-xs text-gray-300">Photo Coming Soon</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <Badge variant="outline" className="mb-2 text-[10px]">
          {rank}
        </Badge>
        <h3 className="font-semibold text-sm">{name}</h3>
        <p className="text-xs text-military-blue font-medium">{title}</p>
        {unit && (
          <p className="text-xs text-muted-foreground mt-0.5">{unit}</p>
        )}
        {bio && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
            {bio}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
