import { DollarOutlineIcon } from "../icons/DollarOutlineIcon";
import { GlobeOutlineIcon } from "../icons/GlobeOutlineIcon";
import { HomeOutlineIcon } from "../icons/HomeOutlineIcon";
import { InfoOutlineIcon } from "../icons/InfoOutlineIcon";
import { PhoneOutlineIcon } from "../icons/PhoneOutlineIcon";
import { QuestionOutlineIcon } from "../icons/QuestionOutlineIcon";

export type NavItem = {
  href: string;
  label: string;
  iconPath: string;
  iconComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const navLink: NavItem[] = [
  {
    href: "#hero",
    label: "HOME",
    iconPath: "/images/header/home.svg",
    iconComponent: HomeOutlineIcon,
  },
  {
    href: "#pricing",
    label: "PRICING",
    iconPath: "/images/header/dollar.svg",
    iconComponent: DollarOutlineIcon,
  },
  {
    href: "#case-study",
    label: "CASE STUDY",
    iconPath: "/images/header/info.svg",
    iconComponent: InfoOutlineIcon,
  },
  {
    href: "#country",
    label: "COUNTRY",
    iconPath: "/images/header/globe-item.svg",
    iconComponent: GlobeOutlineIcon,
  },
  {
    href: "#contact",
    label: "CONTACT",
    iconPath: "/images/header/phone.svg",
    iconComponent: PhoneOutlineIcon,
  },
  {
    href: "#faqs",
    label: "FAQ",
    iconPath: "/images/header/question-mask.svg",
    iconComponent: QuestionOutlineIcon,
  },
];
