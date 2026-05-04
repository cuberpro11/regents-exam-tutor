import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/auth";
import { sessionCookieOptions } from "@/lib/auth-secret";
import { sessionSecretMisconfigurationMessage } from "@/lib/session-secret-check";
import { SESSION_COOKIE } from "@/lib/constants";
import { findUserByEmail, updateUserFields } from "@/lib/users";
import { verifyStoredPassword } from "@/lib/password";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secretErr = sessionSecretMisconfigurationMessage();
  if (secretErr) {
    return NextResponse.json({ error: `Server misconfiguration: ${secretErr}` }, { status: 500 });
  }

  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        {
          error:
            "There is no account for this email yet. Create one on the sign-up page, then sign in here.",
          code: "EMAIL_NOT_REGISTERED" as const,
        },
        { status: 401 },
      );
    }
    const check = await verifyStoredPassword(user.password, password);
    if (!check.valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    if (check.rehash) {
      await updateUserFields(user.id, { password: check.rehash });
    }
    const token = await createSessionToken({ id: user.id, email: user.email });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
    return res;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
