import { NextResponse } from "next/server";
import { sessionCookieOptions } from "@/lib/auth-secret";
import { SESSION_COOKIE, siteUrl } from "@/lib/constants";

export async function GET() {
  const res = NextResponse.redirect(new URL("/", siteUrl()));
  res.cookies.set(SESSION_COOKIE, "", {
    ...sessionCookieOptions,
    maxAge: 0,
  });
  return res;
}
