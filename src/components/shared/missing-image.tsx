import { ImageOff } from "lucide-react";

export function MissingImage({
  label = "Image Missing",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded bg-muted text-muted-foreground border border-dashed border-muted-foreground/40 ${className}`}
      role="img"
      aria-label={label}
    >
      <ImageOff className="h-6 w-6 opacity-60" />
      <span className="text-[10px] uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );
}
