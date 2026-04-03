import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Post } from "./types";

export function PostHeader({ post }: { post: Post }) {
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(960).height(500).url()
    : null;

  return (
    <header className="mb-8">
      {post.categories && post.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
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
      <h1 className="font-neue-kaine-bold text-33 4xl:text-40 leading-[130%] text-foreground mb-4">
        {post.title}
      </h1>
      {post.publishedAt && (
        <time
          dateTime={post.publishedAt}
          className="text-sm text-muted-foreground font-ibm-plex-mono"
        >
          {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      )}
      {imageUrl && (
        <div className="relative aspect-[16/9] mt-6 rounded-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 960px) 100vw, 960px"
            priority
          />
        </div>
      )}
    </header>
  );
}
