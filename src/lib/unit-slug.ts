export function unitToSlug(unit: string): string {
  return unit
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const GROUP_SLUG = "937th-training-group";
