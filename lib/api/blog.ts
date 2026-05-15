import { cache } from "react";
import { getDerivedDomain } from "./_host";

export const POSTS_PER_PAGE = 12;

const apiBase = () => process.env.NEXT_PUBLIC_API_BASE_URL;

function buildUrl(path: string, params: Record<string, string | number | undefined>) {
  const base = apiBase();
  if (!base) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  const url = new URL(`${base}${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === "" || v === null) continue;
    url.searchParams.set(k, String(v));
  }
  return url.toString();
}

async function fetchJson<T>(url: string, revalidate = 60): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate, tags: ["blog"] } });
    if (!res.ok) {
      if (res.status !== 404) console.error("[blog]", res.status, url);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error("[blog] fetch failed", url, err);
    return null;
  }
}

export interface PublicPostListItem {
  slug: string;
  title: string;
  excerpt?: string;
  language: string;
  published_at: string;
  updated_at: string;
}

export interface TranslationReference {
  language: string;
  slug: string;
}

export interface PublicPostDetail {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body_markdown: string;
  meta_title?: string;
  meta_description?: string;
  language: string;
  source_language: string;
  published_at: string;
  updated_at: string;
  available_languages: TranslationReference[];
}

export interface ListPostsResponse {
  items: PublicPostListItem[];
  total: number;
  page: number;
  per_page: number;
}

export interface SitemapPost {
  post_id: string;
  updated_at: string;
  translations: TranslationReference[];
}

export interface SitemapAllResponse {
  posts: SitemapPost[];
}

export const listPosts = cache(async (lang: string, page = 1): Promise<ListPostsResponse> => {
  const domain = await getDerivedDomain();
  const url = buildUrl("/public/blog/posts", {
    lang,
    page,
    per_page: POSTS_PER_PAGE,
    domain: domain || undefined,
  });
  const data = await fetchJson<ListPostsResponse>(url);
  return data ?? { items: [], total: 0, page, per_page: POSTS_PER_PAGE };
});

export const getPostBySlug = cache(async (lang: string, slug: string): Promise<PublicPostDetail | null> => {
  const domain = await getDerivedDomain();
  const url = buildUrl(`/public/blog/posts/${encodeURIComponent(slug)}`, {
    lang,
    domain: domain || undefined,
  });
  return fetchJson<PublicPostDetail>(url, 300);
});

export const getRelatedPosts = cache(async (lang: string, slug: string, limit = 3): Promise<PublicPostListItem[]> => {
  const domain = await getDerivedDomain();
  const url = buildUrl(`/public/blog/related/${encodeURIComponent(slug)}`, {
    lang,
    limit,
    domain: domain || undefined,
  });
  const data = await fetchJson<{ items: PublicPostListItem[] }>(url, 300);
  return data?.items ?? [];
});

/**
 * Returns ALL posts for the resolved tenant with ALL their translations.
 * Frontend expands each entry into N per-locale URLs with hreflang alternates
 * for the sitemap. Single backend round-trip — no per-locale loop.
 */
export const getSitemapAll = cache(async (): Promise<SitemapAllResponse> => {
  const domain = await getDerivedDomain();
  const url = buildUrl("/public/blog/sitemap", {
    domain: domain || undefined,
  });
  const data = await fetchJson<SitemapAllResponse>(url, 3600);
  return data ?? { posts: [] };
});

export function getRssUrl(lang: string, domain: string) {
  return buildUrl("/public/blog/rss", { lang, domain: domain || undefined });
}
