import { NextResponse } from "next/server";
import { SESSION_COOKIE, siteUrl } from "@/lib/constants";

export async function GET() {
  const res = NextResponse.redirect(new URL("/", siteUrl()));
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
