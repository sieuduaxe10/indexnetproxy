export const runtime = "edge";

import { NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsRssQuery } from "@/sanity/lib/queries";

const BASE_URL = "https://netproxy.io";

export async function GET() {
  const posts = await sanityFetch<
    {
      title: string;
      slug: { current: string };
      excerpt: string;
      publishedAt: string;
    }[]
  >({
    query: postsRssQuery,
    tags: ["post"],
  });

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/vi/blog/${post.slug.current}</link>
      <description><![CDATA[${post.excerpt || ""}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <guid>${BASE_URL}/vi/blog/${post.slug.current}</guid>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NetProxy Blog</title>
    <link>${BASE_URL}/vi/blog</link>
    <description>Chia sẻ kiến thức về proxy, bảo mật mạng và các giải pháp truy cập internet.</description>
    <language>vi</language>
    <atom:link href="${BASE_URL}/api/rss" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
