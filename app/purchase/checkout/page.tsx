import { Suspense } from "react";
import { PurchaseCheckoutClient } from "@/components/PurchaseCheckoutClient";

export default function PurchaseCheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="purchase-flow-page">
          <div className="purchase-flow-card purchase-flow-card--narrow">
            <p className="course-purchase-kicker">Checkout</p>
            <h1 className="purchase-flow-title">Loading…</h1>
          </div>
        </main>
      }
    >
      <PurchaseCheckoutClient />
    </Suspense>
  );
}
