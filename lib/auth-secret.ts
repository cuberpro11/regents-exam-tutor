/** Shared by auth + middleware. Production must set SESSION_SECRET (min 16 chars). */
const DEV_FALLBACK = "dev-regents-session-secret-min-16-chars!";

export function getSessionSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET?.trim() ?? "";
  if (secret.length >= 16) {
    return new TextEncoder().encode(secret);
  }
  if (process.env.NODE_ENV !== "production") {
    return new TextEncoder().encode(DEV_FALLBACK);
  }
  throw new Error(
    "SESSION_SECRET must be set to at least 16 characters in production",
  );
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};
