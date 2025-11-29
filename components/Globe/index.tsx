"use client";
import { useState, useRef, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";
import { useClickOutside } from "@/hooks/useClickOutside";
import { GlobeIcon } from "./GlobeIcon";
import { locales } from "@/common/constant";
import { ibmPlexMono } from "@/app/fonts";
import { usePathname, useRouter } from "@/i18n/routing";

const Globe = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const { isMobile, isTablet } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);

  useClickOutside(dropdownRef, () => setMenuOpen(false));

  useEffect(() => {}, [isMobile, isTablet]);

  const handleChangeLanguage = (code: string) => {
    if (isPending) return;
    const nextLocale = code;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      {...(!(isMobile || isTablet) && {
        onMouseEnter: () => setMenuOpen(true),
        onMouseLeave: () => setMenuOpen(false),
      })}
    >
      <GlobeIcon
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

            <ul className="flex max-w-[183px] flex-col flex-nowrap items-center justify-center gap-y-2 rounded-[10px] bg-background p-3 shadow-[0_10px_20px_0_rgba(0,0,0,0.05)]">
              {locales.map(({ code, name, subLabel }) => (
                <li
                  key={code}
                  className="cursor-pointer will-change-auto  w-full whitespace-pre flex h-[22px] items-center justify-center rounded-xl hover:bg-[#fdf4e4] px-4 transition-colors"
                  onClick={() => handleChangeLanguage(code)}
                >
                  <span
                    className={`${ibmPlexMono.className} uppercase text-[12px] font-medium leading-[14.4px] text-[#2b303b] duration-150 hover:text-primary transition-colors`}
                  >
                    {name} {subLabel && `(${subLabel})`}
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
