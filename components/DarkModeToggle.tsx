"use client";

import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [icon, setIcon] = useState("🌙");

  useEffect(() => {
    const enabled = localStorage.getItem("darkMode") === "enabled";
    if (enabled) {
      document.body.classList.add("dark-mode");
      setIcon("☀️");
    }
  }, []);

  function toggle() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    setIcon(isDark ? "☀️" : "🌙");
  }

  return (
    <button
      type="button"
      id="dark-mode-toggle"
      className="dark-mode-toggle"
      aria-label="Toggle dark mode"
      onClick={toggle}
    >
      <span className="dark-mode-icon">{icon}</span>
    </button>
  );
}
