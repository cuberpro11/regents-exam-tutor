import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export type VerifyStoredPasswordResult =
  | { valid: false }
  | { valid: true; rehash?: string };

/** Supports bcrypt hashes and one-time upgrade from legacy plaintext storage. */
export async function verifyStoredPassword(
  stored: string | undefined,
  plain: string,
): Promise<VerifyStoredPasswordResult> {
  if (!stored) return { valid: false };
  const looksBcrypt =
    stored.startsWith("$2a$") ||
    stored.startsWith("$2b$") ||
    stored.startsWith("$2y$");
  if (looksBcrypt) {
    const ok = await bcrypt.compare(plain, stored);
    return ok ? { valid: true } : { valid: false };
  }
  if (stored === plain) {
    return { valid: true, rehash: await hashPassword(plain) };
  }
  return { valid: false };
}
