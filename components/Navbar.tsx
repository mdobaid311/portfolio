"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { scrollToSection } from "@/components/SmoothScroll";
import { profile } from "@/lib/data";

const LINKS = [
  { id: "#profile", label: "Profile", index: "01" },
  { id: "#trajectory", label: "Trajectory", index: "02" },
  { id: "#work", label: "Work", index: "03" },
  { id: "#arsenal", label: "Arsenal", index: "04" },
  { id: "#contact", label: "Contact", index: "05" },
];

export default function Navbar({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!started || !ref.current) return;
    const tween = gsap.fromTo(
      ref.current,
      { yPercent: -120, y: 0 },
      { yPercent: 0, y: 0, duration: 0.9, ease: "power3.out", delay: 0.15 }
    );
    return () => {
      tween.kill();
    };
  }, [started]);

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-[80] -translate-y-[120%]"
    >
      <div className="flex items-center justify-between border-b border-line bg-ink/70 px-6 py-4 backdrop-blur-md md:px-10">
        <button
          onClick={() => window.__lenis?.scrollTo(0, { duration: 1.4 })}
          className="display-type text-sm tracking-tight text-bone transition-colors hover:text-acid"
          aria-label="Back to top"
        >
          MO<span className="text-acid">.</span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="mono-label group flex items-baseline gap-1.5 text-dim transition-colors hover:text-bone"
            >
              <span className="text-[9px] text-faint transition-colors group-hover:text-acid">
                {link.index}
              </span>
              {link.label}
            </button>
          ))}
          <Link
            href="/blog"
            className="mono-label group flex items-baseline gap-1.5 text-dim transition-colors hover:text-bone"
          >
            <span className="text-[9px] text-faint transition-colors group-hover:text-acid">06</span>
            Blog
          </Link>
        </nav>

        <a
          href={`mailto:${profile.email}`}
          className="mono-label group flex items-center gap-2 border border-line px-3 py-2 text-bone transition-colors hover:border-acid hover:text-acid"
        >
          <span className="size-1.5 rounded-full bg-acid motion-safe:animate-pulse" />
          <span className="hidden sm:inline">Open to work</span>
          <span className="sm:hidden">Hire</span>
        </a>
      </div>
    </header>
  );
}
