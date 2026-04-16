import type { PortableTextBlock } from "@portabletext/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export interface Post {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: PortableTextBlock[];
  featuredImage?: SanityImageSource & { alt?: string };
  categories?: Category[];
  publishedAt?: string;
  noIndex?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageSource;
  };
}
