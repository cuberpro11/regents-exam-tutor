"use client";

import { useCallback, useEffect, useState } from "react";

function MoonGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const PEEK_MS = 2000;

const FAB_MIN_BOTTOM_PX = 12;
const FAB_FOOTER_GAP_PX = 11;

function updateThemeFabBottomFromFooter(): void {
  const footer = document.querySelector("footer.footer");
  const vv = window.visualViewport;
  const vh = vv?.height ?? window.innerHeight;
  let bottomPx = FAB_MIN_BOTTOM_PX;
  if (footer) {
    const r = footer.getBoundingClientRect();
    if (r.bottom > 0 && r.top < vh) {
      if (r.top >= 0) {
        bottomPx = Math.max(FAB_MIN_BOTTOM_PX, vh - r.top + FAB_FOOTER_GAP_PX);
      } else {
        bottomPx = Math.max(
          FAB_MIN_BOTTOM_PX,
          vh - Math.min(vh, r.bottom) + FAB_FOOTER_GAP_PX,
        );
      }
    }
  }
  document.documentElement.style.setProperty(
    "--theme-fab-bottom",
    `${bottomPx}px`,
  );
}

export function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  const [zoneHover, setZoneHover] = useState(false);
  const [peek, setPeek] = useState(true);
  const [fabFocus, setFabFocus] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(true);

  useEffect(() => {
    const enabled = localStorage.getItem("darkMode") === "enabled";
    if (enabled) {
      document.body.classList.add("dark-mode");
    }
    setDark(enabled);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const sync = () => setHoverCapable(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setPeek(false), PEEK_MS);
    return () => window.clearTimeout(id);
  }, []);

  /** Keep FAB above the site footer as it scrolls into view (fixed positioning). */
  useEffect(() => {
    let raf = 0;
    const onAlign = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateThemeFabBottomFromFooter();
      });
    };

    updateThemeFabBottomFromFooter();
    window.addEventListener("scroll", onAlign, { capture: true, passive: true });
    window.addEventListener("resize", onAlign, { passive: true });

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", onAlign, { passive: true });
      vv.addEventListener("scroll", onAlign, { passive: true });
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onAlign, { capture: true });
      window.removeEventListener("resize", onAlign);
      if (vv) {
        vv.removeEventListener("resize", onAlign);
        vv.removeEventListener("scroll", onAlign);
      }
    };
  }, []);

  const onPointerEnterZone = useCallback(() => {
    setZoneHover(true);
  }, []);

  const onPointerLeaveZone = useCallback(() => {
    setZoneHover(false);
  }, []);

  function toggle() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    setDark(isDark);
  }

  const revealed = !hoverCapable || peek || zoneHover || fabFocus;

  return (
    <div
      className={`theme-fab-zone${revealed ? " theme-fab-zone--revealed" : ""}`}
      onPointerEnter={onPointerEnterZone}
      onPointerLeave={onPointerLeaveZone}
    >
      <button
        type="button"
        id="dark-mode-toggle"
        className="theme-fab"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        title={dark ? "Light mode" : "Dark mode"}
        onClick={toggle}
        onFocus={() => setFabFocus(true)}
        onBlur={() => setFabFocus(false)}
      >
        <span className="theme-fab__glow" aria-hidden />
        <span
          className={`theme-fab__icon-wrap${dark ? " theme-fab__icon-wrap--dark" : ""}`}
        >
          <MoonGlyph className="theme-fab__moon" />
          <SunGlyph className="theme-fab__sun" />
        </span>
      </button>
    </div>
  );
}
