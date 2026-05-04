"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SignupForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const q = searchParams.get("email");
    if (typeof q === "string" && q.trim()) {
      setEmail(q.trim());
    }
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, confirm_password: confirm }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Signup failed");
      return;
    }
    const em = email.trim().toLowerCase();
    window.location.assign(
      `/login?registered=1&email=${encodeURIComponent(em)}`,
    );
  }

  return (
    <form onSubmit={onSubmit} className="auth-form-card">
      <h1>Sign up</h1>
      {error ? <p className="auth-form-error">{error}</p> : null}
      <p className="auth-form-hint">Passwords must be at least 8 characters.</p>
      <label className="auth-form-field">
        <span>Email</span>
        <input
          type="email"
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
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className="auth-form-field">
        <span>Confirm password</span>
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </label>
      <button type="submit" className="btn btn-primary">
        Create account
      </button>
      <p className="auth-form-footer">
        <Link href="/login">Already have an account? Sign in</Link>
      </p>
    </form>
  );
}
