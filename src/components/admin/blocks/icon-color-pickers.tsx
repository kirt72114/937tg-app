"use client";

import {
  ICON_OPTIONS,
  COLOR_OPTIONS,
  DynamicIcon,
  getColorClasses,
} from "@/lib/icon-map";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function IconPicker({
  value,
  onChange,
  label = "Icon",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-muted/30 text-foreground">
          <DynamicIcon name={value} className="h-5 w-5" />
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={selectClasses}
        >
          {ICON_OPTIONS.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function ColorPicker({
  value,
  onChange,
  label = "Color",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex flex-wrap gap-2">
        {COLOR_OPTIONS.map((opt) => {
          const classes = getColorClasses(opt.value);
          const isSelected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              title={opt.label}
              className={`flex h-8 w-8 items-center justify-center rounded-md border transition ${classes} ${
                isSelected
                  ? "ring-2 ring-offset-2 ring-military-blue"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <span className="h-3 w-3 rounded-full bg-current" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
