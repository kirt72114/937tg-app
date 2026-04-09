import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "bg-military-navy text-white px-4 py-8 md:py-12",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-gray-300 max-w-2xl">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
