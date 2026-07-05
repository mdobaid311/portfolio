"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { scrollToSection } from "@/components/SmoothScroll";
import { profile } from "@/lib/data";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export default function Hero({ started }: { started: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!started) return;

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
          {
            autoAlpha: 0,
            y: 18,
            stagger: 0.09,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.55"
        );

        tl.from(
          ".hero-rule",
          { scaleX: 0, duration: 1, ease: "power3.inOut" },
          "-=0.7"
        );
      });
    },
    { scope: rootRef, dependencies: [started] }
  );

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-svh flex-col justify-end overflow-clip"
    >
      {/* WebGL galaxy */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="hero-vignette pointer-events-none absolute inset-0" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />

      {/* side rail */}
      <div className="mono-label pointer-events-none absolute right-6 top-1/2 hidden origin-right -translate-y-1/2 rotate-90 whitespace-nowrap text-faint lg:block">
        FULL-STACK ENGINEER — EST. 2021 — HYDERABAD, IN
      </div>

      <div className="relative z-10 px-6 pb-10 pt-32 md:px-10 md:pb-14">
        <div className="hero-fade mono-label mb-6 flex items-center gap-3 text-dim">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-acid" />
          </span>
          <span>
            Available for work —{" "}
            <span className="hidden sm:inline">{profile.location}</span>
            <span className="sm:hidden">HYD, IN</span>
          </span>
        </div>

        <h1 className="display-type text-[clamp(2rem,10.2vw,11.5rem)] md:text-[clamp(3rem,12.5vw,11.5rem)] text-bone">
          <span className="hero-title-line block">Mohammed</span>
          <span className="hero-title-line display-outline block">Obaid</span>
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
              <span className="relative">View work ↓</span>
            </button>
            <a
              href={`mailto:${profile.email}`}
              className="mono-label border-b border-transparent pb-1 text-dim transition-colors hover:border-acid hover:text-bone"
            >
              Open channel →
            </a>
          </div>
        </div>

        <div className="hero-fade mono-label mt-10 flex items-center justify-between text-faint">
          <span>{profile.coordinates}</span>
          <span className="hidden sm:block">SYS.PORTFOLIO — V3.0</span>
          <span className="flex items-center gap-2">
            Scroll
            <span className="inline-block animate-bounce">↓</span>
          </span>
        </div>
      </div>
    </section>
  );
}
