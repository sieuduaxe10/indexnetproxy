#!/usr/bin/env node
// Fetch branding from backend ONCE at build time and write to lib/branding.generated.ts
// so the deployed bundle does not need a per-request HTTP call. Each reseller deploy
// embeds their own branding via build env NEXT_PUBLIC_DOMAIN.
//
// Usage:
//   NEXT_PUBLIC_API_BASE_URL=https://api.netproxy.io \
//   NEXT_PUBLIC_DOMAIN=zproxy.io \
//   node scripts/fetch-branding.mjs

import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "lib", "branding.generated.ts");

const EMPTY_BRANDING = {
  businessName: "",
  storefrontUrl: null,
  logoLightUrl: null,
  logoDarkUrl: null,
  iconLightUrl: null,
  iconDarkUrl: null,
  ogImageUrl: null,
  blogEnabled: false,
  ogMetadata: null,
};

function write(branding) {
  const banner = `// AUTO-GENERATED at build time by scripts/fetch-branding.mjs. DO NOT EDIT.\n\n`;
  const typeDecl = `export interface StaticBranding {
  businessName: string;
  storefrontUrl: string | null;
  logoLightUrl: string | null;
  logoDarkUrl: string | null;
  iconLightUrl: string | null;
  iconDarkUrl: string | null;
  ogImageUrl: string | null;
  blogEnabled: boolean;
  ogMetadata: { title: string; description: string; imageUrl: string } | null;
}\n\n`;
  const body = `export const STATIC_BRANDING: StaticBranding = ${JSON.stringify(branding, null, 2)};\n`;
  writeFileSync(OUT_PATH, banner + typeDecl + body, "utf8");
  console.log("[fetch-branding] wrote", OUT_PATH);
}

function getPreferredLogoUrl(logoUrls) {
  if (!logoUrls) return null;
  if (logoUrls.variants && Object.keys(logoUrls.variants).length > 0) {
    const firstVariant = Object.values(logoUrls.variants)[0];
    if (firstVariant) return firstVariant;
  }
  return logoUrls.original || null;
}

async function main() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "";

  if (!apiBaseUrl) {
    console.warn("[fetch-branding] NEXT_PUBLIC_API_BASE_URL not set — writing empty branding");
    write(EMPTY_BRANDING);
    return;
  }

  const url = new URL(`${apiBaseUrl}/public/branding`);
  if (domain) url.searchParams.set("domain", domain);

  console.log("[fetch-branding] GET", url.toString());

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      console.warn("[fetch-branding] backend returned", res.status, "— writing empty branding");
      write(EMPTY_BRANDING);
      return;
    }
    const data = await res.json();
    const branding = {
      businessName: data.business_name || "",
      storefrontUrl: data.storefront_url || null,
      logoLightUrl: getPreferredLogoUrl(data.logos?.logo_light),
      logoDarkUrl: getPreferredLogoUrl(data.logos?.logo_dark),
      iconLightUrl: getPreferredLogoUrl(data.logos?.icon_light),
      iconDarkUrl: getPreferredLogoUrl(data.logos?.icon_dark),
      ogImageUrl: getPreferredLogoUrl(data.logos?.og_image),
      blogEnabled: !!data.blog_enabled,
      ogMetadata: data.og_metadata
        ? {
            title: data.og_metadata.title,
            description: data.og_metadata.description,
            imageUrl: data.og_metadata.image_url,
          }
        : null,
    };
    write(branding);
  } catch (err) {
    console.warn("[fetch-branding] fetch failed:", err.message, "— writing empty branding");
    write(EMPTY_BRANDING);
  }
}

main();
