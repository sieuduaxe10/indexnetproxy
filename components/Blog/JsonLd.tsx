import type { Post } from "./types";
import { urlFor } from "@/sanity/lib/image";

export function JsonLd({ post }: { post: Post }) {
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).height(630).url()
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.publishedAt,
    publisher: {
      "@type": "Organization",
      name: "NetProxy.io",
      url: "https://netproxy.io",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
