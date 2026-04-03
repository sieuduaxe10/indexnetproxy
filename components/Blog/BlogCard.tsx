import Image from "next/image";
import { Link } from "@/i18n/routing";
import { urlFor } from "@/sanity/lib/image";
import type { Post } from "./types";

export function BlogCard({ post }: { post: Post }) {
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(600).height(340).url()
    : null;

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block rounded-2xl bg-[#fafcfc] border border-gray-light overflow-hidden transition-shadow hover:shadow-upgo"
    >
      {imageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5 flex flex-col gap-3">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.map((cat) => (
              <span
                key={cat._id}
                className="text-xs font-ibm-plex-mono font-semibold text-primary bg-nav-orange-light px-2 py-1 rounded-md uppercase"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}
        <h2 className="font-neue-kaine-bold text-18 leading-[140%] text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-13 text-muted-foreground leading-[170%] line-clamp-3">
            {post.excerpt}
          </p>
        )}
        {post.publishedAt && (
          <time
            dateTime={post.publishedAt}
            className="text-xs text-muted-foreground font-ibm-plex-mono"
          >
            {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
      </div>
    </Link>
  );
}
