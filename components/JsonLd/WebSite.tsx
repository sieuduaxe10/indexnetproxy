import { fetchBranding } from "@/lib/api/branding";
import { getCurrentSiteUrl } from "@/lib/metadata/site-url";

export async function WebSiteJsonLd() {
  const [branding, siteUrl] = await Promise.all([
    fetchBranding(),
    getCurrentSiteUrl(),
  ]);
  const name = branding?.businessName || "NetProxy.io";

  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name,
    url: siteUrl,
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
    inLanguage: [
      "en",
      "vi",
      "zh-CN",
      "hi",
      "ar",
      "ru",
      "bn",
      "id",
      "th",
      "tr",
      "fil",
      "pt-BR",
      "fa",
      "es",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
