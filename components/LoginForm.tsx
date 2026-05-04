"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const q = searchParams.get("email");
    if (typeof q === "string" && q.trim()) {
      setEmail(q.trim());
    }
  }, [searchParams]);

  const justRegistered = searchParams.get("registered") === "1";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = (await res.json()) as {
      error?: string;
      code?: string;
    };
    if (!res.ok) {
      if (data.code === "EMAIL_NOT_REGISTERED" && email.trim()) {
        window.location.assign(
          `/signup?email=${encodeURIComponent(email.trim().toLowerCase())}`,
        );
        return;
      }
      setError(data.error ?? "Login failed");
      return;
    }
    const rawNext = searchParams.get("next");
    const dest =
      typeof rawNext === "string" &&
      rawNext.startsWith("/") &&
      !rawNext.startsWith("//")
        ? rawNext
        : "/dashboard";
    window.location.assign(dest);
  }

  const signupHref =
    email.trim().length > 0
      ? `/signup?email=${encodeURIComponent(email.trim().toLowerCase())}`
      : "/signup";

  return (
    <form onSubmit={onSubmit} className="auth-form-card">
      <h1>Login</h1>
      {justRegistered ? (
        <p className="auth-form-hint" role="status">
          Account created. Sign in with the password you chose.
        </p>
      ) : null}
      {error ? <p className="auth-form-error">{error}</p> : null}
      <label className="auth-form-field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="auth-form-field">
        <span>Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" className="btn btn-primary">
        Sign in
      </button>
      <p className="auth-form-footer">
        <Link href={signupHref}>Create an account</Link>
      </p>
    </form>
  );
}
