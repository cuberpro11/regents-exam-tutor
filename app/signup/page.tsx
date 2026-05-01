import { redirect } from "next/navigation";
import { SignupForm } from "@/components/SignupForm";
import { getSession } from "@/lib/auth";

export default async function SignupPage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="auth-page-main">
      <SignupForm />
    </main>
  );
}
