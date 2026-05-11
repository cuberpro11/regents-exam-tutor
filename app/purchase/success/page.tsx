import Link from "next/link";

export default async function PurchaseSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  await searchParams;
  return (
    <main className="purchase-flow-page">
      <div className="purchase-flow-card purchase-flow-card--narrow">
        <p className="course-purchase-kicker">You&apos;re all set</p>
        <h1 className="purchase-flow-title">Thank you for your purchase</h1>
        <p className="purchase-flow-body">
          Your payment was submitted. If you were logged in when you checked out,
          your course will appear on your dashboard once Stripe confirms the
          payment (usually within a few seconds).
        </p>
        <Link href="/dashboard" className="btn btn-primary course-purchase-cta">
          Go to dashboard
        </Link>
        <p className="purchase-flow-secondary">
          <Link href="/courses">Browse more courses</Link>
        </p>
      </div>
    </main>
  );
}
