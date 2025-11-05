"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Hamburger } from "./Hamburger";
import { HomeIcon } from "../icons/HomeIcon";

const HamburgerMenu = (props: React.ComponentProps<"div">) => {
  const { isMobile, isTablet } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setMenuOpen(false));

  useEffect(() => {
    console.log({ isMobile, isTablet });
  }, [isMobile, isTablet]);

  return (
    <div
      {...props}
      className="relative"
      ref={dropdownRef}
      {...(!(isMobile || isTablet) && {
        onMouseEnter: () => setMenuOpen(true),
        onMouseLeave: () => setMenuOpen(false),
      })}
    >
      <Hamburger
        onClick={() => (isMobile || isTablet) && setMenuOpen((prev) => !prev)}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 mt-6 left-1/2 z-103 -translate-x-1/2 pt-3"
          >
            <div className="h-2" />

            <ul>
              <li className="flex items-center">
                <HomeIcon
                  width={20}
                  height={20}
                  className="text-[#1f1f1f] fill-[#1f1f1f]! bg-background"
                  style={{ color: "white" }}
                />
                <span>Home</span>
              </li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
