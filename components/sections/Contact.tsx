"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { profile } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { clock, useNow } from "@/components/WorldClocks";

const SUN_BAND = "22svh";

/**
 * Rendered after <main>, so it is the page's contentinfo landmark. It is the page's last section: a paper footer
 * that is already in place underneath the dark page. The fixed layer stays put while <main>'s bottom edge lifts
 * past it, and the clip on the footer keeps the layer inside the footer's own box.
 *
 * Below 768px wide, under 640px tall, or with reduced motion, the layer is not fixed: a normal block.
 * Layout is pure CSS (the media query repeated in each class); only the sun and the LED hand-off use scroll.
 *
 * Day tone, written out in literal paper / ink / grey so it never depends on the tone tokens.
 */
export default function Contact() {
  const reduce = useReducedMotion();
  const footer = useRef<HTMLElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const now = useNow();

  // The sun rises while the curtain lifts. The same progress fades the header LED: the dot has become the sun.
  const { scrollYProgress } = useScroll({ target: footer, offset: ["start end", "end end"] });
  const sunY = useTransform(scrollYProgress, [0, 1], ["21svh", "0svh"]);
  const handOff = (v: number) => document.documentElement.style.setProperty("--sun", String(Math.min(1, Math.max(0, v))));
  useMotionValueEvent(scrollYProgress, "change", handOff);
  useEffect(() => {
    handOff(scrollYProgress.get());
    return () => void document.documentElement.style.removeProperty("--sun");
  }, [scrollYProgress]);

  // A fixed layer never scrolls into view by itself, so keyboard focus would land on something still under the
  // dark page. Scroll to the end first so the footer is uncovered.
  const uncover = () => {
    const top = footer.current!.getBoundingClientRect().top;
    if (layer.current && getComputedStyle(layer.current).position === "fixed" && top > 1) {
      window.scrollBy({ top, behavior: "instant" });
    }
  };

  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      return; // Clipboard blocked: the address is still a link right beside the button.
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      ref={footer}
      id="contact"
      data-time="06:12"
      onFocus={uncover}
      className="relative min-h-svh bg-paper text-ink [@media(min-width:48rem)_and_(min-height:40rem)_and_(prefers-reduced-motion:no-preference)]:h-svh [@media(min-width:48rem)_and_(min-height:40rem)_and_(prefers-reduced-motion:no-preference)]:[clip-path:inset(0)]"
    >
      <div
        ref={layer}
        className="gutter relative flex min-h-svh flex-col bg-paper pb-[22svh] pt-20 text-ink md:pt-24 [@media(min-width:48rem)_and_(min-height:40rem)_and_(prefers-reduced-motion:no-preference)]:fixed [@media(min-width:48rem)_and_(min-height:40rem)_and_(prefers-reduced-motion:no-preference)]:inset-x-0 [@media(min-width:48rem)_and_(min-height:40rem)_and_(prefers-reduced-motion:no-preference)]:bottom-0 [@media(min-width:48rem)_and_(min-height:40rem)_and_(prefers-reduced-motion:no-preference)]:h-svh"
      >
        <p className="text-[#57534e]">Sun&rsquo;s up. What are we building?</p>

        <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3">
          {/* Rises from behind a clipped edge like the hero headline, so the page ends the way it opened.
              The padding keeps descenders inside the mask; the negative margin gives the space back. */}
          <Reveal variant="mask" className="-mb-[0.2em] min-w-0 pb-[0.2em] text-mega">
            <a
              href={`mailto:${profile.email}`}
              className="display-type link-draw block w-fit max-w-full pb-[0.06em] [overflow-wrap:anywhere] [--line:0.05em] hover:text-accent"
            >
              {profile.email}
            </a>
          </Reveal>
          <button
            type="button"
            onClick={copy}
            className="hit-area mb-2 shrink-0 rounded-full border border-ink/30 px-4 py-1.5 text-sm transition-colors hover:bg-ink hover:text-paper md:mb-3"
          >
            {copied ? (
              "Copied"
            ) : (
              <>
                Copy<span className="sr-only"> email address</span>
              </>
            )}
          </button>
          <span aria-live="polite" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>

        <p className="mt-6 font-mono text-sm tabular-nums">
          It is {now ? clock("Asia/Kolkata", now) : "--:--"} in Hyderabad.
          {/* TODO(confirm): follow with a status from the Hyderabad hour; the owner has not confirmed these hours or lines:
              09-18 "At the day job. I reply in the evening." / 18-21 "Off the clock." / 21-03 "At the desk." / 03-09 "Asleep. I reply by morning." */}
        </p>

        <div className="mt-10 grid gap-8 text-sm leading-relaxed text-[#57534e] mb-10 md:mt-14 md:grid-cols-4 md:gap-6">
          <ul className="space-y-2 text-ink">
            {profile.socials.map((s) => {
              const external = s.href.startsWith("http");
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="hit-area transition-colors hover:text-[#b02c17]"
                  >
                    {s.label}{" "}
                    {external && (
                      <span aria-hidden className="arrow-ne">
                        ↗
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <p>
            {profile.location}
            <br />
            {profile.coordinates}
          </p>
          <p className="md:col-span-2">
            Set in Schibsted Grotesk. Built with Next.js, Tailwind CSS, Motion and Lenis. The footage is me at my desk, shot on a phone.
          </p>
        </div>

        <div className="mt-auto flex justify-between border-t border-ink/15 pt-5 text-sm text-[#57534e]">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#top" className="transition-colors hover:text-ink">
            Back to top{" "}
            <span aria-hidden className="arrow-n">
              ↑
            </span>
          </a>
        </div>

        {/* The sun. The last 22svh holds no text; the disc rises into it and stops with about 20svh showing. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden" style={{ height: SUN_BAND }}>
          <motion.div
            className="absolute left-1/2 top-[2svh] aspect-square -translate-x-1/2 rounded-full bg-accent"
            style={{ width: "min(70vw, 900px)", y: reduce ? 0 : sunY }}
          />
        </div>
      </div>
    </footer>
  );
}
