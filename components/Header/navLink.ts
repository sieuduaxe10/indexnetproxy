export type NavItem = {
  href: string;
  label: string;
  icon: string;
};

export const navLink: NavItem[] = [
  { href: "/", label: "HOME", icon: "/images/header/home.svg" },
  { href: "/pricing", label: "PRICING", icon: "/images/header/dollar.svg" },
  { href: "/case-study", label: "CASE STUDY", icon: "/images/header/info.svg" },
  { href: "/country", label: "COUNTRY", icon: "/images/header/globe-item.svg" },
  { href: "/contact", label: "CONTACT", icon: "/images/header/phone.svg" },
  { href: "/faq", label: "FAQ", icon: "/images/header/question-mask.svg" },
];
