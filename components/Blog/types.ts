// Re-exports of the public DTOs from the backend client. Components import
// from "./types" so we can swap the underlying source if needed.
export type {
  PublicPostListItem as PostListItem,
  PublicPostDetail as PostDetail,
  TranslationReference,
  SitemapPost,
} from "@/lib/api/blog";
