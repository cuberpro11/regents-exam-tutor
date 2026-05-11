"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  loggedIn: boolean;
};

function mainNavActive(
  pathname: string | null,
  href: string,
  homeHref: string,
): boolean {
  if (!pathname) return false;
  if (href === homeHref) {
    return pathname === homeHref || (homeHref === "/" && pathname === "/");
  }
  if (href === "/courses") {
    return pathname === "/courses" || pathname.startsWith("/courses/");
  }
  if (href === "/about") {
    return pathname === "/about" || pathname.startsWith("/about/");
  }
  if (href === "/faq") {
    return pathname === "/faq" || pathname.startsWith("/faq/");
  }
  return false;
}

export function Navbar({ loggedIn: initialLoggedIn }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);

  useEffect(() => {
    setLoggedIn(initialLoggedIn);
  }, [initialLoggedIn]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session", {
      credentials: "include",
      cache: "no-store",
    })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<{ loggedIn?: boolean }>;
      })
      .then((d) => {
        if (!cancelled && typeof d.loggedIn === "boolean") {
          setLoggedIn(d.loggedIn);
        }
      })
      .catch(() => {
        if (!cancelled) setLoggedIn(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pathname, initialLoggedIn]);

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

  const loginHref =
    pathname && pathname !== "/login" && pathname !== "/signup"
      ? `/login?next=${encodeURIComponent(
          `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
        )}`
      : "/login";

  const closeMenu = () => setMenuOpen(false);

  const navMain = (
    <>
      <Link
        href={homeHref}
        className={`nav-link${mainNavActive(pathname, homeHref, homeHref) ? " nav-link--active" : ""}`}
        aria-current={
          mainNavActive(pathname, homeHref, homeHref) ? "page" : undefined
        }
        onClick={closeMenu}
      >
        Home
      </Link>
      <Link
        href="/courses"
        className={`nav-link${mainNavActive(pathname, "/courses", homeHref) ? " nav-link--active" : ""}`}
        aria-current={
          mainNavActive(pathname, "/courses", homeHref) ? "page" : undefined
        }
        onClick={closeMenu}
      >
        Courses
      </Link>
      <Link
        href="/about"
        className={`nav-link${mainNavActive(pathname, "/about", homeHref) ? " nav-link--active" : ""}`}
        aria-current={
          mainNavActive(pathname, "/about", homeHref) ? "page" : undefined
        }
        onClick={closeMenu}
      >
        About Us
      </Link>
      <Link
        href="/faq"
        className={`nav-link${mainNavActive(pathname, "/faq", homeHref) ? " nav-link--active" : ""}`}
        aria-current={
          mainNavActive(pathname, "/faq", homeHref) ? "page" : undefined
        }
        onClick={closeMenu}
      >
        FAQ
      </Link>
    </>
  );

  return (
    <nav className="sticky-nav">
      <button
        type="button"
        className={`nav-overlay${menuOpen ? " active" : ""}`}
        aria-label="Close menu"
        onClick={closeMenu}
      />
      <div className="nav-container">
        <Link href="/" className="nav-brand" onClick={closeMenu}>
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
          {loggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="nav-auth-btn nav-auth-btn--primary"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <a
                href="/api/auth/logout"
                className="nav-auth-btn nav-auth-btn--ghost"
                onClick={closeMenu}
              >
                Logout
              </a>
            </>
          ) : (
            <Link
              href={loginHref}
              className="nav-auth-btn nav-auth-btn--primary"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
        </div>
        <div className={`nav-links-group${menuOpen ? " active" : ""}`}>
          {navMain}
        </div>
      </div>
    </nav>
  );
}
