import { SITE_URL } from "@/lib/metadata/alternates";
import type { PostDetail } from "./types";

export function JsonLd({ post, locale }: { post: PostDetail; locale: string }) {
  const url = `${SITE_URL}/${locale}/blog/${post.slug}`;

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
      name: "NetProxy.io",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "NetProxy.io",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo/Logo.webp`,
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
