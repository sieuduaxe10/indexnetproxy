import { BlogCard } from "./BlogCard";
import type { Post } from "./types";

export function RelatedPosts({
  posts,
  title,
}: {
  posts: Post[];
  title: string;
}) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-gray-light">
      <h2 className="font-extrabold text-21 text-foreground mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 4xl:grid-cols-2 7xl:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
