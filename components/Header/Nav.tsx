"use client";
import { useTranslations } from "next-intl";
import { navLink } from "./navLink";
import { NavItem } from "./NavItem";

export const Nav = () => {
  const t = useTranslations("nav");

  return (
    <ul className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu z-1 flex flex-row justify-center items-center gap-0 w-min h-min p-0 overflow-visible text-sm tracking-wide text-black/80 top-nav-wrapper">
      {navLink.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          label={t(item.labelKey)}
          iconPath={item.iconPath}
        />
      ))}
    </ul>
  );
};
