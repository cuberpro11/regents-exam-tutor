import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/constants";

/**
 * Edge middleware cannot reliably read the same `SESSION_SECRET` as Node API routes
 * on some hosts (e.g. Netlify), so verifying the JWT here breaks login: cookies are set
 * with a valid token on Node, then Edge verifies with the wrong key and redirects to /login.
 *
 * We only require a present session cookie shaped like a JWT; full verification happens in
 * Node via `getSession()` on each request.
 */
function hasSessionCookie(request: NextRequest): boolean {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token || token.length < 20) return false;
  const parts = token.split(".");
  return parts.length === 3 && parts.every((p) => p.length > 0);
}

export async function middleware(request: NextRequest) {
  if (!hasSessionCookie(request)) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/course/:path*"],
};
