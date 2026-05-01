import { getSessionSecretKey } from "@/lib/auth-secret";

/** Returns null if OK, or a user-facing error string for login/signup UI. */
export function sessionSecretMisconfigurationMessage(): string | null {
  try {
    getSessionSecretKey();
    return null;
  } catch (e) {
    const detail =
      e instanceof Error ? e.message : "SESSION_SECRET is not configured.";
    return `${detail} In Netlify: Site configuration → Environment variables → add SESSION_SECRET (a random string at least 16 characters), apply to all scopes, then trigger a new deploy.`;
  }
}
