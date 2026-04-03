import NextLink from "next/link";
import { Link as I18nLink } from "@/i18n/routing";
import { navLink } from "../Header/navLink";
import { ibmPlexMono } from "@/app/fonts";

export const HamburgerMenuItem = () => {
  return navLink.map((item) => {
    const isAnchor = item.href.startsWith("#");
    const LinkComponent = isAnchor ? NextLink : I18nLink;

    return (
      <li
        key={item.href}
        className="h-11 px-4 hover:bg-gray-light rounded-md flex justify-center"
      >
        <LinkComponent href={item.href} className="flex items-center gap-2">
          {item.iconComponent && (
            <item.iconComponent
              width={20}
              height={20}
              style={{ width: "20px", height: "20px" }}
            />
          )}
          <span
            className={`${ibmPlexMono.className} uppercase text-xs font-medium leading-[14.5px]`}
          >
            {item.label}
          </span>
        </LinkComponent>
      </li>
    );
  });
};
export default HamburgerMenuItem;
