import { getCurrentSiteUrl } from "@/lib/metadata/site-url";

export type BreadcrumbItem = { name: string; path: string };

export async function BreadcrumbJsonLd({
  locale,
  items,
}: {
  locale: string;
  items: BreadcrumbItem[];
}) {
  const siteUrl = await getCurrentSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}/${locale}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
