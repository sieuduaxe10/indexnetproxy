import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [
    "en",
    "vi",
    "zh",
    "hi",
    "es",
    "ar",
    "fr",
    "pt",
    "ru",
    "bn",
    "id",
    "ja",
    "th",
    "ko",
    "tr",
    "ph",
    "br",
    "fa",
  ],

  // Used when no locale matches
  defaultLocale: "en",

  // Automatically detect user's locale
  localeDetection: true,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
