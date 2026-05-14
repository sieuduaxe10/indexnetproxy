import type { MetadataRoute } from "next";
import { fetchBranding } from "@/lib/api/branding";

// OpenNext Workers serves the whole app on edge by default — no need to set
// runtime here (and setting it can conflict with metadata-route handling).
export const dynamic = "force-dynamic";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const branding = await fetchBranding();
  const name = branding?.businessName
    ? `${branding.businessName} — Residential P2P Proxies`
    : "NetProxy.io — Residential P2P Proxies";
  const shortName = branding?.businessName || "NetProxy";
  const description =
    branding?.ogMetadata?.description ||
    "Secure, high-performance residential P2P proxies with 62M+ IPs across 220+ countries.";
  const iconSrc = branding?.iconLightUrl || "/images/favicon.png";

  return {
    name,
    short_name: shortName,
    description,
    start_url: "/",
    display: "browser",
    background_color: "#0a0a0a",
    theme_color: "#fc833d",
    icons: [
      {
        src: iconSrc,
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
