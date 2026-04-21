import { MissingImage } from "@/components/shared/missing-image";

export function UnitBanner({
  unit,
  logoUrl,
  mission,
  vision,
}: {
  unit: string;
  logoUrl: string | null;
  mission?: string | null;
  vision?: string | null;
}) {
  return (
    <header className="bg-military-blue/5 border-b border-military-blue/20 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="shrink-0">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${unit} patch`}
              className="h-24 w-24 md:h-32 md:w-32 object-contain"
            />
          ) : (
            <MissingImage
              label="Patch Missing"
              className="h-24 w-24 md:h-32 md:w-32"
            />
          )}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-military-navy">
            {unit}
          </h1>
          {mission && (
            <p className="text-sm text-military-navy/80 mt-2">
              <span className="font-semibold">MISSION:</span> {mission}
            </p>
          )}
          {vision && (
            <p className="text-sm text-military-navy/80 mt-1">
              <span className="font-semibold">VISION:</span> {vision}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
