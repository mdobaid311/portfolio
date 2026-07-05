"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      document.body.classList.add("no-custom-cursor");
      return;
    }

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
    };

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest(
        "a, button, [data-cursor]"
      );
      gsap.to(ring, {
        scale: interactive ? 2.2 : 1,
        borderColor: interactive ? "var(--color-acid)" : "var(--color-dim)",
        duration: 0.3,
      });
      gsap.to(dot, {
        backgroundColor: interactive ? "var(--color-acid)" : "var(--color-bone)",
        duration: 0.3,
      });
    };

    const onLeave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone opacity-0"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dim opacity-0"
      />
    </>
  );
}
