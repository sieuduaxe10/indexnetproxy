import type { Metadata } from "next";
import { fetchOgMetadata, fetchLogoUrl } from "@/lib/api/og-metadata";
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
 *
 * Priority per field:
 * 1. Reseller API value (if exists)
 * 2. Logo URL from API (fetched server-side with Origin header)
 * 3. Locale-specific metadata (title/description)
 * 4. Hardcoded default
 * 5. Omit entirely (if no default exists)
 */
export async function generateDynamicMetadata(
  localeMetadata?: LocaleMetadata
): Promise<Metadata> {
  // Fetch all data in parallel for better performance
  const [reseller, logoIconUrl, ogImageUrl] = await Promise.all([
    fetchOgMetadata(),
    fetchLogoUrl("logo_icon"),
    fetchLogoUrl("og_image"),
  ]);

  // Resolve each field with fallback chain
  const title = reseller?.title || localeMetadata?.title || DEFAULT_TITLE;
  const description =
    reseller?.description || localeMetadata?.description || DEFAULT_DESCRIPTION;

  return {
    title,
    description,

    // Icons: use fetched R2 URL if available, otherwise default
    icons: logoIconUrl
      ? { icon: logoIconUrl, shortcut: logoIconUrl, apple: logoIconUrl }
      : DEFAULT_ICONS,

    openGraph: {
      title,
      description,
      // OG image: prefer reseller.image from og-metadata, then fetched R2 URL, then default
      images: reseller?.image
        ? [
            {
              url: reseller.image,
              width: 1200,
              height: 630,
              alt: reseller.business_name || "",
            },
          ]
        : ogImageUrl
          ? [{ url: ogImageUrl, width: 1200, height: 630, alt: "" }]
          : [DEFAULT_OG_IMAGE],
      // Only include siteName if reseller has business_name
      ...(reseller?.business_name && { siteName: reseller.business_name }),
    },
  };
}
