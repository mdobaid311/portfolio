"use client";

import Link from "next/link";
import { scrollToSection } from "@/components/SmoothScroll";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/lib/data";

const LINKS = [
  { id: "#profile", label: "About" },
  { id: "#trajectory", label: "Experience" },
  { id: "#work", label: "Projects" },
  { id: "#arsenal", label: "Skills" },
  { id: "#contact", label: "Contact" },
];

const linkClass = "mono-label text-dim transition-colors hover:text-bone";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <div className="flex items-center justify-between border-b border-line bg-ink/80 px-6 py-4 backdrop-blur-md md:px-10">
        <button
          onClick={() => window.__lenis?.scrollTo(0, { duration: 1.4 })}
          className="display-type text-sm tracking-tight text-bone transition-colors hover:text-acid"
          aria-label="Back to top"
        >
          MO<span className="text-acid">.</span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <button key={link.id} onClick={() => scrollToSection(link.id)} className={linkClass}>
              {link.label}
            </button>
          ))}
          <Link href="/blog" className={linkClass}>
            Blog
          </Link>
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
    </header>
  );
}
