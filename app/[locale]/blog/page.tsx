import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { listPosts, POSTS_PER_PAGE } from "@/lib/api/blog";
import { BlogList } from "@/components/Blog/BlogList";
import { BlogPagination } from "@/components/Blog/BlogPagination";
import { buildAlternates, SITE_URL } from "@/lib/metadata/alternates";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { page } = await searchParams;
  const t = await getTranslations({ locale, namespace: "blog" });

  const currentPage = Math.max(1, Number(page) || 1);
  const base = buildAlternates("/blog", locale);
  const canonical =
    currentPage > 1 ? `${base.canonical}?page=${currentPage}` : base.canonical;

  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    alternates: { ...base, canonical },
    openGraph: {
      title: t("seoTitle"),
      description: t("seoDescription"),
      url: canonical,
      siteName: "NetProxy.io",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("seoTitle"),
      description: t("seoDescription"),
    },
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page } = await searchParams;
  const t = await getTranslations({ locale, namespace: "blog" });

  const currentPage = Math.max(1, Number(page) || 1);
  const { items, total } = await listPosts(locale, currentPage);
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: t("heroTitle"),
    description: t("seoDescription"),
    url: `${SITE_URL}/${locale}/blog`,
    publisher: {
      "@type": "Organization",
      name: "NetProxy.io",
      url: SITE_URL,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mb-10">
        <h1 className="font-extrabold text-33 4xl:text-40 text-foreground mb-3">
          {t("heroTitle")}
        </h1>
        <p className="text-15 leading-[180%] text-muted-foreground max-w-[640px]">
          {t("heroDescription")}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {[
            t("topicProxy"),
            t("topicSecurity"),
            t("topicScraping"),
            t("topicMMO"),
          ].map((topic) => (
            <span
              key={topic}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#f0f5f5] text-muted-foreground"
            >
              {topic}
            </span>
          ))}
        </div>
      </section>

      {items.length > 0 && (
        <h2 className="font-bold text-18 text-foreground mb-5">
          {t("latestPosts")}
        </h2>
      )}

      {items.length > 0 ? (
        <>
          <BlogList posts={items} />
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
          />
        </>
      ) : (
        <p className="text-center text-muted-foreground py-20">
          {t("noPosts")}
        </p>
      )}
    </div>
  );
}
