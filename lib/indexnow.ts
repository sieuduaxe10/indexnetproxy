import { LOCALE_CODES } from "@/lib/metadata/alternates";
import { getCurrentSiteUrl } from "@/lib/metadata/site-url";

const INDEXNOW_KEY = process.env.INDEXNOW_API_KEY;

const INDEXNOW_ENDPOINTS = [
  "https://www.bing.com/indexnow",
  "https://api.indexnow.org/indexnow",
];

function buildLocaleUrls(siteUrl: string, path: string): string[] {
  return LOCALE_CODES.map((locale) => `${siteUrl}/${locale}${path}`);
}

/**
 * Submit URLs to IndexNow (Bing + shared endpoint covering Yandex, Seznam, Naver).
 * Non-blocking — logs errors but never throws. Must be called from a request
 * scope so getCurrentSiteUrl() can resolve the right host.
 */
export async function submitToIndexNow(urls: string[]): Promise<void> {
  if (!INDEXNOW_KEY || urls.length === 0) return;
  const siteUrl = await getCurrentSiteUrl();

  const payload = {
    host: new URL(siteUrl).host,
    key: INDEXNOW_KEY,
    keyLocation: `${siteUrl}/api/indexnow`,
    urlList: urls,
  };

  await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map(async (endpoint) => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(payload),
        });
        console.log(
          `[IndexNow] ${endpoint} → ${res.status} (${urls.length} URLs)`
        );
      } catch (err) {
        console.error(`[IndexNow] ${endpoint} failed:`, err);
      }
    })
  );
}

export async function submitPostToIndexNow(slug: string): Promise<void> {
  const siteUrl = await getCurrentSiteUrl();
  const urls = [
    ...buildLocaleUrls(siteUrl, `/blog/${slug}`),
    `${siteUrl}/sitemap.xml`,
  ];
  await submitToIndexNow(urls);
}

export async function submitCategoryToIndexNow(slug: string): Promise<void> {
  const siteUrl = await getCurrentSiteUrl();
  const urls = buildLocaleUrls(siteUrl, `/blog/category/${slug}`);
  await submitToIndexNow(urls);
}
