import { GoogleGenAI } from "@google/genai";
import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ── Config ──────────────────────────────────────────────────────────────────
const NEXT_PUBLIC_SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET || "production";
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SITE_URL = process.env.SITE_URL || "https://netproxy.io";
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !SANITY_API_TOKEN || !GEMINI_API_KEY) {
  console.error("❌ Missing environment variables. Required:");
  console.error(
    "   NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN, GEMINI_API_KEY"
  );
  console.error(
    "   Tip: locally, ensure .env.local exists. In CI, set them as secrets."
  );
  process.exit(1);
}

const sanity = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// ── Load topics ─────────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const topics = JSON.parse(
  readFileSync(join(__dirname, "topics.json"), "utf-8")
);

async function pickUnusedTopic() {
  // Fetch all existing post titles from Sanity
  const existingTitles = await sanity.fetch(
    `*[_type == "post"].title`
  );
  const usedSet = new Set(existingTitles);

  // Filter to topics not yet published
  const unused = topics.filter((t) => !usedSet.has(t));

  if (unused.length === 0) {
    console.log("🔄 All topics used, resetting cycle — picking random topic");
    return topics[Math.floor(Math.random() * topics.length)];
  }

  console.log(`📋 ${unused.length}/${topics.length} topics remaining in cycle`);
  return unused[Math.floor(Math.random() * unused.length)];
}

// ── Gemini call with retry (handles 503/429/5xx transient errors) ──────────
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);
const FALLBACK_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.5-pro"];

function extractStatus(err) {
  return (
    err?.status ??
    err?.error?.code ??
    err?.response?.status ??
    (typeof err?.message === "string" && err.message.match(/"code"\s*:\s*(\d+)/)?.[1] * 1) ??
    null
  );
}

async function callGeminiWithRetry(request, { maxAttempts = 6, baseDelayMs = 5000 } = {}) {
  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const model = FALLBACK_MODELS[Math.min(attempt - 1, FALLBACK_MODELS.length - 1)] ?? request.model;
    try {
      if (model !== request.model) {
        console.log(`🔁 Attempt ${attempt}/${maxAttempts} — falling back to model "${model}"`);
      }
      return await ai.models.generateContent({ ...request, model });
    } catch (err) {
      lastErr = err;
      const status = extractStatus(err);
      const retryable = status == null || RETRYABLE_STATUS.has(Number(status));
      if (!retryable || attempt === maxAttempts) {
        throw err;
      }
      const delay = Math.min(baseDelayMs * 2 ** (attempt - 1), 60_000);
      console.warn(
        `⚠️  Gemini error (status=${status ?? "unknown"}) on attempt ${attempt}/${maxAttempts}. Retrying in ${delay / 1000}s...`
      );
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr;
}

// ── Generate blog post with Gemini ──────────────────────────────────────────
async function generatePost(topic) {
  console.log(`✍️  Generating post about: "${topic}"`);

  const prompt = `You are an expert blog writer for netproxy.io — a Vietnamese proxy service provider.

Write a blog post in Vietnamese about the following topic: "${topic}"

Requirements:
- Write 1000-1500 words in Vietnamese
- Tone: professional but accessible, SEO-friendly
- Structure: use ## for h2, ### for h3 headings, paragraphs, bullet lists where appropriate
- Include practical tips and real-world examples
- Target audience: developers, businesses, and individuals who need proxy services

Respond using EXACTLY this format with these exact delimiters. Do NOT use any other format:

---TITLE---
Tiêu đề bài viết (hấp dẫn, chứa keyword)
---SLUG---
tieu-de-bai-viet-khong-dau
---EXCERPT---
Mô tả ngắn 150-160 ký tự cho SEO
---META_TITLE---
Meta title tối ưu SEO (50-60 ký tự)
---META_DESCRIPTION---
Meta description (150-160 ký tự)
---BODY---
Nội dung bài viết dạng markdown đầy đủ ở đây`;

  const response = await callGeminiWithRetry({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  try {
    return parseDelimitedResponse(text);
  } catch (err) {
    console.error("❌ Failed to parse Gemini response:", err.message);
    console.error("Raw response:", text.substring(0, 500));
    throw err;
  }
}

// ── Parse delimited response ────────────────────────────────────────────────
function parseDelimitedResponse(text) {
  function extract(label) {
    const regex = new RegExp(`---${label}---\\s*([\\s\\S]*?)(?=---[A-Z_]+---|$)`);
    const match = text.match(regex);
    if (!match) throw new Error(`Missing section: ${label}`);
    return match[1].trim();
  }

  return {
    title: extract("TITLE"),
    slug: extract("SLUG"),
    excerpt: extract("EXCERPT"),
    body: extract("BODY"),
    seo: {
      metaTitle: extract("META_TITLE"),
      metaDescription: extract("META_DESCRIPTION"),
    },
  };
}

// ── Markdown → Portable Text ────────────────────────────────────────────────
function markdownToPortableText(markdown) {
  const blocks = [];
  const lines = markdown.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Headings
    const h2Match = line.match(/^## (.+)/);
    const h3Match = line.match(/^### (.+)/);
    if (h2Match) {
      blocks.push({
        _type: "block",
        _key: randomUUID().slice(0, 12),
        style: "h2",
        markDefs: [],
        children: parseInlineMarks(h2Match[1]),
      });
      i++;
      continue;
    }
    if (h3Match) {
      blocks.push({
        _type: "block",
        _key: randomUUID().slice(0, 12),
        style: "h3",
        markDefs: [],
        children: parseInlineMarks(h3Match[1]),
      });
      i++;
      continue;
    }

    // Bullet list
    if (line.match(/^[-*] /)) {
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        const content = lines[i].replace(/^[-*] /, "");
        const { children, markDefs } = parseInlineWithLinks(content);
        blocks.push({
          _type: "block",
          _key: randomUUID().slice(0, 12),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs,
          children,
        });
        i++;
      }
      continue;
    }

    // Numbered list
    if (line.match(/^\d+\. /)) {
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        const content = lines[i].replace(/^\d+\. /, "");
        const { children, markDefs } = parseInlineWithLinks(content);
        blocks.push({
          _type: "block",
          _key: randomUUID().slice(0, 12),
          style: "normal",
          listItem: "number",
          level: 1,
          markDefs,
          children,
        });
        i++;
      }
      continue;
    }

    // Regular paragraph — collect consecutive non-empty, non-special lines
    let para = line;
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].match(/^#{2,3} /) &&
      !lines[i].match(/^[-*] /) &&
      !lines[i].match(/^\d+\. /)
    ) {
      para += " " + lines[i].trim();
      i++;
    }

    const { children, markDefs } = parseInlineWithLinks(para);
    blocks.push({
      _type: "block",
      _key: randomUUID().slice(0, 12),
      style: "normal",
      markDefs,
      children,
    });
  }

  return blocks;
}

// Parse inline marks: bold, italic, links
function parseInlineWithLinks(text) {
  const markDefs = [];
  const children = [];

  // Process links first: replace [text](url) with placeholders
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let processed = text;

  processed = processed.replace(linkRegex, (_, linkText, url) => {
    const key = randomUUID().slice(0, 8);
    markDefs.push({ _type: "link", _key: key, href: url });
    return `{{LINK:${key}:${linkText}}}`;
  });

  // Now split by link placeholders and process bold/italic
  const parts = processed.split(/({{LINK:[^}]+}})/);

  for (const part of parts) {
    const linkMatch = part.match(/{{LINK:([^:]+):(.+)}}/);
    if (linkMatch) {
      children.push({
        _type: "span",
        _key: randomUUID().slice(0, 12),
        text: linkMatch[2],
        marks: [linkMatch[1]],
      });
    } else {
      children.push(...parseInlineMarks(part));
    }
  }

  return { children, markDefs };
}

