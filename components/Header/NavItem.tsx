"use client";
import Link from "next/link";
import { ibmPlexMono } from "@/app/fonts";
import Image from "next/image";

export const NavItem = ({
  href,
  label,
  iconPath,
}: {
  href: string;
  label: string;
  iconPath: string;
}) => {
  return (
    <li className="cursor-pointer">
      <Link
        href={href}
        className={`${ibmPlexMono.className} text-xs font-medium cursor-pointer`}
      >
        <div className="group relative flex items-center px-4 h-11 rounded-lg  cursor-pointer top-nav-item hover:gap-1 leading-[120%] tracking-normal">
          <Image
            src={iconPath}
            alt="Proxy illustration"
            width={20}
            height={20}
            className="top-nav-item-icon group-hover:inline"
          />
          <p className="group-hover:pr-4">{label}</p>
        </div>
      </Link>
    </li>
  );
};
