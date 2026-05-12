import { NextResponse } from "next/server";

/**
 * IndexNow key verification endpoint.
 * Bing/IndexNow verifies ownership by fetching the key file.
 * Serves the key as plain text at /api/indexnow (referenced as keyLocation in submissions).
 */
export async function GET() {
  const key = process.env.INDEXNOW_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Not configured" }, { status: 404 });
  }
  return new NextResponse(key, {
    headers: { "Content-Type": "text/plain" },
  });
}
