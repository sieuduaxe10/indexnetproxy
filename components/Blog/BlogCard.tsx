import { Link } from "@/i18n/routing";
import type { PostListItem } from "./types";

export function BlogCard({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl bg-[#fafcfc] border border-gray-light overflow-hidden transition-shadow hover:shadow-upgo"
    >
      <div className="p-5 flex flex-col gap-3">
        <h2 className="font-extrabold text-18 leading-[140%] text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-13 text-muted-foreground leading-[170%] line-clamp-3">
            {post.excerpt}
          </p>
        )}
        {post.published_at && (
          <time
            dateTime={post.published_at}
            className="text-xs text-muted-foreground font-ibm-plex-mono"
          >
            {new Date(post.published_at).toLocaleDateString("vi-VN", {
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
