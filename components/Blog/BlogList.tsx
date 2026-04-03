import { BlogCard } from "./BlogCard";
import type { Post } from "./types";

export function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 4xl:grid-cols-2 7xl:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  );
}
