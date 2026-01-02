import { cache } from "react";
import { headers } from "next/headers";

interface LogoURLs {
  original: string;
  variants?: Record<string, string>;
}

interface LogosResponse {
  logo?: LogoURLs;
  logo_icon?: LogoURLs;
  og_image?: LogoURLs;
}

interface OgMetadataResponse {
  title: string;
  description: string;
  image_url: string;
}

interface BrandingResponse {
  business_name: string;
  logos?: LogosResponse;
  og_metadata?: OgMetadataResponse;
}

export interface Branding {
  businessName: string;
  logoUrl: string | null;
  logoIconUrl: string | null;
  ogImageUrl: string | null;
  ogMetadata: {
    title: string;
    description: string;
    imageUrl: string;
  } | null;
}

/**
 * Derives the domain from available request headers.
 * Uses x-forwarded-host (set by reverse proxy) or host header.
 *
 * Wrapped with React cache() to deduplicate within a single request.
 */
export const getDerivedDomain = cache(async function getDerivedDomain(): Promise<string> {
  const headersList = await headers();

  const host = headersList.get("host");
  const xForwardedHost = headersList.get("x-forwarded-host");

  // Prefer x-forwarded-host (set by reverse proxy) over direct host
  const effectiveHost = xForwardedHost || host;

  if (!effectiveHost) {
    return "";
  }

  // Remove port if present
  return effectiveHost.split(":")[0];
});

/**
 * Gets the preferred logo URL from LogoURLs.
 * Prefers the first variant if available, falls back to original.
 */
function getPreferredLogoUrl(logoUrls: LogoURLs | undefined): string | null {
  if (!logoUrls) return null;

  // If variants exist, use the first one (typically the optimized size)
  if (logoUrls.variants && Object.keys(logoUrls.variants).length > 0) {
    const firstVariant = Object.values(logoUrls.variants)[0];
    if (firstVariant) return firstVariant;
  }

  return logoUrls.original || null;
}

/**
 * Fetches branding (logos + og metadata) from the API.
 * Returns null on error (graceful degradation).
 *
 * Wrapped with React cache() to deduplicate within a single request.
 */
export const fetchBranding = cache(async function fetchBranding(): Promise<Branding | null> {
  try {
    const domain = await getDerivedDomain();
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      return null;
    }

    const url = new URL(`${apiBaseUrl}/public/branding`);
    if (domain) {
      url.searchParams.set("domain", domain);
    }

    const response = await fetch(url.toString(), {
      // Cache for 5 minutes - branding doesn't change frequently
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return null;
    }

    const data: BrandingResponse = await response.json();

    return {
      businessName: data.business_name || "",
      logoUrl: getPreferredLogoUrl(data.logos?.logo),
      logoIconUrl: getPreferredLogoUrl(data.logos?.logo_icon),
      ogImageUrl: getPreferredLogoUrl(data.logos?.og_image),
      ogMetadata: data.og_metadata
        ? {
            title: data.og_metadata.title,
            description: data.og_metadata.description,
            imageUrl: data.og_metadata.image_url,
          }
        : null,
    };
  } catch (error) {
    console.error("[Branding] Failed to fetch:", error);
    return null;
  }
});
