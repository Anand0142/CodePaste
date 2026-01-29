import { redis } from "./redis";
import { Paste } from "@/types/paste";
import { getNow } from "./time";
import crypto from "crypto";

const PREFIX = "paste:";

export async function createPaste(
  content: string,
  ttlSeconds?: number,
  maxViews?: number
) {
  const id = crypto.randomUUID();
  const now = await getNow();

  const paste: Paste = {
    id,
    content,
    createdAt: now,
    expiresAt: ttlSeconds ? now + ttlSeconds * 1000 : null,
    maxViews: maxViews ?? null,
    views: 0,
  };

  await redis.set(PREFIX + id, paste);
  return paste;
}

export async function getPaste(id: string): Promise<Paste | null> {
  const paste = await redis.get<Paste>(PREFIX + id);
  if (!paste) return null;

  const now = await getNow();

  if (paste.expiresAt && now >= paste.expiresAt) return null;
  if (paste.maxViews !== null && paste.views >= paste.maxViews) return null;

  paste.views += 1;
  await redis.set(PREFIX + id, paste);

  return paste;
}

export function getRemainingViews(paste: Paste) {
  if (paste.maxViews === null) return null;
  return Math.max(paste.maxViews - paste.views, 0);
}
