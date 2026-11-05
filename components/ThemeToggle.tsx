"use client";

import { useEffect } from "react";

// The inline script in layout.tsx sets data-theme before paint; the label below
// follows it through CSS, so this component holds no state.
function toggle() {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

export default function ThemeToggle() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "t" || e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement).closest("input, textarea, select, [contenteditable]")) return;
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="mono-label flex items-center gap-2 border border-line px-3 py-2 text-dim transition-colors hover:border-acid hover:text-bone"
    >
      <span className="in-data-[theme=light]:hidden">Light</span>
      <span className="hidden in-data-[theme=light]:inline">Dark</span>
      <kbd className="hidden border border-line px-1 text-[10px] sm:inline">T</kbd>
    </button>
  );
}
