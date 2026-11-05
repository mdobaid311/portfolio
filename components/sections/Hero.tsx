"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { scrollToSection } from "@/components/SmoothScroll";
import { profile } from "@/lib/data";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      document.fonts.ready.then(() => {
        const tl = gsap.timeline({ delay: 0.1 });

        const split = SplitText.create(".hero-title-line", {
          type: "chars,lines",
          mask: "lines",
        });

        tl.from(split.chars, {
          yPercent: 115,
          stagger: 0.028,
          duration: 1.1,
          ease: "power4.out",
        });

        tl.from(
          ".hero-fade",
          { autoAlpha: 0, y: 18, stagger: 0.09, duration: 0.8, ease: "power3.out" },
          "-=0.55"
        );

        tl.from(".hero-rule", { scaleX: 0, duration: 1, ease: "power3.inOut" }, "-=0.7");
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-svh flex-col justify-end overflow-clip"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 px-6 pb-10 pt-32 md:px-10 md:pb-14">
        <h1 className="display-type text-[clamp(2rem,10.2vw,11.5rem)] md:text-[clamp(3rem,10.8vw,11.5rem)] text-bone">
          <span className="hero-title-line block">Mohammed</span>
          <span className="hero-title-line block">Obaid</span>
        </h1>

        <div className="hero-rule mt-8 h-px w-full origin-left bg-line" />

        <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="hero-fade max-w-xl font-mono text-sm leading-relaxed text-dim md:text-base">
            {profile.tagline}
          </p>

          <div className="hero-fade flex shrink-0 items-center gap-4">
            <button
              onClick={() => scrollToSection("#work")}
              className="mono-label group relative overflow-clip border border-bone/25 px-6 py-4 text-bone transition-colors duration-300 hover:border-acid hover:text-ink"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-acid transition-transform duration-300 ease-out group-hover:scale-y-100" />
              <span className="relative">View projects ↓</span>
            </button>
            <a
              href={`mailto:${profile.email}`}
              className="mono-label border-b border-transparent pb-1 text-dim transition-colors hover:border-acid hover:text-bone"
            >
              Email me →
            </a>
          </div>
        </div>

        <div className="hero-fade mono-label mt-10 flex items-center justify-between text-faint">
          <span>{profile.location}</span>
          <span>{profile.coordinates}</span>
        </div>
      </div>
    </section>
  );
}
