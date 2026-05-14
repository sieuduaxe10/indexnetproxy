import { locales } from "@/common/constant";
import { getCurrentSiteUrl, FALLBACK_SITE_URL } from "./site-url";

/**
 * @deprecated Prefer `await getCurrentSiteUrl()` so canonical/hreflang point
 * at the request's actual host. Kept exported only for callers that cannot
 * await (e.g. callbacks emitting purely build-time URLs).
 */
export const SITE_URL = FALLBACK_SITE_URL;

const LOCALE_CODES = locales.map((l) => l.code);

const HREFLANG_MAP: Record<string, string> = {
  br: "pt-BR",
  ph: "fil",
  zh: "zh-CN",
};

export function toHreflang(locale: string): string {
  return HREFLANG_MAP[locale] ?? locale;
}

/**
 * Build canonical + hreflang alternates for a non-blog page (homepage,
 * /cookie-policy, etc.). Uses the request's host so canonical matches the
 * domain the user is actually on — critical for multi-tenant SEO.
 */
export async function buildAlternates(path: string, currentLocale: string) {
  const siteUrl = await getCurrentSiteUrl();
  const normalized = path === "" || path === "/" ? "" : path;
  const canonical = `${siteUrl}/${currentLocale}${normalized}`;

  const languages: Record<string, string> = {};
  for (const code of LOCALE_CODES) {
    languages[toHreflang(code)] = `${siteUrl}/${code}${normalized}`;
  }
  languages["x-default"] = `${siteUrl}/en${normalized}`;

  return { canonical, languages };
}

export { LOCALE_CODES };

/**
 * Build canonical + hreflang alternates for a blog post when slugs differ per
 * locale (Option B: SEO-optimized per-language slugs).
 *
 * Only emits alternates for locales the post actually exists in — we never
 * link to a 404. x-default points at English if available, else the first
 * translation.
 */
export async function buildAlternatesForBlogPost(
  currentLocale: string,
  slugByLocale: Record<string, string>,
): Promise<{ canonical: string; languages: Record<string, string> }> {
  const siteUrl = await getCurrentSiteUrl();
  const currentSlug = slugByLocale[currentLocale];
  const canonical = currentSlug
    ? `${siteUrl}/${currentLocale}/blog/${currentSlug}`
    : `${siteUrl}/${currentLocale}/blog`;

  const languages: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(slugByLocale)) {
    languages[toHreflang(locale)] = `${siteUrl}/${locale}/blog/${slug}`;
  }

  const defaultEntry = slugByLocale["en"]
    ? ["en", slugByLocale["en"]]
    : Object.entries(slugByLocale)[0];
  if (defaultEntry) {
    const [locale, slug] = defaultEntry;
    languages["x-default"] = `${siteUrl}/${locale}/blog/${slug}`;
  }

  return { canonical, languages };
}
