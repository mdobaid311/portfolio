"use client";

import { motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/Reveal";
import { EASE_IO, EXPO_OUT } from "@/lib/data";

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

/** A 1px rule that draws left to right the first time it scrolls into view. Pass the colour and position as className. */
export function Rule({ className = "bg-fg" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewport}
      transition={{ duration: reduce ? 0 : 0.9, ease: EASE_IO }}
      className={`block h-px origin-left ${className}`}
    />
  );
}

/** Display-size section title with a mono index, over a full-width ink rule that draws in. */
export default function SectionHead({ index, title, aside }: { index: string; title: string; aside?: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="flex items-end justify-between gap-6 pb-4 md:pb-5">
        {/* Padding keeps descenders inside the mask; the negative margin gives the space back. */}
        <Reveal variant="mask" className="-mb-[0.14em] pb-[0.14em]">
          <h2 className="display-type text-section">
            <span className="mr-[0.4em] align-top font-mono text-sm font-normal tracking-normal text-dim">{index}</span>
            {title}
          </h2>
        </Reveal>
        {aside && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.15, ease: EXPO_OUT }}
            className="shrink-0 pb-1 text-sm text-dim"
          >
            {aside}
          </motion.div>
        )}
      </div>
      <Rule />
    </div>
  );
}
