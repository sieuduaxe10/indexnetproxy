import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPostBySlug, getRelatedPosts } from "@/lib/api/blog";
import { PostHeader } from "@/components/Blog/PostHeader";
import { MarkdownRenderer } from "@/components/Blog/MarkdownRenderer";
import { RelatedPosts } from "@/components/Blog/RelatedPosts";
import { JsonLd } from "@/components/Blog/JsonLd";
import { BreadcrumbJsonLd } from "@/components/JsonLd/Breadcrumb";
import { BlogPostProvider } from "@/components/Blog/BlogPostContext";
import { Link } from "@/i18n/routing";
import { buildAlternatesForBlogPost } from "@/lib/metadata/alternates";

// All posts are dynamic — generated on demand from the backend, no
// generateStaticParams. Pages are cached via fetch revalidate (300s).
// OpenNext Workers serves the whole app on edge regardless, so runtime hint
// is unnecessary (and conflicts with the parent layout's generateStaticParams).
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) return { title: "Not Found" };

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;

  // Build slug map from translations the backend confirms exist — never link
  // to a 404. If for some reason available_languages is missing, fall back to
  // the current locale only.
  const slugByLocale = Object.fromEntries(
    (post.available_languages?.length
      ? post.available_languages
      : [{ language: locale, slug }]
    ).map((t) => [t.language, t.slug]),
  );
  const alternates = await buildAlternatesForBlogPost(locale, slugByLocale);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at || post.published_at,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  const related = await getRelatedPosts(locale, slug, 3);

  return (
    <BlogPostProvider availableLanguages={post.available_languages ?? []}>
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

        {post.body_markdown && (
          <div className="mt-8">
            <MarkdownRenderer>{post.body_markdown}</MarkdownRenderer>
          </div>
        )}

        <RelatedPosts posts={related} title={t("relatedPosts")} />
      </article>
    </BlogPostProvider>
  );
}
