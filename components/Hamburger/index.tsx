"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Hamburger } from "./Hamburger";
import HamburgerMenuItem from "./HamburgerMenuItem";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { useBranding } from "@/lib/branding/context";

const HamburgerMenu = (props: React.ComponentProps<"div">) => {
  const { isMobile, isTablet } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { storefrontUrl } = useBranding();

  useClickOutside(dropdownRef, () => setMenuOpen(false));

  useEffect(() => {}, [isMobile, isTablet]);

  return (
    <div
      {...props}
      ref={dropdownRef}
      {...(!(isMobile || isTablet) && {
        onMouseEnter: () => setMenuOpen(true),
        onMouseLeave: () => setMenuOpen(false),
      })}
    >
      <Hamburger
        menuOpen={menuOpen}
        onClick={() => (isMobile || isTablet) && setMenuOpen((prev) => !prev)}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bg-background w-screen top-0 mt-[73px] -left-5 4xl:left-[calc((-100vw+100%)/2)] z-10 flex flex-col p-4 border-b border-gray-light"
          >
            <div className="h-2" />

            <ul className="flex flex-col gap-2 w-full">
              <HamburgerMenuItem />
            </ul>
            {storefrontUrl && (
              <Button asChild className="h-9 flex mt-2 4xl:hidden">
                <Link href={storefrontUrl}>
                  GET STARTED
                  <Image
                    src="/images/hero/pointer.svg"
                    alt="Proxy illustration"
                    width={20}
                    height={20}
                  />
                </Link>
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
