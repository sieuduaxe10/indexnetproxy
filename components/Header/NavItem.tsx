"use client";
import Link from "next/link";
import * as motion from "motion/react-client";
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
    <li className=" cursor-pointer">
      <Link
        href={href}
        className={`${ibmPlexMono.className} text-xs font-medium cursor-pointer`}
      >
        <motion.button
          initial={{ backgroundColor: "#fff" }}
          whileHover={{
            backgroundColor: "#fdf4e4",
            color: "#ff7a29",
            x: 10,
            zIndex: 1,
            transition: { type: "spring", stiffness: 400, damping: 25 },
          }}
          className="group relative flex items-center px-4 h-11 rounded-lg  cursor-pointer"
        >
          <Image
            src={iconPath}
            alt="Proxy illustration"
            width={20}
            height={20}
            className="hidden group-hover:inline"
          />
          {label}
        </motion.button>
      </Link>
    </li>
  );
};
