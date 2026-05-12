import { SITE_URL, LOCALE_CODES } from "@/lib/metadata/alternates";

const INDEXNOW_KEY = process.env.INDEXNOW_API_KEY;

const INDEXNOW_ENDPOINTS = [
  "https://www.bing.com/indexnow",
  "https://api.indexnow.org/indexnow",
];

/**
 * Build all locale URLs for a given path.
 * e.g. path="/blog/my-post" → ["https://netproxy.io/en/blog/my-post", "https://netproxy.io/vi/blog/my-post", ...]
 */
function buildLocaleUrls(path: string): string[] {
  return LOCALE_CODES.map((locale) => `${SITE_URL}/${locale}${path}`);
}

/**
 * Submit URLs to IndexNow (Bing + shared endpoint covering Yandex, Seznam, Naver).
 * Non-blocking — logs errors but never throws.
 */
export async function submitToIndexNow(urls: string[]): Promise<void> {
  if (!INDEXNOW_KEY || urls.length === 0) return;

  const payload = {
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/api/indexnow`,
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

/**
 * Submit a blog post path to IndexNow across all locales.
 */
export async function submitPostToIndexNow(slug: string): Promise<void> {
  const urls = [
    ...buildLocaleUrls(`/blog/${slug}`),
    `${SITE_URL}/sitemap.xml`,
  ];
  await submitToIndexNow(urls);
}

/**
 * Submit a blog category path to IndexNow across all locales.
 */
export async function submitCategoryToIndexNow(slug: string): Promise<void> {
  const urls = buildLocaleUrls(`/blog/category/${slug}`);
  await submitToIndexNow(urls);
}
