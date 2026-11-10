"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { EXPO_OUT } from "@/lib/data";

type Variant = "lift" | "mask" | "window";

// The wrapper watches the viewport; an inner layer (mask, window) follows through shared variant names.
const outer: Record<Variant, Variants> = {
  lift: { hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } },
  mask: { hidden: {}, shown: {} },
  window: { hidden: { clipPath: "inset(6% 6% 6% 6% round 4px)" }, shown: { clipPath: "inset(0% 0% 0% 0% round 4px)" } },
};
const inner: Partial<Record<Variant, Variants>> = {
  mask: { hidden: { y: "105%" }, shown: { y: 0 } },
  window: { hidden: { scale: 1.06 }, shown: { scale: 1 } },
};

/**
 * Animates its children in the first time they scroll into view.
 * lift: fade and rise. mask: rise from behind a clipped edge, like the hero headline.
 * window: the frame opens from a smaller rounded window while the picture settles, echoing the hero video.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "lift",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
}) {
  const reduce = useReducedMotion();
  const transition = { duration: reduce ? 0 : variant === "lift" ? 0.6 : 0.9, delay: reduce ? 0 : delay, ease: EXPO_OUT };
  const layer = inner[variant];
  return (
    <motion.div
      data-reveal
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={outer[variant]}
      transition={transition}
      className={`${variant === "mask" ? "overflow-hidden" : ""} ${className}`}
    >
      {layer ? (
        <motion.div data-reveal variants={layer} transition={transition}>
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}
