import { NextResponse } from "next/server";
import Stripe from "stripe";
import { addPurchaseIfNew } from "@/lib/purchases";

export const runtime = "nodejs";

function getStripe(): Stripe {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error("STRIPE_SECRET_KEY missing");
  return new Stripe(secret);
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const sess = event.data.object as Stripe.Checkout.Session;
    const userId = sess.metadata?.userId ?? sess.client_reference_id;
    const courseName = sess.metadata?.course_name;
    if (userId && courseName) {
      await addPurchaseIfNew(userId, courseName);
    }
  }

  return NextResponse.json({ received: true });
}
