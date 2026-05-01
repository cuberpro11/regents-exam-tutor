"use client";

import { useCallback, useState } from "react";

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
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ course_name: courseName }),
      });
      let data: { url?: string; error?: string };
      try {
        data = (await res.json()) as { url?: string; error?: string };
      } catch {
        data = { error: `Server error (${res.status}). Check the terminal running Next.js.` };
      }
      if (!res.ok || !data.url) {
        if (res.status === 401) {
          const returnTo =
            typeof window !== "undefined"
              ? `${window.location.pathname}${window.location.search}`
              : "/";
          window.location.assign(
            `/login?next=${encodeURIComponent(returnTo)}`,
          );
          return;
        }
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
      {children ?? (busy ? "Please wait…" : "Purchase")}
    </button>
  );
}
