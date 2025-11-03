"use client";
import Link from "next/link";
import * as motion from "motion/react-client";
import { ibmPlexMono } from "@/app/fonts";

export const NavItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <li className="">
      <Link
        href={href}
        className={`${ibmPlexMono.className} text-xs font-medium`}
      >
        <motion.button
          initial={{ backgroundColor: "#fff" }}
          whileHover={{
            backgroundColor: "#ff7f32",
            color: "#fff",
            x: 10,
            transition: { type: "spring", stiffness: 400, damping: 25 },
          }}
          className="flex items-center px-4 h-11"
        >
          {label}
        </motion.button>
      </Link>
    </li>
  );
};

//  <Image
//         src="/images/header/house.svg"
//         alt="Proxy illustration"
//         width={20}
//         height={20}
//         className=""
//       />
// not active
// <li className="flex items-center px-4 h-11">
//   <Link
//     href={href}
//     className={`${ibmPlexMono.className} text-xs font-medium`}
//   >

//     {label}
//   </Link>
// </li>
