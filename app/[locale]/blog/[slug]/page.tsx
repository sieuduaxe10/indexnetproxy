import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  postBySlugQuery,
  postSlugsQuery,
  relatedPostsQuery,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PostHeader } from "@/components/Blog/PostHeader";
import { PortableTextRenderer } from "@/components/Blog/PortableTextRenderer";
import { RelatedPosts } from "@/components/Blog/RelatedPosts";
import { JsonLd } from "@/components/Blog/JsonLd";
import { BreadcrumbJsonLd } from "@/components/JsonLd/Breadcrumb";
import type { Post } from "@/components/Blog/types";
import { Link } from "@/i18n/routing";
import { buildAlternates } from "@/lib/metadata/alternates";

const getPostBySlug = cache((slug: string) =>
  sanityFetch<Post | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: [`post:${slug}`, "post"],
  })
);

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await sanityFetch<{ slug: { current: string } }[]>({
    query: postSlugsQuery,
    tags: ["post"],
  });
  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Not Found" };

  const imageUrl = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.featuredImage
      ? urlFor(post.featuredImage).width(1200).height(630).url()
      : undefined;

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const alternates = buildAlternates(`/blog/${slug}`, locale);
  const images = imageUrl
    ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }]
    : undefined;

  return {
    title,
    description,
    alternates,
    ...(post.noIndex && { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt || post.publishedAt,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
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
      <JsonLd post={post} locale={locale} />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: t("title"), path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />

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
