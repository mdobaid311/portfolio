"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

/** "HH:MM" to minutes since 18:00, so the night counts up across midnight. */
const toShift = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return (h * 60 + m + 360) % 1440;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The night's clock: every [data-time] element stamps a time at its top edge. A point that sweeps the
 * page, top of the viewport at the start and bottom at the end, reads the time between neighbouring
 * stamps, so the clock starts on the first stamp and ends on the last.
 */
export default function ShiftClock({ className = "" }: { className?: string }) {
  const out = useRef<HTMLSpanElement>(null);
  const stamps = useRef<{ top: number; min: number }[]>([]);
  const { scrollY } = useScroll();

  const paint = (y: number) => {
    const s = stamps.current;
    if (!out.current || !s.length) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = y + innerHeight * (max > 0 ? Math.min(1, y / max) : 0);

    let min = s[s.length - 1].min;
    for (let i = 0; i < s.length; i++) {
      if (p < s[i].top) {
        const a = s[i - 1] ?? s[i];
        min = a.min + ((s[i].min - a.min) * Math.max(0, p - a.top)) / (s[i].top - a.top || 1);
        break;
      }
    }

    const t = (Math.floor(min) + 1080) % 1440;
    out.current.textContent = `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
  };

  useMotionValueEvent(scrollY, "change", paint);

  useEffect(() => {
    const measure = () => {
      stamps.current = [...document.querySelectorAll<HTMLElement>("[data-time]")]
        .map((el) => ({ top: el.getBoundingClientRect().top + window.scrollY, min: toShift(el.dataset.time!) }))
        .sort((a, b) => a.top - b.top);
      paint(window.scrollY);
    };
    measure();
    // The page grows as fonts, images and sections settle; re-read the stamps whenever it does.
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  return (
    <span ref={out} aria-hidden="true" className={`font-mono text-[0.8rem] tabular-nums ${className}`}>
      18:30
    </span>
  );
}
