import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSession } from "@/lib/auth";
import { getStripePriceId, siteUrl } from "@/lib/constants";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret?.trim()) {
    return NextResponse.json(
      {
        error:
          "Stripe secret key is missing. Add STRIPE_SECRET_KEY to .env.local in regents-exam-tutor-next, then restart `npm run dev`.",
      },
      { status: 500 },
    );
  }

  const body = (await request.json()) as { course_name?: string };
  const courseName = body.course_name;
  if (!courseName) {
    return NextResponse.json({ error: "course_name required" }, { status: 400 });
  }

  const priceId = getStripePriceId(courseName);
  if (!priceId) {
    const hint =
      courseName.includes("Algebra")
        ? "STRIPE_PRICE_ID_ALGEBRA"
        : courseName.includes("Geometry")
          ? "STRIPE_PRICE_ID_GEOMETRY"
          : "STRIPE_PRICE_ID_ALGEBRA / STRIPE_PRICE_ID_GEOMETRY";
    return NextResponse.json(
      {
        error: `No Stripe price ID for this course. Set ${hint} in .env.local and restart the dev server.`,
      },
      { status: 400 },
    );
  }

  const stripe = new Stripe(secret);
  const origin = siteUrl();

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/courses`,
      client_reference_id: session.id,
      metadata: {
        course_name: courseName,
        userId: session.id,
      },
    });
    if (!checkoutSession.url) {
      return NextResponse.json({ error: "No checkout URL" }, { status: 500 });
    }
    return NextResponse.json({ url: checkoutSession.url });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Checkout error";
    return NextResponse.json({ error: message }, { status: 403 });
  }
}
