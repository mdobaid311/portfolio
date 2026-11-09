"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EXPO_OUT, profile } from "@/lib/data";

/**
 * Server renders the final number. Numbers worth counting drop to zero while still off screen,
 * then count up on scroll-in; single digits just stay put.
 */
function Count({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const counts = value >= 10 && reduce === false;

  useEffect(() => {
    const el = ref.current;
    if (!el || !counts) return;
    if (!inView) {
      el.textContent = `0${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: EXPO_OUT,
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, counts, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums text-accent">
      {value}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="gutter ">
      <div className="grid gap-6 border-t border-rule pt-6 md:grid-cols-4">
        <h2 className="text-sm text-muted">In short</h2>
        <p className="display-type text-[clamp(1.9rem,4.2vw,4.25rem)] leading-[1.04] tracking-[-0.035em] md:col-span-3">
          <Count value={3} suffix="+" /> years shipping production code. <Count value={4} /> platforms
          running in production. <Count value={100} suffix="+" /> public repositories, and{" "}
          <Count value={1} /> Kubernetes cluster I host myself.
        </p>
      </div>

      <div className="mt-24 grid gap-6 border-t border-rule pt-6 md:mt-32 md:grid-cols-4">
        <h2 className="text-sm text-muted">Tools I reach for</h2>
        <p className="text-xl leading-relaxed md:col-span-3 md:text-2xl">
          {profile.stack.map((t, i) => (
            <span key={t}>
              {t}
              {i < profile.stack.length - 1 && <span className="text-muted">, </span>}
            </span>
          ))}
          <span className="text-muted">.</span>
        </p>
      </div>
    </section>
  );
}
