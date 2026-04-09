export const SITE_CONFIG = {
  name: "937th Training Group",
  shortName: "937 TG",
  description:
    "Official website of the 937th Training Group, JBSA-Fort Sam Houston",
  mission:
    "Together we develop Warrior Medics by providing comprehensive medical education and readiness training.",
  vision: "Premier Medics: Agile, Empowered and Innovative",
  location: "JBSA-Fort Sam Houston, TX",
  branch: "United States Air Force",
} as const;

export const NAV_ITEMS = {
  primary: [
    { label: "Home", href: "/", icon: "Home" },
    { label: "Meet Your Leadership", href: "/leadership", icon: "Users" },
    { label: "Meet Your MTLs", href: "/mtls", icon: "UserCheck" },
    { label: "METC", href: "/metc", icon: "GraduationCap" },
    {
      label: "Important Phone Numbers",
      href: "/phone-numbers",
      icon: "Phone",
    },
    { label: "AiT Guide", href: "/ait-guide", icon: "BookOpen" },
    { label: "ADC", href: "/adc", icon: "Scale" },
    { label: "Military OneSource", href: "/military-onesource", icon: "Globe" },
    { label: "Finance", href: "/finance", icon: "DollarSign" },
    { label: "In-Processing", href: "/in-processing", icon: "LogIn" },
    { label: "Out-Processing", href: "/out-processing", icon: "LogOut" },
    { label: "Locations", href: "/locations", icon: "MapPin" },
    { label: "Work Orders", href: "/work-orders", icon: "ClipboardList" },
  ],
  more: [
    { label: "Work Order Status", href: "/work-orders/status", icon: "Search" },
    { label: "DFAC Hours", href: "/dfac-hours", icon: "UtensilsCrossed" },
    { label: "Shuttle Route", href: "/shuttle", icon: "Bus" },
    { label: "Route of March", href: "/route-of-march", icon: "Route" },
    { label: "AFSCs", href: "/afscs", icon: "BadgeInfo" },
    { label: "EFMP", href: "/efmp", icon: "HeartHandshake" },
    {
      label: "Airman Leadership Programs",
      href: "/leadership-programs",
      icon: "Award",
    },
    { label: "Spartan Flight/CQ", href: "/spartan-flight", icon: "Shield" },
    { label: "SAFEREP", href: "/saferep", icon: "ShieldAlert" },
    { label: "JBSA Connect", href: "/jbsa-connect", icon: "Link" },
    { label: "Share App", href: "/share", icon: "Share2" },
  ],
} as const;

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Pages", href: "/admin/pages", icon: "FileText" },
  { label: "Announcements", href: "/admin/announcements", icon: "Megaphone" },
  { label: "Leadership", href: "/admin/leadership", icon: "Users" },
  { label: "MTLs", href: "/admin/mtls", icon: "UserCheck" },
  { label: "Phone Directory", href: "/admin/contacts", icon: "Phone" },
  { label: "Locations", href: "/admin/locations", icon: "MapPin" },
  { label: "Work Orders", href: "/admin/work-orders", icon: "ClipboardList" },
  { label: "Schedules", href: "/admin/schedules", icon: "Calendar" },
  { label: "Links", href: "/admin/links", icon: "Link" },
  { label: "Navigation", href: "/admin/navigation", icon: "Menu" },
  { label: "Files", href: "/admin/files", icon: "FolderOpen" },
  { label: "Users", href: "/admin/users", icon: "UserCog" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
] as const;
