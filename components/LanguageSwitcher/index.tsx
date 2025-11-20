"use client";

import { locales } from "@/common/constant";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useState, useTransition } from "react";

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = locales.find((l) => l.code === locale);

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
      setIsOpen(false);
    });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
        aria-label="Change language"
      >
        <span className="text-xl">{currentLocale?.flag}</span>
        <span className="text-sm font-medium">
          {currentLocale?.code.toUpperCase()}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg z-20 overflow-hidden">
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => onSelectChange(loc.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  locale === loc.code ? "bg-gray-50 dark:bg-gray-700/50" : ""
                }`}
              >
                <span className="text-2xl">{loc.flag}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {loc.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {loc.code.toUpperCase()}
                  </div>
                </div>
                {locale === loc.code && (
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