function parseInlineMarks(text) {
  const spans = [];
  const regex = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      spans.push({
        _type: "span",
        _key: randomUUID().slice(0, 12),
        text: text.slice(lastIndex, match.index),
        marks: [],
      });
    }

    if (match[2]) {
      spans.push({
        _type: "span",
        _key: randomUUID().slice(0, 12),
        text: match[2],
        marks: ["strong", "em"],
      });
    } else if (match[3]) {
      spans.push({
        _type: "span",
        _key: randomUUID().slice(0, 12),
        text: match[3],
        marks: ["strong"],
      });
    } else if (match[4]) {
      spans.push({
        _type: "span",
        _key: randomUUID().slice(0, 12),
        text: match[4],
        marks: ["em"],
      });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    spans.push({
      _type: "span",
      _key: randomUUID().slice(0, 12),
      text: text.slice(lastIndex),
      marks: [],
    });
  }

  if (spans.length === 0) {
    spans.push({
      _type: "span",
      _key: randomUUID().slice(0, 12),
      text,
      marks: [],
    });
  }

  return spans;
}

// ── Publish to Sanity ───────────────────────────────────────────────────────
async function publishToSanity(post) {
  console.log(`📤 Publishing to Sanity: "${post.title}"`);

  const portableText = markdownToPortableText(post.body);

  const doc = {
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    excerpt: post.excerpt,
    body: portableText,
    publishedAt: new Date().toISOString(),
    seo: {
      metaTitle: post.seo.metaTitle,
      metaDescription: post.seo.metaDescription,
    },
  };

  const result = await sanity.create(doc);
  console.log(`✅ Published! Document ID: ${result._id}`);
  return result;
}

// ── Check duplicate ─────────────────────────────────────────────────────────
async function slugExists(slug) {
  const count = await sanity.fetch(
    `count(*[_type == "post" && slug.current == $slug])`,
    { slug }
  );
  return count > 0;
}

// ── Trigger revalidation ───────────────────────────────────────────────────
async function triggerRevalidation(slug) {
  if (!REVALIDATION_SECRET) {
    console.log("⚠️  REVALIDATION_SECRET not set, skipping revalidation");
    return;
  }

  console.log("🔄 Triggering revalidation...");
  const res = await fetch(`${SITE_URL}/api/revalidate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-revalidation-secret": REVALIDATION_SECRET,
    },
    body: JSON.stringify({ _type: "post", slug: { current: slug } }),
  });

  if (res.ok) {
    console.log("✅ Revalidation triggered successfully");
  } else {
    console.warn(`⚠️  Revalidation failed (${res.status}), post is published but may take up to 1h to appear`);
  }
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  try {
    const topic = await pickUnusedTopic();
    console.log(`🎯 Selected topic: "${topic}"`);

    // Generate the blog post
    const post = await generatePost(topic);

    // Ensure unique slug
    if (await slugExists(post.slug)) {
      post.slug = `${post.slug}-${Date.now().toString(36)}`;
      console.log(`⚠️  Slug existed, using: "${post.slug}"`);
    }

    // Publish
    await publishToSanity(post);

    // Revalidate cache so the post appears immediately
    await triggerRevalidation(post.slug);

    console.log("\n🎉 Auto-post completed successfully!");
    console.log(`   Title: ${post.title}`);
    console.log(`   Slug: ${post.slug}`);
  } catch (err) {
    console.error("❌ Auto-post failed:", err.message);
    process.exit(1);
  }
}

main();
