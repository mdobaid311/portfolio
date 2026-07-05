"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const BOOT_LINES = [
  "> init portfolio.sys — v3.0.0",
  "> loading modules ... react@19 next@16 gsap@3.15",
  "> establishing uplink ... HYD // 17.38N 78.48E",
  "> env: HIREABLE=true CAFFEINE=high",
  "> all systems nominal",
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setGone(true);
        onDone();
        return;
      }

      const counter = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          setGone(true);
          onDone();
        },
      });

      tl.to(".boot-line", {
        autoAlpha: 1,
        duration: 0.01,
        stagger: 0.28,
        ease: "none",
      });

      tl.to(
        counter,
        {
          value: 100,
          duration: 1.9,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(
                Math.round(counter.value)
              ).padStart(3, "0");
            }
          },
        },
        0
      );

      tl.to(
        barRef.current,
        { scaleX: 1, duration: 1.9, ease: "power2.inOut" },
        0
      );

      tl.to(rootRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        delay: 0.25,
      });
    },
    { scope: rootRef }
  );

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink p-6 md:p-10"
    >
      <div className="mono-label text-dim">
        MO — MISSION CONTROL
      </div>

      <div className="flex flex-col gap-1.5 font-mono text-xs text-dim md:text-sm">
        {BOOT_LINES.map((line) => (
          <p key={line} className="boot-line opacity-0">
            {line.includes("nominal") ? (
              <span className="text-acid">{line}</span>
            ) : (
              line
            )}
          </p>
        ))}
      </div>

      <div className="flex items-end justify-between gap-8">
        <div className="mb-2 h-px flex-1 overflow-clip bg-line">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 bg-acid"
          />
        </div>
        <span
          ref={counterRef}
          className="display-type text-7xl text-bone md:text-9xl"
        >
          000
        </span>
      </div>
    </div>
  );
}
