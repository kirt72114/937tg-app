import { createElement } from "react";
import {
  AlertTriangle,
  Award,
  BadgeInfo,
  BookOpen,
  Building2,
  Bus,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  DollarSign,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  Info,
  Link as LinkIcon,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Route,
  Scale,
  Search,
  Share2,
  Shield,
  ShieldAlert,
  Shirt,
  Smartphone,
  Star,
  Target,
  UserCheck,
  Users,
  UtensilsCrossed,
} from "lucide-react";

export const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  AlertTriangle,
  Award,
  BadgeInfo,
  BookOpen,
  Building2,
  Bus,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  DollarSign,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  Info,
  Link: LinkIcon,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Route,
  Scale,
  Search,
  Share2,
  Shield,
  ShieldAlert,
  Shirt,
  Smartphone,
  Star,
  Target,
  UserCheck,
  Users,
  UtensilsCrossed,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP).sort();

export function getIconComponent(
  name: string | null | undefined
): React.ComponentType<{ className?: string }> {
  if (name && ICON_MAP[name]) return ICON_MAP[name];
  return Info;
}

export function DynamicIcon({
  name,
  className,
}: {
  name: string | null | undefined;
  className?: string;
}) {
  return createElement(getIconComponent(name), { className });
}

export const COLOR_OPTIONS: { value: string; label: string }[] = [
  { value: "blue", label: "Blue" },
  { value: "indigo", label: "Indigo" },
  { value: "purple", label: "Purple" },
  { value: "teal", label: "Teal" },
  { value: "green", label: "Green" },
  { value: "amber", label: "Amber" },
  { value: "orange", label: "Orange" },
  { value: "red", label: "Red" },
  { value: "slate", label: "Slate" },
  { value: "military-blue", label: "Military Blue" },
];

// Tailwind can't pick these up from dynamic strings — mapping keeps them in
// the build. Stick to classes we expose via a lookup instead of template.
const COLOR_CLASSES: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  indigo: "bg-indigo-100 text-indigo-700",
  purple: "bg-purple-100 text-purple-700",
  teal: "bg-teal-100 text-teal-700",
  green: "bg-green-100 text-green-700",
  amber: "bg-amber-100 text-amber-700",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-700",
  slate: "bg-slate-100 text-slate-700",
  "military-blue": "bg-military-blue/10 text-military-blue",
};

export function getColorClasses(color: string | null | undefined): string {
  if (color && COLOR_CLASSES[color]) return COLOR_CLASSES[color];
  return COLOR_CLASSES.blue;
}
