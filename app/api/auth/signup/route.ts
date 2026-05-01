import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/auth";
import { getSessionSecretKey, sessionCookieOptions } from "@/lib/auth-secret";
import { SESSION_COOKIE } from "@/lib/constants";
import { appendUser, findUserByEmail, newUserId } from "@/lib/users";
import { hashPassword } from "@/lib/password";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    getSessionSecretKey();
  } catch {
    return NextResponse.json(
      { error: "Server misconfiguration: SESSION_SECRET is not set" },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      confirm_password?: string;
    };
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const confirm = body.confirm_password;
    if (!email || !password || !confirm) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (password !== confirm) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }
    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }
    const id = newUserId();
    const hash = await hashPassword(password);
    await appendUser({ id, email, password: hash });
    const token = await createSessionToken({ id, email });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
    return res;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("already registered")) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
