"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EXPO_OUT, type Project } from "@/lib/data";

function Box({ x, y, w, h, title, sub }: { x: number; y: number; w: number; h: number; title: string; sub?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} className="fill-ink stroke-paper/35" />
      <text x={x + 14} y={y + (sub ? 26 : h / 2 + 5)} className="fill-paper text-[14px]">
        {title}
      </text>
      {sub && (
        <text x={x + 14} y={y + 46} className="fill-paper/50 text-[11px]">
          {sub}
        </text>
      )}
    </g>
  );
}

/** Three services, ZooKeeper for Base62 ranges, Redis for hot URLs, a MongoDB replica set, on Kubernetes. */
function MiniUrl() {
  const wire = "fill-none stroke-paper/35";
  return (
    <svg
      viewBox="0 0 640 480"
      role="img"
      aria-label="MiniURL architecture: a client calls three services on a self-hosted Kubernetes cluster. The services use ZooKeeper for collision-free Base62 codes, Redis for hot URLs and a MongoDB replica set."
      className="h-full w-full font-mono"
    >
      <rect x="156" y="56" width="460" height="368" rx="4" strokeDasharray="4 5" className="fill-none stroke-paper/25" />
      <text x="176" y="86" className="fill-paper/45 text-[11px]">
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
  { text: "Click New invoice", shot: "button" },
  { text: "Type the customer’s email", shot: "redacted" },
  { text: "Press Send", shot: "button" },
] as const;

/** A guide writing itself, step by step, with the email redacted. */
function Recorder() {
  const reduce = useReducedMotion();
  return (
    <div
      role="img"
      aria-label="Guide Recorder mock-up: a guide titled How to send an invoice writes itself step by step, with the customer’s email redacted."
      className="flex h-full items-center justify-center p-6 md:p-10"
    >
      <div className="w-full max-w-lg rounded-[4px] bg-paper p-5 md:p-7 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
        <p className="flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-2">
            <span className="size-2 animate-pulse rounded-full bg-accent" />
            Recording
          </span>
          <span className="font-mono">3 steps</span>
        </p>
        <p className="mt-3 text-lg font-semibold md:text-2xl tracking-[-0.02em]">How to send an invoice</p>
        <ol className="mt-4 space-y-3">
          {steps.map((s, i) => (
            <motion.li
              key={s.text}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.3 + i * 0.45, ease: EXPO_OUT }}
              className="grid grid-cols-[1.5rem_1fr] gap-3 border-t border-rule pt-3"
            >
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-sm md:text-base">{s.text}</p>
                <div className="mt-2 flex h-12 items-center md:h-14 gap-2 rounded-[3px] bg-card px-3">
                  <span className="h-1.5 w-16 rounded-full bg-ink/15" />
                  {s.shot === "button" ? (
                    <span className="ml-auto rounded-[3px] bg-ink px-2.5 py-1 text-[0.625rem] text-paper outline-2 outline-offset-2 outline-accent">
                      {i === 0 ? "New invoice" : "Send"}
                    </span>
                  ) : (
                    <span className="ml-2 flex h-5 flex-1 items-center rounded-[2px] bg-ink px-2 font-mono text-[0.55rem] text-paper/60">
                      redacted
                    </span>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** This site, in miniature. */
function Portfolio() {
  return (
    <div
      role="img"
      aria-label="This site in miniature: the headline with the desk footage playing inside it as a word."
      className="flex h-full flex-col bg-paper p-6 text-ink md:p-10"
    >
      <div className="flex justify-between text-[0.6rem] text-muted md:text-xs">
        <span className="font-semibold text-ink">Mohammed Obaid</span>
        <span>Work Experience Writing Contact</span>
      </div>
      <p className="display-type my-auto text-[clamp(1.6rem,3.1vw,3.4rem)]">
        I build web software
        <br />
        end to end,{" "}
        <span
          className="inline-block h-[0.74em] w-[2.1em] rounded-full bg-ink bg-cover bg-[38%_30%] align-[-0.04em] grayscale"
          style={{ backgroundImage: "url(/hero-poster.jpg)" }}
        />
        <br />
        mostly <em className="font-medium">after dark.</em>
      </p>
      <div className="h-[22%] rounded-[3px] bg-ink bg-cover bg-center grayscale" style={{ backgroundImage: "url(/hero-poster.jpg)" }} />
    </div>
  );
}

export default function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  return (
    <div className={`aspect-[4/3] overflow-hidden rounded-[4px] ${kind === "portfolio" ? "bg-paper ring-1 ring-rule" : "bg-ink"}`}>
      {kind === "miniurl" && (
        <div className="h-full p-4 md:p-8">
          <MiniUrl />
        </div>
      )}
      {kind === "scheduler" && (
        <div className="h-full px-6 pt-8 md:px-12 md:pt-14">
          <Image
            src="/work/resource-scheduler.png"
            alt="A room booking app built with Resource Scheduler: rooms as rows on a day timeline, with bookings dragged into free slots."
            width={1440}
            height={1160}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full rounded-t-[3px]"
          />
        </div>
      )}
      {kind === "recorder" && <Recorder />}
      {kind === "liliums" && (
        <Image
          src="/work/liliums.jpg"
          alt="The Liliums home page: a gold rose under an arch above the Liliums wordmark, with Order on WhatsApp and Shop by occasion buttons."
          width={1281}
          height={952}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      )}
      {kind === "portfolio" && <Portfolio />}
    </div>
  );
}
