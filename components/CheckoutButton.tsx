"use client";

import { useCallback, useState } from "react";
import { formatCoursePriceUsd } from "@/lib/constants";

type Props = {
  courseName: string;
  className?: string;
  children?: React.ReactNode;
};

export function CheckoutButton({ courseName, className, children }: Props) {
  const [busy, setBusy] = useState(false);

  const onClick = useCallback(async () => {
    setBusy(true);
    try {
      let loggedIn = false;
      try {
        const sessionRes = await fetch("/api/auth/session", {
          credentials: "include",
        });
        const sessionData = (await sessionRes.json()) as {
          loggedIn?: boolean;
        };
        loggedIn = !!sessionData.loggedIn;
      } catch {
        loggedIn = false;
      }
      if (!loggedIn) {
        const resume = `/purchase/checkout?course=${encodeURIComponent(courseName)}`;
        window.location.assign(`/login?next=${encodeURIComponent(resume)}`);
        return;
      }

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
        data = { error: `Server error (${res.status}). Check the terminal running Next.js.` };
      }
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
        const msg = data.error ?? "Checkout failed";
        alert(msg);
        setBusy(false);
        return;
      }
      window.location.assign(data.url);
    } catch (e) {
      console.error(e);
      alert(
        e instanceof Error
          ? e.message
          : "Network error — check your connection and try again.",
      );
      setBusy(false);
    }
  }, [courseName]);

  return (
    <button
      type="button"
      className={className ?? "btn btn-primary checkout-button"}
      data-course-name={courseName}
      disabled={busy}
      onClick={onClick}
    >
      {busy
        ? "Opening secure checkout…"
        : (children ?? `Buy now — ${formatCoursePriceUsd()}`)}
    </button>
  );
}
