"use client";

import { Fragment, useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * One paragraph whose words light up in reading order as it crosses the viewport (the `.lit` rule in globals.css).
 * Words inside any of `lit` stay fully lit and take the foreground colour. Spaces stay real text between the spans,
 * so screen readers and copy-paste see a normal sentence. Reduced motion is handled in CSS (everything lit).
 */
export default function LitText({ text, lit = [], className = "" }: { text: string; lit?: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const set = (v: number) => ref.current?.style.setProperty("--p", String(Math.min(1, Math.max(0, v))));
  useMotionValueEvent(scrollYProgress, "change", set);
  useEffect(() => set(scrollYProgress.get()));

  // Character ranges of the always-lit phrases, matched on word boundaries so "1" does not hit inside "100+".
  const ranges: [number, number][] = [];
  for (const phrase of lit) {
    for (const m of text.matchAll(new RegExp(`(?<!\\w)${escape(phrase)}(?!\\w)`, "g"))) ranges.push([m.index, m.index + phrase.length]);
  }
  const words = [...text.matchAll(/\S+/g)];

  return (
    <p ref={ref} className={`lit ${className}`} style={{ "--n": words.length } as React.CSSProperties}>
      {words.map((w, i) => {
        const on = ranges.some(([a, b]) => w.index >= a && w.index < b);
        return (
          <Fragment key={i}>
            <span className={on ? "text-fg" : undefined} style={{ "--i": i, ...(on && { opacity: 1 }) } as React.CSSProperties}>
              {w[0]}
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </p>
  );
}
