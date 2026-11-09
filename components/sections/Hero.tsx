"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { profile } from "@/lib/data";

function Footage({ className, playing }: { className: string; playing: (v: HTMLVideoElement | null) => void }) {
  return (
    <video ref={playing} aria-hidden muted loop playsInline preload="metadata" poster="/hero-poster.jpg" className={className}>
      <source src="/hero.webm" type="video/webm" />
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}

/** One masked line of the headline; rises into place on load. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <span className="block animate-rise" style={{ animationDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  );
}

export default function Hero() {
  const videos = useRef<HTMLVideoElement[]>([]);
  const plate = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: plate, offset: ["start end", "start 15%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);

  // No autoplay attribute: play only when motion is allowed and data saver is off.
  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || saveData) return;
    videos.current.forEach((v) => v.play().catch(() => { }));
  }, []);

  const collect = (v: HTMLVideoElement | null) => {
    if (v && !videos.current.includes(v)) videos.current.push(v);
  };

  return (
    <section id="top">
      <div className="gutter pt-[16vh] md:pt-[20vh]">
        <h1 className="display-type text-[8.6vw] md:text-[min(7.2vw,138px)]">
          <Line delay={0}>I build web software</Line>
          <Line delay={90}>
            end to end,{" "}
            <span className="inline-block h-[0.74em] w-[2.1em] animate-grow overflow-hidden rounded-full bg-ink align-[-0.04em] [animation-delay:500ms]">
              <Footage playing={collect} className="h-full w-full object-cover object-[38%_30%] grayscale" />
            </span>
          </Line>
          <Line delay={180}>
            mostly <em className="font-medium">after dark.</em>
          </Line>
        </h1>

        <div className="mt-14 grid gap-8 text-lg leading-relaxed md:mt-20 md:grid-cols-4 md:gap-6">
          <p className="flex items-start gap-2.5 text-sm">
            <span className="relative mt-[0.4em] flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            Available for new work
          </p>
          <p className="max-w-[46ch] md:col-span-2">{profile.bio}</p>
          <p className="flex gap-5 text-sm md:justify-end">
            <a href={`mailto:${profile.email}`} className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
              Email
            </a>
            <a href="https://github.com/mdobaid311" target="_blank" rel="noopener noreferrer" className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
              GitHub ↗
            </a>
          </p>
        </div>
      </div>

      <figure className="mt-20 gutter md:mt-28 ">
        <motion.div ref={plate} style={{ scale: reduce ? 1 : scale }} className="aspect-[16/9] origin-top overflow-hidden rounded-[4px] bg-ink">
          <Footage
            playing={collect}
            className="h-full w-full object-cover [filter:grayscale(1)_contrast(1.12)]"
          />
        </motion.div>
        <figcaption className="mt-3 flex justify-between gap-6 text-sm text-muted">
          <span>At the desk in Hyderabad, a little after 2 a.m.</span>
          <span className="hidden sm:inline">Fig. 1</span>
        </figcaption>
      </figure>
    </section>
  );
}
