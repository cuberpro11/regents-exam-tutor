"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { COURSE_NAMES } from "@/lib/constants";

const KNOWN_COURSES = new Set<string>(Object.values(COURSE_NAMES));

export function PurchaseCheckoutClient() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = searchParams.get("course");
    const courseName =
      typeof raw === "string" && raw.trim() ? raw.trim() : null;
    if (!courseName || !KNOWN_COURSES.has(courseName)) {
      setError("Invalid or missing course. Choose a course from the courses page.");
      return;
    }

    let cancelled = false;
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
  }, [searchParams]);

  if (!error) {
    return (
      <main className="container" style={{ padding: "60px 20px", textAlign: "center" }}>
        <p>Redirecting to secure checkout…</p>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: "60px 20px", textAlign: "center" }}>
      <p className="auth-form-error" style={{ marginBottom: "1rem" }}>
        {error}
      </p>
      <p>
        <Link href="/courses" className="btn btn-primary">
          View courses
        </Link>
      </p>
    </main>
  );
}
