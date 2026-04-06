# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Public-facing marketing/landing site + blog for NetProxy.io — a proxy service business. This is **not** a dashboard or app; it's the index/homepage with static pages and a CMS-powered blog. Part of the larger NetProxy console monorepo.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript 5)
- **Tailwind CSS v4** (CSS-based config via `@tailwindcss/postcss`, no `tailwind.config.js`)
- **shadcn/ui** (new-york style, RSC-enabled)
- **next-intl v4** for i18n (14 locales)
- **Sanity CMS** (headless CMS for blog content via `next-sanity`)
- **Framer Motion / GSAP** for animations
- **Lenis** for smooth scrolling
- **pnpm** as package manager

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build (next build)
pnpm start        # Start production server
pnpm lint         # ESLint (flat config, core-web-vitals + typescript)
npx sanity dev    # Run Sanity Studio locally (for content management)
```

No test framework is configured.

## Architecture

### Routing & i18n

All pages live under `app/[locale]/`. The middleware (`middleware.ts`) handles locale detection and redirects. Supported locales are defined in `common/constant.ts` and wired through `i18n/routing.ts`.

- **Translation files**: `messages/{locale}.json` (en, vi, zh, hi, ar, ru, bn, id, th, tr, ph, br, fa, es)
- **i18n config**: `i18n/request.ts` loads messages, `i18n/routing.ts` defines routing + re-exports navigation helpers (`Link`, `redirect`, `usePathname`, `useRouter`)
- Use `useTranslations()` from `next-intl` in client components; `getTranslations()` in server components
- The `[locale]/layout.tsx` wraps children in `NextIntlClientProvider` and generates static params for all locales

### Pages

`app/[locale]/` contains:
- Landing page (`page.tsx`) — uses `runtime = "edge"`
- `blog/` — CMS-powered blog (listing, detail, category filter)
- `cookie-policy/`, `privacy-policy/`, `refund-service/`, `term-service/`

### Blog System (Sanity CMS)

**Content lives in Sanity**, not in the codebase. Blog is currently Vietnamese-only.

- **Schemas**: `sanity/schemas/` — `post.ts`, `category.ts`, `blockContent.ts`
- **Data fetching**: `sanity/lib/fetch.ts` wraps Sanity client with Next.js cache tags + ISR (1hr revalidate fallback)
- **GROQ queries**: `sanity/lib/queries.ts` — all queries for posts, categories, pagination, sitemap, RSS
- **Blog routes**: `app/[locale]/blog/page.tsx` (listing), `[slug]/page.tsx` (detail), `category/[slug]/page.tsx` (filter)
- **Blog components**: `components/Blog/` — BlogCard, BlogList, BlogPagination, CategoryFilter, PostHeader, PortableTextRenderer, RelatedPosts, JsonLd
- **Revalidation**: `app/api/revalidate/route.ts` — on-demand cache invalidation via Sanity webhook (requires `x-revalidation-secret` header)
- **RSS**: `app/api/rss/route.ts`
- **Sitemap**: `app/sitemap.ts` — includes both static pages and blog posts

**Important**: Blog pages do NOT use edge runtime (Sanity client requires Node.js). Only the landing page uses `runtime = "edge"`.

**Studio**: Not hosted on production. Run `npx sanity dev` locally for content management. Config in `sanity.config.ts`.

### Middleware

`middleware.ts` uses `next-intl/middleware` for locale routing. The matcher excludes `/api`, `/_next`, `/_vercel`, and static files so API routes (revalidation, RSS) work without locale prefixing.

### Path Alias

`@/*` maps to project root (e.g., `@/components/Hero`, `@/lib/utils`, `@/sanity/lib/client`)

### Key Conventions

- Components are organized by section in `components/` (Hero, Pricing, FAQs, Footer, Header, Blog, etc.) — each in its own folder
- UI primitives from shadcn/ui live in `components/ui/`
- Custom hooks in `hooks/` (useClickOutside, useResponsive)
- `lib/utils.ts` exports `cn()` for Tailwind class merging
- Custom fonts loaded in `app/fonts.ts` and `app/layout.tsx` (Geist Sans, IBM Plex Mono, Noto Sans, Inter, Neue Kaine)
- Navigation links that point to page routes (e.g., `/blog`) use `Link` from `@/i18n/routing`; anchor links (`#pricing`) use `next/link`

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID    # Sanity project ID
NEXT_PUBLIC_SANITY_DATASET       # "production"
NEXT_PUBLIC_SANITY_API_VERSION   # e.g. "2026-04-01"
SANITY_API_TOKEN                 # Write token (for API mutations)
REVALIDATION_SECRET              # Secret for /api/revalidate webhook
```
