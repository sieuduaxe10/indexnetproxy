import type { MetadataRoute } from "next";
import { fetchBranding } from "@/lib/api/branding";
import { getSitemapAll } from "@/lib/api/blog";
import { LOCALE_CODES, toHreflang } from "@/lib/metadata/alternates";
import { getCurrentSiteUrl } from "@/lib/metadata/site-url";

export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use the request's actual host so each reseller's sitemap references the
  // domain Google will be crawling — not the build-time fallback.
  const [siteUrl, branding] = await Promise.all([
    getCurrentSiteUrl(),
    fetchBranding(),
  ]);
  // Reseller storefronts shouldn't advertise /reseller-program — it's a
  // platform-only page and returns 404 there.
  const isPlatform = branding?.isPlatform ?? false;

  const buildLanguages = (path: string): Record<string, string> => {
    const languages: Record<string, string> = {};
    for (const code of LOCALE_CODES) {
      languages[toHreflang(code)] = `${siteUrl}/${code}${path}`;
    }
    languages["x-default"] = `${siteUrl}/en${path}`;
    return languages;
  };

  const staticPages: { path: string; priority: number; changeFrequency: "monthly" | "weekly" }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/cookie-policy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/term-service", priority: 0.3, changeFrequency: "monthly" },
    { path: "/refund-service", priority: 0.3, changeFrequency: "monthly" },
    ...(isPlatform
      ? [{ path: "/reseller-program", priority: 0.7, changeFrequency: "monthly" as const }]
      : []),
  ];

  const staticEntries = LOCALE_CODES.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${siteUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: buildLanguages(page.path) },
    }))
  );

  // Single backend round-trip — returns every post with all translations.
  // We expand each into N per-locale URLs (one per existing translation) and
  // emit hreflang alternates pointing only at slugs that actually exist.
  const { posts } = await getSitemapAll();

  const blogEntries = posts.flatMap((post) => {
    const perPostLanguages: Record<string, string> = {};
    for (const t of post.translations) {
      perPostLanguages[toHreflang(t.language)] = `${siteUrl}/${t.language}/blog/${t.slug}`;
    }
    const enTranslation = post.translations.find((t) => t.language === "en");
    const defaultT = enTranslation ?? post.translations[0];
    if (defaultT) {
      perPostLanguages["x-default"] = `${siteUrl}/${defaultT.language}/blog/${defaultT.slug}`;
    }

    return post.translations.map((t) => ({
      url: `${siteUrl}/${t.language}/blog/${t.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: { languages: perPostLanguages },
    }));
  });

  return [...staticEntries, ...blogEntries];
}
