import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/constants";
import { getSessionSecretKey } from "@/lib/auth-secret";

export async function middleware(request: NextRequest) {
  let key: Uint8Array;
  try {
    key = getSessionSecretKey();
  } catch {
    return new NextResponse(
      "Server configuration error: set SESSION_SECRET (16+ characters) in the host environment.",
      { status: 503 },
    );
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }
  try {
    await jwtVerify(token, key);
    return NextResponse.next();
  } catch {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/course/:path*"],
};
