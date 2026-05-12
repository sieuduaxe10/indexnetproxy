import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/api/blog";
import { LOCALE_CODES, SITE_URL, toHreflang } from "@/lib/metadata/alternates";

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

  // Fetch blog entries per locale — backend filters by language_code so each
  // locale only emits posts that actually exist for it.
  const localePostEntries = await Promise.all(
    LOCALE_CODES.map(async (locale) => {
      const posts = await getSitemapEntries(locale);
      return posts.map((post) => {
        const path = `/blog/${post.slug}`;
        return {
          url: `${SITE_URL}/${locale}${path}`,
          lastModified: new Date(post.updated_at),
          changeFrequency: "weekly" as const,
          priority: 0.8,
          alternates: { languages: buildLanguages(path) },
        };
      });
    })
  );

  return [...staticEntries, ...localePostEntries.flat()];
}
