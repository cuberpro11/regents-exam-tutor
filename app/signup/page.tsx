import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SignupForm } from "@/components/SignupForm";
import { getSession } from "@/lib/auth";

export default async function SignupPage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="auth-page-main">
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading…</p>}>
        <SignupForm />
      </Suspense>
    </main>
  );
}
