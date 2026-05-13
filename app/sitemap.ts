import type { MetadataRoute } from "next";
import { getSitemapAll } from "@/lib/api/blog";
import { LOCALE_CODES, SITE_URL, toHreflang } from "@/lib/metadata/alternates";

export const runtime = "edge";

function buildLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const code of LOCALE_CODES) {
    languages[toHreflang(code)] = `${SITE_URL}/${code}${path}`;
  }
  languages["x-default"] = `${SITE_URL}/en${path}`;
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: { path: string; priority: number; changeFrequency: "monthly" | "weekly" }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/cookie-policy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/term-service", priority: 0.3, changeFrequency: "monthly" },
    { path: "/refund-service", priority: 0.3, changeFrequency: "monthly" },
    { path: "/reseller-program", priority: 0.7, changeFrequency: "monthly" },
  ];

  const staticEntries = LOCALE_CODES.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${SITE_URL}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: buildLanguages(page.path) },
    }))
  );

  // Single backend round-trip — returns every post with all translations.
  // We expand each into N per-locale URLs (one per existing translation) and
  // emit hreflang alternates pointing only at slugs that actually exist.
  // This is correct for SEO under Option B (slugs differ per language).
  const { posts } = await getSitemapAll();

  const blogEntries = posts.flatMap((post) => {
    // Per-post hreflang map: only the locales this post is translated into.
    const perPostLanguages: Record<string, string> = {};
    for (const t of post.translations) {
      perPostLanguages[toHreflang(t.language)] = `${SITE_URL}/${t.language}/blog/${t.slug}`;
    }
    // x-default → English if available, else first translation.
    const enTranslation = post.translations.find((t) => t.language === "en");
    const defaultT = enTranslation ?? post.translations[0];
    if (defaultT) {
      perPostLanguages["x-default"] = `${SITE_URL}/${defaultT.language}/blog/${defaultT.slug}`;
    }

    return post.translations.map((t) => ({
      url: `${SITE_URL}/${t.language}/blog/${t.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: { languages: perPostLanguages },
    }));
  });

  return [...staticEntries, ...blogEntries];
}
