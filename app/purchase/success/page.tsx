import Link from "next/link";

export default async function PurchaseSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  await searchParams;
  return (
    <main className="container" style={{ padding: "60px 20px", textAlign: "center" }}>
      <h1>Thank you!</h1>
      <p>
        Your payment was submitted. If you were logged in when you checked out,
        your course will appear on your dashboard once Stripe confirms the
        payment (usually within a few seconds).
      </p>
      <p>
        <Link href="/dashboard" className="btn btn-primary">
          Go to dashboard
        </Link>
      </p>
    </main>
  );
}
