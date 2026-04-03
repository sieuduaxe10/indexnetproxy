"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function BlogPagination({
  currentPage,
  totalPages,
  basePath,
}: BlogPaginationProps) {
  const t = useTranslations("blog");

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-10">
      {currentPage > 1 && (
        <Link
          href={
            currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`
          }
          className="px-4 py-2 text-sm font-ibm-plex-mono font-semibold rounded-lg border border-gray-light hover:bg-nav-orange-light hover:text-primary transition-colors"
        >
          {t("previousPage")}
        </Link>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={page === 1 ? basePath : `${basePath}?page=${page}`}
            className={`w-9 h-9 flex items-center justify-center text-sm font-ibm-plex-mono rounded-lg transition-colors ${
              page === currentPage
                ? "bg-primary text-white font-bold"
                : "hover:bg-nav-orange-light hover:text-primary"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 text-sm font-ibm-plex-mono font-semibold rounded-lg border border-gray-light hover:bg-nav-orange-light hover:text-primary transition-colors"
        >
          {t("nextPage")}
        </Link>
      )}
    </div>
  );
}
