"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";
import { useClickOutside } from "@/hooks/useClickOutside";
import { GlobeIcon } from "./GlobeIcon";
import { languages } from "@/common/constant";
import { ibmPlexMono } from "@/app/fonts";

const Globe = () => {
  const { isMobile, isTablet } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setMenuOpen(false));

  return (
    <div
      className="relative"
      ref={dropdownRef}
      {...(!(isMobile || isTablet) && {
        onMouseEnter: () => setMenuOpen(true),
        onMouseLeave: () => setMenuOpen(false),
      })}
    >
      <GlobeIcon />

      {/* Dropdown */}
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

            <ul className="flex max-w-[183px] flex-col flex-nowrap items-center justify-center gap-y-2 rounded-[10px] bg-white p-3 shadow-[0_10px_20px_0_rgba(0,0,0,0.05)]">
              {languages.map(({ code, label, subLabel }) => (
                <li
                  key={code}
                  className="will-change-auto  w-full whitespace-pre flex h-[22px] items-center justify-center rounded-xl hover:bg-[rgb(253,244,228)] px-4 transition-colors"
                >
                  <span
                    className={`${ibmPlexMono.className} uppercase text-[12px] font-medium leading-[14.4px] text-[rgb(43,48,59)] duration-150 hover:text-primary transition-colors`}
                  >
                    {label} {subLabel && `(${subLabel})`}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Globe;
