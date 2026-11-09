"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/lib/data";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // no clipboard access: the mailto link and the visible address still work
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="mono-label w-fit border border-line px-3 py-2 text-dim transition-colors hover:border-acid hover:text-acid"
    >
      <span aria-live="polite">{copied ? "Copied ✓" : "Copy email"}</span>
    </button>
  );
}

function LocalClock() {
  // Real content until the first tick, so the footer never shows a placeholder.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: profile.timezone,
      }).format(new Date());
    const update = () => setTime(format());
    const raf = requestAnimationFrame(update);
    const id = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  return <span suppressHydrationWarning>{time ? `${time} IST` : "Hyderabad · India Standard Time"}</span>;
}

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const magnetRef = useRef<HTMLAnchorElement>(null);

  // magnetic CTA
  useGSAP(
    () => {
      const magnet = magnetRef.current;
      if (
        !magnet ||
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      const xTo = gsap.quickTo(magnet, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(magnet, "y", { duration: 0.4, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        const rect = magnet.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist < 220) {
          xTo(dx * 0.28);
          yTo(dy * 0.28);
        } else {
          xTo(0);
          yTo(0);
        }
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative flex min-h-svh flex-col justify-between overflow-clip border-t border-line px-6 pt-28 md:px-10 md:pt-36"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative">
        <h2 className="display-type text-[clamp(2.2rem,10vw,10rem)] text-bone">
          <span className="block">Have a hard</span>
          <span className="block text-acid">problem?</span>
        </h2>

        <div className="mt-14 flex flex-col items-start gap-12 md:flex-row md:items-center md:gap-20">
          <a
            ref={magnetRef}
            href={`mailto:${profile.email}`}
            className="group relative inline-flex items-center justify-center"
            data-cursor
          >
            <span className="mono-label flex size-36 items-center justify-center rounded-full border border-acid/50 text-center leading-relaxed text-acid transition-colors duration-300 group-hover:bg-acid group-hover:text-ink md:size-44">
              Email me
              <br />→
            </span>
          </a>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-lg text-bone underline decoration-line underline-offset-8 transition-colors hover:decoration-acid md:text-2xl"
            >
              {profile.email}
            </a>
            <p className="max-w-md font-display text-base leading-relaxed text-dim">
              I&apos;m at {profile.company} today. Open to freelance projects and full-time
              roles with interesting problems.
            </p>
            <CopyEmail />
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="relative mt-24 border-t border-line py-8">
        <div className="grid gap-6 md:grid-cols-4 md:items-center">
          <div className="flex flex-col gap-1.5">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label group flex items-baseline gap-2 text-dim transition-colors hover:text-acid"
              >
                <span className="text-faint">{social.label}</span>
                <span>{social.handle}</span>
              </a>
            ))}
          </div>

          <div className="mono-label text-faint">
            <p>{profile.coordinates}</p>
            <p className="mt-1.5 text-dim">
              <LocalClock />
            </p>
          </div>

          <div className="mono-label text-faint">
            <p>Next.js 16 / GSAP</p>
            <p className="mt-1.5">Designed and built by me</p>
          </div>

          <div className="mono-label text-faint md:text-right">
            <p>© {new Date().getFullYear()} Mohammed Obaid</p>
          </div>
        </div>
      </footer>
    </section>
  );
}
