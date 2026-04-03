import { Link } from "@/i18n/routing";
import type { Category } from "./types";

interface CategoryFilterProps {
  categories: Category[];
  activeSlug?: string;
  allLabel: string;
}

export function CategoryFilter({
  categories,
  activeSlug,
  allLabel,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`px-3 py-1.5 text-xs font-ibm-plex-mono font-semibold rounded-md uppercase transition-colors ${
          !activeSlug
            ? "bg-primary text-white"
            : "bg-nav-orange-light text-primary hover:bg-primary hover:text-white"
        }`}
      >
        {allLabel}
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat._id}
          href={`/blog/category/${cat.slug.current}`}
          className={`px-3 py-1.5 text-xs font-ibm-plex-mono font-semibold rounded-md uppercase transition-colors ${
            activeSlug === cat.slug.current
              ? "bg-primary text-white"
              : "bg-nav-orange-light text-primary hover:bg-primary hover:text-white"
          }`}
        >
          {cat.title}
        </Link>
      ))}
    </div>
  );
}
