import { createHash } from "crypto";

/**
 * Matches Flask generate_bunny_token / generate_bunny_signed_url in regents_prep_course/server.py
 */
export function generateBunnyToken(
  userId: string | number,
  videoId: string,
  expirationHours = 24,
  securityKey: string,
): string {
  const expiration = Math.floor(Date.now() / 1000) + expirationHours * 3600;
  const tokenString = `${userId}:${videoId}:${expiration}:${securityKey}`;
  const token = createHash("sha256").update(tokenString).digest("hex");
  return `${userId}:${videoId}:${expiration}:${token}`;
}

export function generateBunnySignedUrl(
  videoUrl: string,
  userId: string | number,
  videoId: string,
  securityKey: string,
  expirationHours = 24,
): string {
  const token = generateBunnyToken(
    userId,
    videoId,
    expirationHours,
    securityKey,
  );
  const separator = videoUrl.includes("?") ? "&" : "?";
  return `${videoUrl}${separator}token=${encodeURIComponent(token)}`;
}
