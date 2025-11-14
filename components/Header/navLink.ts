import { DollarOutlineIcon } from "../icons/DollarOutlineIcon";
import { GlobeOutlineIcon } from "../icons/GlobeOutlineIcon";
import { HomeOutlineIcon } from "../icons/HomeOutlineIcon";
import { InfoOutlineIcon } from "../icons/InfoOutlineIcon";
import { PhoneOutlineIcon } from "../icons/PhoneOutlineIcon";
import { QuestionOutlineIcon } from "../icons/QuestionOutlineIcon";

export type NavItem = {
  href: string;
  label: string;
  labelKey: "home" | "pricing" | "caseStudy" | "country" | "contact" | "faq";
  iconPath: string;
  iconComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const navLink: NavItem[] = [
  {
    href: "#hero",
    label: "HOME",
    labelKey: "home",
    iconPath: "/images/header/home.svg",
    iconComponent: HomeOutlineIcon,
  },
  {
    href: "#pricing",
    label: "PRICING",
    labelKey: "pricing",
    iconPath: "/images/header/dollar.svg",
    iconComponent: DollarOutlineIcon,
  },
  {
    href: "#case-study",
    label: "CASE STUDY",
    labelKey: "caseStudy",
    iconPath: "/images/header/info.svg",
    iconComponent: InfoOutlineIcon,
  },
  {
    href: "#country",
    label: "COUNTRY",
    labelKey: "country",
    iconPath: "/images/header/globe-item.svg",
    iconComponent: GlobeOutlineIcon,
  },
  {
    href: "#contact",
    label: "CONTACT",
    labelKey: "contact",
    iconPath: "/images/header/phone.svg",
    iconComponent: PhoneOutlineIcon,
  },
  {
    href: "#faqs",
    label: "FAQ",
    labelKey: "faq",
    iconPath: "/images/header/question-mask.svg",
    iconComponent: QuestionOutlineIcon,
  },
];
