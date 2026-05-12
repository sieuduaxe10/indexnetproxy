import { cache } from "react";
import { headers } from "next/headers";

/**
 * Derives the request domain from server headers. Returns "" if called during
 * static generation (no request context) or if no host header is present.
 *
 * Used to scope per-reseller API calls. Mirrors the pattern in branding.ts and
 * netproxy-console-v3's branding.store.ts (which uses window.location.hostname).
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
