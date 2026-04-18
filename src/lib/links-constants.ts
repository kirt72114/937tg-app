export const FOOTER_SLUGS = {
  quick: "footer-quick",
  resources: "footer-resources",
} as const;

export const HOME_SLUGS = {
  quick: "home-quick",
  resources: "home-resources",
} as const;

export const RESERVED_SLUGS = new Set<string>([
  FOOTER_SLUGS.quick,
  FOOTER_SLUGS.resources,
  HOME_SLUGS.quick,
  HOME_SLUGS.resources,
]);
