"use client";

import { motion, useReducedMotion } from "motion/react";
import { EXPO_OUT } from "@/lib/data";

/** Fades and lifts its children into place the first time they scroll into view. */
export default function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : delay, ease: EXPO_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
