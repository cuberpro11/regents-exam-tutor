"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { COURSE_NAMES } from "@/lib/constants";

const KNOWN_COURSES = new Set<string>(Object.values(COURSE_NAMES));

export function PurchaseCheckoutClient() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const courseName = useMemo(() => {
    const raw = searchParams.get("course");
    return typeof raw === "string" && raw.trim() ? raw.trim() : null;
  }, [searchParams]);

  const invalid = !courseName || !KNOWN_COURSES.has(courseName);

  useEffect(() => {
    if (invalid || !courseName) {
      return;
    }

    let cancelled = false;
    setError(null);

    (async () => {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ course_name: courseName }),
      });
      let data: { url?: string; error?: string; already_owned?: boolean };
      try {
        data = (await res.json()) as {
          url?: string;
          error?: string;
          already_owned?: boolean;
        };
      } catch {
        data = { error: `Server error (${res.status}).` };
      }
      if (cancelled) return;
      if (res.status === 401) {
        const resume = `/purchase/checkout?course=${encodeURIComponent(courseName)}`;
        window.location.assign(`/login?next=${encodeURIComponent(resume)}`);
        return;
      }
      if (res.ok && data.already_owned) {
        window.location.assign("/dashboard");
        return;
      }
      if (!res.ok || !data.url) {
        setError(data.error ?? "Could not start checkout.");
        return;
      }
      window.location.assign(data.url);
    })();

    return () => {
      cancelled = true;
    };
  }, [courseName, invalid]);

  if (invalid) {
    return (
      <main className="purchase-flow-page">
        <div className="purchase-flow-card purchase-flow-card--narrow">
          <h1 className="purchase-flow-title">Checkout</h1>
          <p className="auth-form-error purchase-flow-error">
            Invalid or missing course. Choose a course to continue.
          </p>
          <Link href="/courses" className="btn btn-primary course-purchase-cta">
            View courses
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="purchase-flow-page">
      <div className="purchase-flow-card purchase-flow-card--narrow">
        <p className="course-purchase-kicker">Checkout</p>
        {error ? (
          <>
            <h1 className="purchase-flow-title">Couldn&apos;t start checkout</h1>
            <p className="auth-form-error purchase-flow-error">{error}</p>
            <Link href="/courses" className="btn btn-primary course-purchase-cta">
              View courses
            </Link>
          </>
        ) : (
          <>
            <h1 className="purchase-flow-title">Redirecting…</h1>
            <p className="purchase-flow-body">
              Taking you to secure payment. If nothing happens,{" "}
              <Link href="/courses">return to courses</Link>.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
