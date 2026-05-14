import { cache } from "react";
import { headers } from "next/headers";

interface LogoURLs {
  original: string;
  variants?: Record<string, string>;
}

interface LogosResponse {
  logo_light?: LogoURLs;
  logo_dark?: LogoURLs;
  icon_light?: LogoURLs;
  icon_dark?: LogoURLs;
  og_image?: LogoURLs;
}

interface OgMetadataResponse {
  title: string;
  description: string;
  image_url: string;
}

interface BrandingResponse {
  business_name: string;
  storefront_url?: string;
  logos?: LogosResponse;
  og_metadata?: OgMetadataResponse;
  blog_enabled?: boolean;
  is_platform?: boolean;
}

export interface Branding {
  businessName: string;
  storefrontUrl: string | null;
  logoLightUrl: string | null;
  logoDarkUrl: string | null;
  iconLightUrl: string | null;
  iconDarkUrl: string | null;
  ogImageUrl: string | null;
  blogEnabled: boolean;
  /**
   * TRUE when the request resolves to the platform's main site
   * (config.IsMainSiteDomain on backend). FALSE for any reseller domain.
   * Gates platform-only routes like /reseller-program.
   */
  isPlatform: boolean;
  ogMetadata: {
    title: string;
    description: string;
    imageUrl: string;
  } | null;
}

/**
 * Derives the domain from the incoming request. One deploy serves every
 * reseller domain — each request's Host (or X-Forwarded-Host) tells us which
 * reseller's branding to fetch.
 *
 * Returns "" during static generation (no request scope) so callers fall back
 * to default branding without throwing.
 */
export const getDerivedDomain = cache(async function getDerivedDomain(): Promise<string> {
  try {
    const headersList = await headers();
    const host = headersList.get("host");
    const xForwardedHost = headersList.get("x-forwarded-host");
    const effectiveHost = xForwardedHost || host;
    if (!effectiveHost) return "";
    return effectiveHost.split(":")[0];
  } catch {
    // headers() throws during static prerender. Falling back to "" lets the
    // backend serve main-site branding for prerendered output.
    return "";
  }
});

function getPreferredLogoUrl(logoUrls: LogoURLs | undefined): string | null {
  if (!logoUrls) return null;
  if (logoUrls.variants && Object.keys(logoUrls.variants).length > 0) {
    const firstVariant = Object.values(logoUrls.variants)[0];
    if (firstVariant) return firstVariant;
  }
  return logoUrls.original || null;
}

/**
 * Fetch branding for the current request's domain at runtime.
 *
 * Why runtime (not build-time): netproxy-index is multi-tenant — every
 * reseller's domain CNAMEs to the same Worker, and the response must match
 * the request's domain. A single static bundle cannot cover N domains.
 *
 * Cache hint: `next.revalidate=300` lets Next/CF cache the same (URL → JSON)
 * response across requests for 5 minutes. The cache key includes the `domain`
 * query param so each reseller has its own bucket. `tags: ["branding"]` lets
 * us invalidate cheaply when an admin updates branding (future webhook).
 *
 * React `cache()` deduplicates within a single request (layout + page +
 * footer all call fetchBranding() → 1 HTTP call).
 */
export const fetchBranding = cache(async function fetchBranding(): Promise<Branding | null> {
  try {
    const domain = await getDerivedDomain();
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) return null;

    const url = new URL(`${apiBaseUrl}/public/branding`);
    if (domain) url.searchParams.set("domain", domain);

    const response = await fetch(url.toString(), {
      next: { revalidate: 300, tags: ["branding"] },
    });

    if (!response.ok) {
      if (response.status !== 404) {
        console.error("[Branding]", response.status, url.toString());
      }
      return null;
    }

    const data: BrandingResponse = await response.json();
    return {
      businessName: data.business_name || "",
      storefrontUrl: data.storefront_url || null,
      logoLightUrl: getPreferredLogoUrl(data.logos?.logo_light),
      logoDarkUrl: getPreferredLogoUrl(data.logos?.logo_dark),
      iconLightUrl: getPreferredLogoUrl(data.logos?.icon_light),
      iconDarkUrl: getPreferredLogoUrl(data.logos?.icon_dark),
      ogImageUrl: getPreferredLogoUrl(data.logos?.og_image),
      isPlatform: !!data.is_platform,
      blogEnabled: !!data.blog_enabled,
      ogMetadata: data.og_metadata
        ? {
            title: data.og_metadata.title,
            description: data.og_metadata.description,
            imageUrl: data.og_metadata.image_url,
          }
        : null,
    };
  } catch (error) {
    console.error("[Branding] fetch failed:", error);
    return null;
  }
});
