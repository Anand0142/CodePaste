import { NextResponse } from "next/server";
import { getPaste, getRemainingViews } from "@/lib/pasteService";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ await params

  const paste = await getPaste(id);

  if (!paste) {
    return NextResponse.json(
      { error: "Paste not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    content: paste.content,
    remaining_views: getRemainingViews(paste),
    expires_at: paste.expiresAt
      ? new Date(paste.expiresAt).toISOString()
      : null,
  });
}
