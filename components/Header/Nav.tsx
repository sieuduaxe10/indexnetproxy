import { navLink } from "./navLink";
import { NavItem } from "./NavItem";

export const Nav = () => {
  return (
    <ul className="flex items-center text-sm tracking-wide text-black/80">
      {navLink.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          label={item.label}
          iconPath={item.iconPath}
        />
      ))}
    </ul>
  );
};
