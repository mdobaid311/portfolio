"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({ enabled }: { enabled: boolean }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
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

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (enabled) {
      lenis.start();
    } else {
      lenis.stop();
    }
  }, [enabled]);

  return null;
}

export function scrollToSection(selector: string) {
  const target = document.querySelector(selector);
  if (!target) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
