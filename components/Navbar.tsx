"use client";

import { useEffect, useState } from "react";
import { onAnchorClick } from "@/components/SmoothScroll";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/lib/data";

const LINKS = [
  { id: "work", label: "Projects" },
  { id: "trajectory", label: "Experience" },
  { id: "profile", label: "About" },
  { id: "arsenal", label: "Skills" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

const linkClass =
  "mono-label whitespace-nowrap text-dim transition-colors hover:text-bone aria-[current=true]:text-acid";

export default function Navbar() {
  const [active, setActive] = useState("");

  // Highlight the section sitting around the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const items = LINKS.map((link) => (
    <a
      key={link.id}
      href={`#${link.id}`}
      onClick={onAnchorClick}
      aria-current={active === link.id}
      className={linkClass}
    >
      {link.label}
    </a>
  ));

  return (
    <header className="fixed inset-x-0 top-0 z-[80] border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#hero"
          onClick={onAnchorClick}
          className="display-type text-sm tracking-tight text-bone transition-colors hover:text-acid"
          aria-label="Back to top"
        >
          MO<span className="text-acid">.</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {items}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={`mailto:${profile.email}`}
            className="mono-label flex items-center gap-2 border border-line px-3 py-2 text-bone transition-colors hover:border-acid hover:text-acid"
          >
            <span className="size-1.5 rounded-full bg-acid" />
            <span className="hidden sm:inline">Open to work</span>
            <span className="sm:hidden">Hire</span>
          </a>
        </div>
      </div>

      {/* phones: the same links as a swipeable strip, since there is no room for the full nav */}
      <nav
        aria-label="Sections"
        className="flex gap-6 overflow-x-auto border-t border-line px-6 py-3 [scrollbar-width:none] md:hidden"
      >
        {items}
      </nav>
    </header>
  );
}
