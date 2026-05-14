import { fetchBranding } from "@/lib/api/branding";
import { getCurrentSiteUrl } from "@/lib/metadata/site-url";

// Reseller doesn't configure social links / contact yet — fall back to the
// NetProxy defaults so Google still has a complete Organization snippet.
// When reseller config grows (sameAs, support email) we'll pull those from
// branding too and let backend return null when unset.
const FALLBACK_SAME_AS = [
  "https://www.facebook.com/netproxy.io",
  "https://twitter.com/netproxy_io",
  "https://t.me/netproxy_io",
];

const FALLBACK_CONTACT_POINT = {
  "@type": "ContactPoint" as const,
  contactType: "customer support",
  email: "support@netproxy.io",
  availableLanguage: ["en", "vi"],
};

const FALLBACK_DESCRIPTION =
  "Residential P2P proxies with 62M+ IPs across 220+ countries for MMO, web scraping, ad verification, and market research.";

export async function OrganizationJsonLd() {
  const [branding, siteUrl] = await Promise.all([
    fetchBranding(),
    getCurrentSiteUrl(),
  ]);

  const name = branding?.businessName || "NetProxy.io";
  const logoUrl = branding?.logoLightUrl || `${siteUrl}/images/logo/Logo.webp`;
  const description = branding?.ogMetadata?.description || FALLBACK_DESCRIPTION;

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
    },
    description,
    foundingDate: "2023",
    sameAs: FALLBACK_SAME_AS,
    contactPoint: FALLBACK_CONTACT_POINT,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
