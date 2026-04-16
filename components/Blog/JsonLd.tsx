import type { Post } from "./types";
import { urlFor } from "@/sanity/lib/image";
import { SITE_URL } from "@/lib/metadata/alternates";

export function JsonLd({ post, locale }: { post: Post; locale: string }) {
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).height(630).url()
    : undefined;

  const url = `${SITE_URL}/${locale}/blog/${post.slug.current}`;
  const articleSection = post.categories?.map((c) => c.title).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    ...(imageUrl && { image: imageUrl }),
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    inLanguage: locale,
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
    ...(articleSection && articleSection.length > 0 && { articleSection }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
