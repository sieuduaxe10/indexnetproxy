import { BlogCard } from "./BlogCard";
import type { PostListItem } from "./types";

export function BlogList({ posts }: { posts: PostListItem[] }) {
  return (
    <div className="grid grid-cols-1 4xl:grid-cols-2 7xl:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
