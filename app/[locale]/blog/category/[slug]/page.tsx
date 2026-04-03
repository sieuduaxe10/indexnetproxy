export const runtime = "edge";

import { cache } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  postsByCategoryQuery,
  postCountByCategoryQuery,
  categoriesQuery,
} from "@/sanity/lib/queries";
import { BlogList } from "@/components/Blog/BlogList";
import { BlogPagination } from "@/components/Blog/BlogPagination";
import { CategoryFilter } from "@/components/Blog/CategoryFilter";
import type { Post, Category } from "@/components/Blog/types";

const POSTS_PER_PAGE = 12;

const getCategories = cache(() =>
  sanityFetch<Category[]>({
    query: categoriesQuery,
    tags: ["category"],
  })
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const categories = await getCategories();
  const category = categories.find((c) => c.slug.current === slug);

  return {
    title: category ? `${category.title} - ${t("title")}` : t("title"),
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale, slug } = await params;
  const { page } = await searchParams;
  const t = await getTranslations({ locale, namespace: "blog" });

  const currentPage = Math.max(1, Number(page) || 1);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [posts, totalCount, categories] = await Promise.all([
    sanityFetch<Post[]>({
      query: postsByCategoryQuery,
      params: { categorySlug: slug, start, end },
      tags: ["post", "category"],
    }),
    sanityFetch<number>({
      query: postCountByCategoryQuery,
      params: { categorySlug: slug },
      tags: ["post", "category"],
    }),
    getCategories(),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);
  const currentCategory = categories.find((c) => c.slug.current === slug);

  return (
    <div>
      <h1 className="font-neue-kaine-bold text-33 4xl:text-40 text-foreground mb-2">
        {currentCategory?.title || t("title")}
      </h1>
      <p className="text-15 text-muted-foreground mb-8">{t("description")}</p>

      <div className="mb-8">
        <CategoryFilter categories={categories} activeSlug={slug} allLabel={t("allCategories")} />
      </div>

      {posts.length > 0 ? (
        <>
          <BlogList posts={posts} />
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/blog/category/${slug}`}
          />
        </>
      ) : (
        <p className="text-center text-muted-foreground py-20">{t("noPosts")}</p>
      )}
    </div>
  );
}
