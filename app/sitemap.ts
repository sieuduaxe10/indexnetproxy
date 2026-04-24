import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  postsSitemapQuery,
  categoriesSitemapQuery,
} from "@/sanity/lib/queries";
import { LOCALE_CODES, SITE_URL, toHreflang } from "@/lib/metadata/alternates";

type PostSitemap = {
  slug: { current: string };
  publishedAt: string;
  _updatedAt: string;
};

type CategorySitemap = {
  slug: { current: string };
  _updatedAt: string;
};

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

  const [posts, categories] = await Promise.all([
    sanityFetch<PostSitemap[]>({
      query: postsSitemapQuery,
      tags: ["sitemap"],
    }),
    sanityFetch<CategorySitemap[]>({
      query: categoriesSitemapQuery,
      tags: ["sitemap"],
    }),
  ]);

  const postEntries = LOCALE_CODES.flatMap((locale) =>
    posts.map((post) => {
      const path = `/blog/${post.slug.current}`;
      return {
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(post._updatedAt || post.publishedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: { languages: buildLanguages(path) },
      };
    })
  );

  const categoryEntries = LOCALE_CODES.flatMap((locale) =>
    categories.map((cat) => {
      const path = `/blog/category/${cat.slug.current}`;
      return {
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(cat._updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.6,
        alternates: { languages: buildLanguages(path) },
      };
    })
  );

  return [...staticEntries, ...postEntries, ...categoryEntries];
}
