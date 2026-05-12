import { cache } from "react";
import { headers } from "next/headers";
import { STATIC_BRANDING } from "@/lib/branding.generated";

export interface Branding {
  businessName: string;
  storefrontUrl: string | null;
  logoLightUrl: string | null;
  logoDarkUrl: string | null;
  iconLightUrl: string | null;
  iconDarkUrl: string | null;
  ogImageUrl: string | null;
  blogEnabled: boolean;
  ogMetadata: {
    title: string;
    description: string;
    imageUrl: string;
  } | null;
}

/**
 * Derives the domain from request headers. Used by blog fetchers that still
 * need per-request host (since blog data isn't embeddable — it changes daily).
 *
 * Returns "" during static generation (no request scope) so callers fall back
 * to NEXT_PUBLIC_DOMAIN or other build-time hints.
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
    return "";
  }
});

/**
 * Returns branding embedded at build time by scripts/fetch-branding.mjs.
 *
 * Each reseller deploys their own copy with NEXT_PUBLIC_DOMAIN pointing at
 * their domain → branding is fixed for the lifetime of that deploy. Embedding
 * it at build time means:
 *   - No per-request HTTP call to backend
 *   - No `force-dynamic` needed → CF Pages serves static HTML
 *   - SEO crawlers see the right branding in the HTML
 *
 * When the reseller updates branding (logo / OG / business name), the backend
 * triggers a CF Pages rebuild via deploy hook → new bundle within ~1 minute.
 */
export const fetchBranding = cache(async function fetchBranding(): Promise<Branding | null> {
  if (!STATIC_BRANDING.businessName && !STATIC_BRANDING.logoLightUrl) {
    return null; // never built (or fetched empty) — caller renders defaults
  }
  return {
    businessName: STATIC_BRANDING.businessName,
    storefrontUrl: STATIC_BRANDING.storefrontUrl,
    logoLightUrl: STATIC_BRANDING.logoLightUrl,
    logoDarkUrl: STATIC_BRANDING.logoDarkUrl,
    iconLightUrl: STATIC_BRANDING.iconLightUrl,
    iconDarkUrl: STATIC_BRANDING.iconDarkUrl,
    ogImageUrl: STATIC_BRANDING.ogImageUrl,
    blogEnabled: STATIC_BRANDING.blogEnabled,
    ogMetadata: STATIC_BRANDING.ogMetadata
      ? {
          title: STATIC_BRANDING.ogMetadata.title,
          description: STATIC_BRANDING.ogMetadata.description,
          imageUrl: STATIC_BRANDING.ogMetadata.imageUrl,
        }
      : null,
  };
});
