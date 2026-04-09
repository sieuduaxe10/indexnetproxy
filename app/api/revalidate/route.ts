import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidation-secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json();
  const { _type, slug } = body;

  if (_type === "post") {
    revalidateTag("post", "max");
    revalidateTag("sitemap", "max");
  }

  if (_type === "category") {
    revalidateTag("category", "max");
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
