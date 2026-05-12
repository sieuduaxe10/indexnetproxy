import type { PostDetail } from "./types";

export function PostHeader({ post }: { post: PostDetail }) {
  return (
    <header className="mb-8">
      <h1 className="font-extrabold text-33 4xl:text-40 leading-[130%] text-foreground mb-4">
        {post.title}
      </h1>
      {post.published_at && (
        <time
          dateTime={post.published_at}
          className="text-sm text-muted-foreground font-ibm-plex-mono"
        >
          {new Date(post.published_at).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      )}
    </header>
  );
}
