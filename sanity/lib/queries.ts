import { groq } from 'next-sanity'

// Blog listing — paginated
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    categories[]->{ _id, title, slug },
  }
`

// Total post count
export const postCountQuery = groq`
  count(*[_type == "post"])
`

// Single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    slug,
    excerpt,
    body,
    featuredImage,
    publishedAt,
    noIndex,
    categories[]->{ _id, title, slug },
    seo,
  }
`

// Posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    categories[]->{ _id, title, slug },
  }
`

// Post count by category
export const postCountByCategoryQuery = groq`
  count(*[_type == "post" && $categorySlug in categories[]->slug.current])
`

// All categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
  }
`

// All post slugs for generateStaticParams
export const postSlugsQuery = groq`
  *[_type == "post"]{ slug }
`

// Related posts (by shared categories, exclude current post)
export const relatedPostsQuery = groq`
  *[_type == "post" && _id != $currentId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
  }
`

// Posts for sitemap
export const postsSitemapQuery = groq`
  *[_type == "post"] {
    slug,
    publishedAt,
    _updatedAt,
  }
`

// Categories for sitemap
export const categoriesSitemapQuery = groq`
  *[_type == "category"] {
    slug,
    _updatedAt,
  }
`

// Posts for RSS
export const postsRssQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...20] {
    title,
    slug,
    excerpt,
    publishedAt,
  }
`
