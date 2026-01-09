import type { Metadata } from "next";
import { fetchBranding } from "@/lib/api/branding";
import {
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_ICONS,
} from "./defaults";

interface LocaleMetadata {
  title?: string;
  description?: string;
}

/**
 * Generates metadata with reseller override support.
 * Fetches branding from the API which includes logos and og metadata.
 */
export async function generateDynamicMetadata(
  localeMetadata?: LocaleMetadata
): Promise<Metadata> {
  const branding = await fetchBranding();

  const title =
    branding?.ogMetadata?.title || localeMetadata?.title || DEFAULT_TITLE;
  const description =
    branding?.ogMetadata?.description ||
    localeMetadata?.description ||
    DEFAULT_DESCRIPTION;

  return {
    title,
    description,

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
      images: branding?.ogMetadata?.imageUrl
        ? [
            {
              url: branding.ogMetadata.imageUrl,
              width: 1200,
              height: 630,
              alt: branding.businessName || "",
            },
          ]
        : branding?.ogImageUrl
          ? [{ url: branding.ogImageUrl, width: 1200, height: 630, alt: "" }]
          : [DEFAULT_OG_IMAGE],
      ...(branding?.businessName && { siteName: branding.businessName }),
    },
  };
}
