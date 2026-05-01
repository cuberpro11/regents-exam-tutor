import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";
import { getSession } from "@/lib/auth";

type Props = {
  searchParams: Promise<{ next?: string | string[] }>;
};

function safeNext(raw: string | string[] | undefined): string {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (typeof v === "string" && v.startsWith("/") && !v.startsWith("//")) {
    return v;
  }
  return "/dashboard";
}

export default async function LoginPage({ searchParams }: Props) {
  const session = await getSession();
  const sp = await searchParams;
  const next = safeNext(sp.next);

  if (session) {
    redirect(next);
  }

  return (
    <main className="auth-page-main">
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading…</p>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
