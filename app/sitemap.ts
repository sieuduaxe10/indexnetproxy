import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsSitemapQuery } from "@/sanity/lib/queries";

const BASE_URL = "https://netproxy.io";
const LOCALES = [
  "en",
  "vi",
  "zh",
  "hi",
  "ar",
  "ru",
  "bn",
  "id",
  "th",
  "tr",
  "ph",
  "br",
  "fa",
  "es",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/privacy-policy",
    "/cookie-policy",
    "/term-service",
    "/refund-service",
    "/blog",
  ];

  const staticEntries = LOCALES.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
    }))
  );

  const posts = await sanityFetch<
    { slug: { current: string }; publishedAt: string; _updatedAt: string }[]
  >({
    query: postsSitemapQuery,
    tags: ["sitemap"],
  });

  const postEntries = LOCALES.flatMap((locale) =>
    posts.map((post) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug.current}`,
      lastModified: new Date(post._updatedAt || post.publishedAt),
      changeFrequency: "weekly" as const,
    }))
  );

  return [...staticEntries, ...postEntries];
}
