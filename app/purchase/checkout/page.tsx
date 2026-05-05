import { Suspense } from "react";
import { PurchaseCheckoutClient } from "@/components/PurchaseCheckoutClient";

export default function PurchaseCheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="container" style={{ padding: "60px 20px", textAlign: "center" }}>
          <p>Loading…</p>
        </main>
      }
    >
      <PurchaseCheckoutClient />
    </Suspense>
  );
}
