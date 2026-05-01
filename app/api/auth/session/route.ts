import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

/** Client-safe session probe (navbar). Uses Node where SESSION_SECRET is available. */
export async function GET() {
  const session = await getSession();
  return NextResponse.json(
    { loggedIn: !!session },
    { headers: { "Cache-Control": "private, no-store, max-age=0" } },
  );
}
