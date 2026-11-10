"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EXPO_OUT, type Project } from "@/lib/data";

/** The monitor: a lit 16:10 screen in the dark room. Children fill it. */
export const FRAME =
  "relative aspect-[16/10] overflow-hidden rounded-[6px] bg-[#0a0a0a] shadow-[0_0_0_1px_rgb(238_235_228/0.08),0_40px_120px_-40px_rgb(238_235_228/0.18)]";

/** FRAME as a component, for server components (a string exported from a client module is not readable there). */
export function Frame({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`${FRAME} ${className}`}>{children}</div>;
}

function Box({ x, y, w, h, title, sub }: { x: number; y: number; w: number; h: number; title: string; sub?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} className="fill-ink stroke-paper/40" />
      <text x={x + 14} y={y + (sub ? 26 : h / 2 + 5)} className="fill-paper text-[14px]">
        {title}
      </text>
      {sub && (
        <text x={x + 14} y={y + 46} className="fill-paper/60 text-[11px]">
          {sub}
        </text>
      )}
    </g>
  );
}

/** Three services, ZooKeeper for Base62 ranges, Redis for hot URLs, a MongoDB replica set, on Kubernetes. */
function MiniUrl({ label }: { label: string }) {
  const wire = "fill-none stroke-paper/40";
  return (
    <svg viewBox="0 0 640 480" role="img" aria-label={label} className="h-full w-full font-mono">
      <rect x="156" y="56" width="460" height="368" rx="4" strokeDasharray="4 5" className="fill-none stroke-paper/25" />
      <text x="176" y="86" className="fill-paper/55 text-[11px]">
        kubernetes · self-hosted · multi-node
      </text>

      <path d="M120 240 H160 M160 150 V330 M160 150 H188 M160 240 H188 M160 330 H188" className={wire} />
      <path d="M338 150 H380 M338 240 H380 M338 330 H380 M380 144 V336 M380 144 H420 M380 240 H420 M380 336 H420" className={wire} />

      <Box x={24} y={210} w={96} h={60} title="Client" />
      {[120, 210, 300].map((y, i) => (
        <Box key={y} x={188} y={y} w={150} h={60} title={`service-${i + 1}`} />
      ))}
      <Box x={420} y={112} w={172} h={64} title="ZooKeeper" sub="Base62 ranges" />
      <Box x={420} y={208} w={172} h={64} title="Redis" sub="hot URLs" />
      <Box x={420} y={304} w={172} h={64} title="MongoDB" sub="replica set" />

      {/* Requests travelling through the system; hidden when motion is reduced. */}
      <g className="motion-reduce:hidden">
        <circle r="4" className="fill-accent">
          <animateMotion dur="3.2s" repeatCount="indefinite" path="M120 240 H160 V150 H380 V144 H420" />
        </circle>
        <circle r="4" className="fill-accent">
          <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" path="M120 240 H420" />
        </circle>
      </g>
    </svg>
  );
}

const steps = [
  { text: "Click New invoice", chip: "New invoice" },
  { text: "Type the customer’s email", chip: "redacted" },
  { text: "Press Send", chip: "Send" },
] as const;

/**
 * A guide writing itself, step by step, with the email redacted. One line per step, sized off the frame
 * width (cqw) but never below 11px, so it stays readable from a phone to a 1920 screen.
 * Steps write in each time the screen goes live; with reduced motion they are simply there (CSS, so SSR matches).
 */
function Recorder({ label, live }: { label: string; live: boolean }) {
  return (
    <div role="img" aria-label={label} className="flex h-full items-center justify-center [container-type:inline-size]">
      <div className="w-[min(84%,30em)] rounded-[0.3em] bg-paper p-[1.2em] text-[clamp(0.6875rem,3.3cqw,1.375rem)] leading-tight text-ink shadow-[0_2em_4em_-2em_rgba(0,0,0,0.6)]">
        <p className="flex items-center justify-between text-[0.8em] text-[#625e58]">
          <span className="flex items-center gap-[0.5em]">
            <span className="size-[0.6em] animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
            Recording
          </span>
          <span className="font-mono">3 steps</span>
        </p>
        <p className="mt-[0.4em] text-[1.4em] font-semibold tracking-[-0.02em]">How to send an invoice</p>
        <ol className="mt-[0.5em]">
          {steps.map((s, i) => (
            <motion.li
              key={s.text}
              initial={false}
              animate={live ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: live ? 0.6 : 0, delay: live ? 0.35 + i * 0.22 : 0, ease: EXPO_OUT }}
              className="motion-reduce:!transform-none motion-reduce:!opacity-100 grid grid-cols-[1.6em_1fr_auto] items-center gap-[0.6em] border-t border-ink/[0.14] py-[0.55em]"
            >
              <span className="font-mono text-[0.8em] text-[#625e58]">{String(i + 1).padStart(2, "0")}</span>
              <span>{s.text}</span>
              {s.chip === "redacted" ? (
                <span className="rounded-[0.15em] bg-ink px-[0.6em] py-[0.2em] font-mono text-[0.75em] text-paper/70">redacted</span>
              ) : (
                <span className="rounded-[0.2em] bg-ink px-[0.6em] py-[0.25em] text-[0.75em] text-paper outline-2 outline-offset-2 outline-accent">
                  {s.chip}
                </span>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/**
 * What one project's screen shows, filling its parent (a FRAME, or a layer inside one).
 * live: this is the screen being looked at, so its stand-in animates.
 */
export default function ProjectScreen({
  media,
  live = false,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  media: Project["media"];
  live?: boolean;
  /** This is the first thing on screen (the case-study hero, the page's LCP): load the poster eagerly. */
  priority?: boolean;
  sizes?: string;
}) {
  const fit = media.fit === "contain" ? "object-contain" : "object-cover";

  if (media.poster) {
    return (
      <Image
        src={media.poster}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={fit}
        style={{ objectPosition: media.position }}
      />
    );
  }
  if (media.mock === "miniurl") {
    return (
      <div className="h-full p-[4%]">
        <MiniUrl label={media.alt} />
      </div>
    );
  }
  if (media.mock === "recorder") return <Recorder label={media.alt} live={live} />;
  return null;
}
