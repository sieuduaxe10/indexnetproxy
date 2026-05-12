import { headers } from "next/headers";
import { getRssUrl } from "@/lib/api/blog";

export const runtime = "edge";
export const revalidate = 300;

// Returns the backend-rendered RSS XML directly. Domain is derived from the
// inbound request so each reseller storefront gets their own feed.
export async function GET() {
  const hdrs = await headers();
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host") || "";
  const domain = host.split(":")[0];

  // VI is the primary feed. Add ?lang param later if multi-feed needed.
  const upstream = getRssUrl("vi", domain);
  const res = await fetch(upstream, { next: { revalidate: 300 } });

  if (!res.ok) {
    return new Response("RSS feed unavailable", { status: 502 });
  }

  const body = await res.text();
  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
