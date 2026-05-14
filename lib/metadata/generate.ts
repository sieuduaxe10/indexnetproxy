import type { Metadata } from "next";
import { fetchBranding } from "@/lib/api/branding";
import { buildAlternates } from "./alternates";
import { getCurrentSiteUrl } from "./site-url";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_ICONS } from "./defaults";

interface LocaleMetadata {
  title?: string;
  description?: string;
}

interface GenerateOptions {
  /** Locale-agnostic path, e.g. "", "/blog". Used for canonical + hreflang alternates. */
  path?: string;
  /** Current request locale (required when path is provided to emit canonical URL). */
  locale?: string;
}

/**
 * Generates metadata with reseller override support.
 * Falls back to /og-default.png (static asset) when reseller has not uploaded
 * an OG image. The static fallback is served from the same host as the page,
 * so reseller storefronts host their own copy automatically.
 */
export async function generateDynamicMetadata(
  localeMetadata?: LocaleMetadata,
  options: GenerateOptions = {}
): Promise<Metadata> {
  const [branding, siteUrl] = await Promise.all([
    fetchBranding(),
    getCurrentSiteUrl(),
  ]);

  const title =
    branding?.ogMetadata?.title || localeMetadata?.title || DEFAULT_TITLE;
  const description =
    branding?.ogMetadata?.description ||
    localeMetadata?.description ||
    DEFAULT_DESCRIPTION;

  const brandingImage =
    branding?.ogMetadata?.imageUrl ||
    branding?.ogImageUrl ||
    `${siteUrl}/og-default.png`;

  const alternates =
    options.path !== undefined && options.locale
      ? {
          ...(await buildAlternates(options.path, options.locale)),
          types: { "application/rss+xml": `${siteUrl}/api/rss` },
        }
      : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    ...(alternates && { alternates }),

    icons: branding?.iconLightUrl
      ? {
          icon: branding.iconLightUrl,
          shortcut: branding.iconLightUrl,
          apple: branding.iconLightUrl,
        }
      : DEFAULT_ICONS,

    openGraph: {
      title,
      description,
      type: "website",
      ...(alternates && { url: alternates.canonical }),
      ...(branding?.businessName && { siteName: branding.businessName }),
      images: [
        {
          url: brandingImage,
          width: 1200,
          height: 630,
          alt: branding?.businessName || title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: brandingImage, alt: branding?.businessName || title }],
    },
  };
}
