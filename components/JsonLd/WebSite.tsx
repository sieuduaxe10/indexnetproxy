import { SITE_URL } from "@/lib/metadata/alternates";

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: "NetProxy.io",
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}#organization`,
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
