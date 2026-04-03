export const runtime = "edge";

import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  postBySlugQuery,
  relatedPostsQuery,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PostHeader } from "@/components/Blog/PostHeader";
import { PortableTextRenderer } from "@/components/Blog/PortableTextRenderer";
import { RelatedPosts } from "@/components/Blog/RelatedPosts";
import { JsonLd } from "@/components/Blog/JsonLd";
import type { Post } from "@/components/Blog/types";
import { Link } from "@/i18n/routing";

const getPostBySlug = cache((slug: string) =>
  sanityFetch<Post | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: [`post:${slug}`, "post"],
  })
);


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Not Found" };

  const imageUrl = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.featuredImage
      ? urlFor(post.featuredImage).width(1200).height(630).url()
      : undefined;

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: imageUrl ? [imageUrl] : undefined,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const categoryIds =
    post.categories?.map((cat) => cat._id) || [];
  const relatedPosts =
    categoryIds.length > 0
      ? await sanityFetch<Post[]>({
          query: relatedPostsQuery,
          params: { currentId: post._id, categoryIds },
          tags: ["post"],
        })
      : [];

  return (
    <article>
      <JsonLd post={post} />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors font-ibm-plex-mono mb-6"
      >
        ← {t("backToBlog")}
      </Link>

      <PostHeader post={post} />

      {post.body && (
        <div className="mt-8">
          <PortableTextRenderer value={post.body} />
        </div>
      )}

      <RelatedPosts posts={relatedPosts} title={t("relatedPosts")} />
    </article>
  );
}
