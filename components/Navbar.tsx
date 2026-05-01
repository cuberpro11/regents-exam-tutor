"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DarkModeToggle } from "@/components/DarkModeToggle";

type Props = {
  loggedIn: boolean;
};

export function Navbar({ loggedIn }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const homeHref = loggedIn ? "/dashboard" : "/";

  return (
    <nav className="sticky-nav">
      <button
        type="button"
        className={`nav-overlay${menuOpen ? " active" : ""}`}
        aria-label="Close menu"
        onClick={() => setMenuOpen(false)}
      />
      <div className="nav-container">
        <Link href="/" className="nav-brand">
          Regents Prep
        </Link>
        <button
          type="button"
          className={`hamburger-menu${menuOpen ? " active" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`nav-buttons-group${menuOpen ? " active" : ""}`}>
          <DarkModeToggle />
          {loggedIn ? (
            <>
              <Link
                href="/api/auth/logout"
                className="btn btn-secondary"
                onClick={() => setMenuOpen(false)}
              >
                Logout
              </Link>
              <Link
                href="/dashboard"
                className="btn btn-secondary"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="btn btn-secondary"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
        <div className={`nav-links-group${menuOpen ? " active" : ""}`}>
          <Link href={homeHref} className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/courses" className="nav-link" onClick={() => setMenuOpen(false)}>
            Courses
          </Link>
          <Link href="/blogs" className="nav-link" onClick={() => setMenuOpen(false)}>
            Blogs
          </Link>
          <Link href="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link href="/faq" className="nav-link" onClick={() => setMenuOpen(false)}>
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  );
}
