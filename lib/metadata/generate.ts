import type { Metadata } from "next";
import { fetchBranding } from "@/lib/api/branding";
import { buildAlternates, SITE_URL } from "./alternates";
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
 * When no reseller branding is present, `openGraph.images` is intentionally
 * left unset so the Next.js file-based `opengraph-image.tsx` convention wins.
 */
export async function generateDynamicMetadata(
  localeMetadata?: LocaleMetadata,
  options: GenerateOptions = {}
): Promise<Metadata> {
  const branding = await fetchBranding();

  const title =
    branding?.ogMetadata?.title || localeMetadata?.title || DEFAULT_TITLE;
  const description =
    branding?.ogMetadata?.description ||
    localeMetadata?.description ||
    DEFAULT_DESCRIPTION;

  const brandingImage =
    branding?.ogMetadata?.imageUrl || branding?.ogImageUrl || null;

  const alternates =
    options.path !== undefined && options.locale
      ? {
          ...buildAlternates(options.path, options.locale),
          types: { "application/rss+xml": `${SITE_URL}/api/rss` },
        }
      : undefined;

  return {
    metadataBase: new URL(SITE_URL),
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
      ...(brandingImage && {
        images: [
          {
            url: brandingImage,
            width: 1200,
            height: 630,
            alt: branding?.businessName || title,
          },
        ],
      }),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(brandingImage && {
        images: [{ url: brandingImage, alt: branding?.businessName || title }],
      }),
    },
  };
}
