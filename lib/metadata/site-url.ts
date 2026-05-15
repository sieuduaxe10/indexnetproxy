import { cache } from "react";
import { headers } from "next/headers";

/**
 * Build-time fallback. Used during static prerender (when headers() throws)
 * and as a last-resort default if the request lacks Host/X-Forwarded-Host.
 *
 * Reseller deploys via CNAME should never hit this path at runtime — they're
 * served by getCurrentSiteUrl() reading the request's actual host.
 */
const FALLBACK_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://netproxy.io";

/**
 * Returns the public URL for the current request — the protocol + host the
 * end-user typed in their browser. Multi-tenant: one Worker deploy serves
 * every reseller's domain, so this varies per request.
 *
 * Cached within a single request so layout + page + JSON-LD share one
 * resolution.
 */
export const getCurrentSiteUrl = cache(async function getCurrentSiteUrl(): Promise<string> {
  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") || h.get("host");
    const proto = h.get("x-forwarded-proto") || "https";
    if (host) return `${proto}://${host}`;
  } catch {
    // headers() throws during static prerender / generateStaticParams.
  }
  return FALLBACK_SITE_URL;
});

export { FALLBACK_SITE_URL };
