export type NavItem = {
  label: string;
  href: string;
  icon: string;
  children?: NavItem[];
};

export type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  mission: string;
  vision: string;
};
