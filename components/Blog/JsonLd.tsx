import { fetchBranding } from "@/lib/api/branding";
import { getCurrentSiteUrl } from "@/lib/metadata/site-url";
import type { PostDetail } from "./types";

export async function JsonLd({ post, locale }: { post: PostDetail; locale: string }) {
  const [branding, siteUrl] = await Promise.all([
    fetchBranding(),
    getCurrentSiteUrl(),
  ]);
  const name = branding?.businessName || "NetProxy.io";
  const logoUrl = branding?.logoLightUrl || `${siteUrl}/images/logo/Logo.webp`;
  const url = `${siteUrl}/${locale}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    inLanguage: post.language || locale,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
