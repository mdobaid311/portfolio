"use client";

import { useEffect } from "react";
import type { MouseEvent } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}

export function scrollToSection(selector: string) {
  const target = document.querySelector(selector);
  if (!target) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
  }
}

/**
 * onClick for in-page <a href="#id"> links. The href keeps working without JS (and for
 * open-in-new-tab, copy-link); with JS the jump goes through Lenis and the hash is kept.
 */
export function onAnchorClick(e: MouseEvent<HTMLAnchorElement>) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  const hash = e.currentTarget.hash;
  if (!hash || !document.querySelector(hash)) return;
  e.preventDefault();
  scrollToSection(hash);
  history.replaceState(null, "", hash);
}
