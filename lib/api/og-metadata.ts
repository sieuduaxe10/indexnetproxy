import { cache } from "react";
import { headers } from "next/headers";

export interface OgMetadata {
  title?: string;
  description?: string;
  image?: string;
  business_name?: string;
}

/**
 * Derives the Origin header from available request headers.
 * Browsers don't send Origin on GET requests, so we construct it from:
 * - x-forwarded-host (set by reverse proxy) or host header
 * - x-forwarded-proto (defaults to https)
 *
 * Wrapped with React cache() to deduplicate within a single request.
 */
export const getDerivedOrigin = cache(async function getDerivedOrigin(): Promise<string> {
  const headersList = await headers();

  const host = headersList.get("host");
  const xForwardedHost = headersList.get("x-forwarded-host");
  const xForwardedProto = headersList.get("x-forwarded-proto") || "https";

  // Prefer x-forwarded-host (set by reverse proxy) over direct host
  const effectiveHost = xForwardedHost || host;

  if (!effectiveHost) {
    return "";
  }

  return `${xForwardedProto}://${effectiveHost}`;
});

export type LogoType = "logo" | "logo_icon" | "og_image";

/**
 * Fetches a logo URL from the API by following the redirect.
 * The API returns a 302 redirect to the actual R2 URL.
 * We fetch server-side with Origin header to ensure correct reseller detection.
 *
 * Wrapped with React cache() to deduplicate calls within a single request.
 * Multiple components calling fetchLogoUrl("logo") will only make one API call.
 */
export const fetchLogoUrl = cache(async function fetchLogoUrl(
  logoType: LogoType
): Promise<string | null> {
  try {
    const origin = await getDerivedOrigin();

    if (!origin) {
      return null;
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      return null;
    }

    const response = await fetch(`${apiBaseUrl}/public/logos/${logoType}`, {
      headers: {
        Origin: origin,
      },
      redirect: "manual", // Don't follow redirect, just get Location header
      next: { revalidate: 300 },
    });

    // API returns 302 redirect with Location header
    if (response.status === 302 || response.status === 301) {
      return response.headers.get("Location");
    }

    // If response is OK (200), it might be the actual image URL in body
    // But typically we expect a redirect
    return null;
  } catch (error) {
    console.error(`[Logo] Failed to fetch ${logoType}:`, error);
    return null;
  }
});

/**
 * Fetches OG metadata from the API for reseller detection.
 * Returns null for main site or on error (graceful degradation).
 *
 * Wrapped with React cache() to deduplicate within a single request.
 */
export const fetchOgMetadata = cache(async function fetchOgMetadata(): Promise<OgMetadata | null> {
  try {
    const origin = await getDerivedOrigin();

    if (!origin) {
      return null;
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      return null;
    }

    const response = await fetch(`${apiBaseUrl}/public/og-metadata`, {
      headers: {
        Origin: origin,
      },
      // Cache for 5 minutes - reseller metadata doesn't change frequently
      next: { revalidate: 300 },
    });

    // API returns null (empty body or null) for main site
    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // API returns null if main site or no metadata found
    if (!data) {
      return null;
    }

    return data as OgMetadata;
  } catch (error) {
    // Graceful degradation - log error but don't break the page
    console.error("[OG Metadata] Failed to fetch:", error);
    return null;
  }
});
