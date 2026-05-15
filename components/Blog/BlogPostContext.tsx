"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { TranslationReference } from "@/lib/api/blog";

interface BlogPostContextValue {
  /**
   * All language → slug mappings for the currently-viewed post.
   * Used by the header language switcher to navigate to the correct slug in
   * the target language instead of blindly swapping the locale prefix
   * (which would 404 since slugs differ per language).
   */
  availableLanguages: TranslationReference[];
}

const BlogPostContext = createContext<BlogPostContextValue | null>(null);

export function BlogPostProvider({
  availableLanguages,
  children,
}: {
  availableLanguages: TranslationReference[];
  children: ReactNode;
}) {
  return (
    <BlogPostContext.Provider value={{ availableLanguages }}>
      {children}
    </BlogPostContext.Provider>
  );
}

/**
 * Returns the post's translations when the consumer is rendered inside a
 * BlogPostProvider (i.e. on the blog detail page). Returns null elsewhere so
 * the language switcher can fall back to its default behavior.
 */
export function useBlogPostContext(): BlogPostContextValue | null {
  return useContext(BlogPostContext);
}
