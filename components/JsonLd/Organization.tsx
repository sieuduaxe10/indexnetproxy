import { SITE_URL } from "@/lib/metadata/alternates";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: "NetProxy.io",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo/Logo.webp`,
      width: 512,
      height: 130,
    },
    description:
      "NetProxy.io provides residential P2P proxies with 62M+ IPs across 220+ countries for MMO, web scraping, ad verification, and market research.",
    foundingDate: "2023",
    sameAs: [
      "https://www.facebook.com/netproxy.io",
      "https://twitter.com/netproxy_io",
      "https://t.me/netproxy_io",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@netproxy.io",
      availableLanguage: ["en", "vi"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
