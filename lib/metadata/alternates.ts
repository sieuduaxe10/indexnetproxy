import { locales } from "@/common/constant";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://netproxy.io";

const LOCALE_CODES = locales.map((l) => l.code);

/**
 * Map next-intl locale codes to BCP-47 hreflang values.
 * - `br` → `pt-BR` (Portuguese, Brazil)
 * - `ph` → `fil` (Filipino)
 * - `zh` → `zh-CN` (Simplified Chinese)
 * Others map 1:1.
 */
const HREFLANG_MAP: Record<string, string> = {
  br: "pt-BR",
  ph: "fil",
  zh: "zh-CN",
};

export function toHreflang(locale: string): string {
  return HREFLANG_MAP[locale] ?? locale;
}

/**
 * Build canonical + alternates.languages for a given path.
 * `path` is the locale-agnostic path segment, e.g. "", "/blog", "/blog/foo".
 * Must start with "/" or be empty.
 */
export function buildAlternates(path: string, currentLocale: string) {
  const normalized = path === "" || path === "/" ? "" : path;
  const canonical = `${SITE_URL}/${currentLocale}${normalized}`;

  const languages: Record<string, string> = {};
  for (const code of LOCALE_CODES) {
    languages[toHreflang(code)] = `${SITE_URL}/${code}${normalized}`;
  }
  languages["x-default"] = `${SITE_URL}/en${normalized}`;

  return { canonical, languages };
}

export { LOCALE_CODES };
