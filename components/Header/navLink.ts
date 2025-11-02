import {
  Globe,
  Menu,
  Home,
  DollarSign,
  Info,
  MapPin,
  Phone,
  CircleHelp,
  X,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

export const navLink: NavItem[] = [
  { href: "/", label: "HOME", icon: Home },
  { href: "/pricing", label: "PRICING", icon: DollarSign },
  { href: "/case-study", label: "CASE STUDY", icon: Info },
  { href: "/country", label: "COUNTRY", icon: Globe },
  { href: "/contact", label: "CONTACT", icon: Phone },
  { href: "/faq", label: "FAQ", icon: CircleHelp },
];
