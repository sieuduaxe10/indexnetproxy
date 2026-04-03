import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  postsQuery,
  postCountQuery,
  categoriesQuery,
} from "@/sanity/lib/queries";
import { BlogList } from "@/components/Blog/BlogList";
import { BlogPagination } from "@/components/Blog/BlogPagination";
import { CategoryFilter } from "@/components/Blog/CategoryFilter";
import type { Post, Category } from "@/components/Blog/types";

const POSTS_PER_PAGE = 12;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("description"),
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
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [posts, totalCount, categories] = await Promise.all([
    sanityFetch<Post[]>({
      query: postsQuery,
      params: { start, end },
      tags: ["post"],
    }),
    sanityFetch<number>({
      query: postCountQuery,
      tags: ["post"],
    }),
    sanityFetch<Category[]>({
      query: categoriesQuery,
      tags: ["category"],
    }),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <div>
      <h1 className="font-neue-kaine-bold text-33 4xl:text-40 text-foreground mb-2">
        {t("title")}
      </h1>
      <p className="text-15 text-muted-foreground mb-8">{t("description")}</p>

      {categories.length > 0 && (
        <div className="mb-8">
          <CategoryFilter categories={categories} allLabel={t("allCategories")} />
        </div>
      )}

      {posts.length > 0 ? (
        <>
          <BlogList posts={posts} />
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
          />
        </>
      ) : (
        <p className="text-center text-muted-foreground py-20">{t("noPosts")}</p>
      )}
    </div>
  );
}
