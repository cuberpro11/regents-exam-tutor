"use client";

import { useEffect } from "react";

export function FadeOnScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const faders = document.querySelectorAll(".fade-in");
    const options = {
      threshold: 0,
      rootMargin: "0px 0px -100px 0px",
    };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, options);
    faders.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [children]);

  return <>{children}</>;
}
