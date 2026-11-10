"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore, ViewTransition } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import ProjectScreen, { FRAME } from "@/components/ProjectScreen";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { CASE_STUDIES_LIVE, EASE_IO, projects, type Project } from "@/lib/data";

const N = projects.length;
const pad = (n: number) => String(n).padStart(2, "0");
const meta = (p: Project) => [p.status, p.year, p.role].filter(Boolean).join(" · ");
const href = (p: Project) => `/work/${p.slug}`;

// The pinned monitor needs a wide screen, enough height for the open index, and motion.
const PIN = "(min-width: 1024px) and (min-height: 740px) and (prefers-reduced-motion: no-preference)";
const onPinChange = (cb: () => void) => {
  const m = matchMedia(PIN);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

const WIPE = { duration: 0.9, ease: EASE_IO };
const LEFT_ON = "work:active";
const OPEN = "inset(0% 0% 0% 0%)";
const SHUT = "inset(100% 0% 0% 0%)";

/** Paired by name with the case-study page, so the screen and the title morph across the navigation.
    Names are fixed per slug (one per project, so unique) and never change on a mounted element: React's
    duplicate-name check keeps the name an element mounted with. Unpaired, it stays out of the transition. */
function Shared({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <ViewTransition name={name} default="none" share="auto">
      {children}
    </ViewTransition>
  );
}

function Points({ p }: { p: Project }) {
  return (
    <dl className="space-y-3 text-[0.95rem] leading-relaxed">
      {p.points.map(([label, text]) => (
        <div key={label} className="grid grid-cols-[5rem_1fr] gap-4 border-t border-line pt-3">
          <dt className="text-dim">{label}</dt>
          <dd className="text-pretty">{text}</dd>
        </div>
      ))}
    </dl>
  );
}

function Links({ p }: { p: Project }) {
  return (
    <>
      <p className="mt-6 text-sm text-dim">{p.tags.join(" · ")}</p>
      <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
        {p.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="hit-area link-draw">
            {l.label}{" "}
            <span aria-hidden className="arrow-ne">
              ↗
            </span>
          </a>
        ))}
        {CASE_STUDIES_LIVE && (
          <Link href={href(p)} className="hit-area link-draw">
            Read the case study{" "}
            <span aria-hidden className="arrow-e">
              →
            </span>
          </Link>
        )}
      </p>
    </>
  );
}

function Logline({ p }: { p: Project }) {
  return (
    <>
      <p className="max-w-[34ch] text-pretty text-xl leading-snug">{p.logline}</p>
      {p.outcome && <p className="mt-3 max-w-[40ch] text-pretty text-fg">{p.outcome}</p>}
    </>
  );
}

/* ---------- Mobile, tablet and reduced motion: one article per project, media first. ---------- */

function Article({ p, i }: { p: Project; i: number }) {
  const screen = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(screen, { amount: 0.5 });
  const live = seen && !reduce;
  return (
    <article className="grid gap-y-8 border-b border-line py-16 md:grid-cols-12 md:gap-x-6 lg:items-start">
      <Reveal variant="window" className="md:col-span-12 lg:col-span-7 lg:row-span-2">
        <Shared name={`screen-${p.slug}`}>
          <div ref={screen} className={FRAME}>
            <ProjectScreen media={p.media} live={live} />
          </div>
        </Shared>
      </Reveal>
      <div className="md:col-span-5 lg:col-start-8 lg:row-start-1">
        <p className="flex justify-between gap-4 text-sm text-dim">
          <span className="font-mono">{pad(i + 1)}</span>
          <span>{meta(p)}</span>
        </p>
        <h3 className="display-type mt-5 text-balance text-title">
          {CASE_STUDIES_LIVE ? (
            <Shared name={`title-${p.slug}`}>
              <Link href={href(p)} className="link-draw inline-block [--line:2px]">
                {p.title}
              </Link>
            </Shared>
          ) : (
            p.title
          )}
        </h3>
        <div className="mt-5">
          <Logline p={p} />
        </div>
      </div>
      <div className="md:col-span-7 lg:col-span-5 lg:col-start-8">
        <Points p={p} />
        <Links p={p} />
      </div>
    </article>
  );
}

/* ---------- Desktop: a pinned stage, the index on the left and one monitor on the right. ---------- */

/** Fills left to right with scroll progress through project i's segment. */
function Progress({ progress, i }: { progress: MotionValue<number>; i: number }) {
  const scaleX = useTransform(progress, (v) => Math.min(1, Math.max(0, v * N - i)));
  return (
    <span aria-hidden className="block h-px bg-line">
      <motion.span style={{ scaleX }} className="block h-px origin-left bg-fg" />
    </span>
  );
}

/** Only while case studies exist: the monitor links to the active one, with an "Open" disc following the pointer. */
function OpenCursor({ to, children }: { to: string; children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const at = (e: React.PointerEvent<HTMLElement>, jump = false) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
    if (jump) {
      sx.jump(e.clientX - r.left);
      sy.jump(e.clientY - r.top);
    }
  };
  return (
    // A pointer shortcut only: the open panel has "Read the case study" for keyboards and screen readers, and this
    // link's name would be built from every screen's alt text, so it stays out of the tab order and the tree.
    <Link
      href={to}
      tabIndex={-1}
      aria-hidden
      onPointerEnter={(e) => at(e, true)}
      onPointerMove={(e) => at(e)}
      className="group/open relative block [@media(hover:hover)_and_(pointer:fine)]:cursor-none"
    >
      {children}
      <motion.span
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 z-10 -ml-9 -mt-9 hidden size-18 items-center justify-center rounded-full bg-paper text-sm font-medium text-ink opacity-0 transition-opacity duration-200 group-hover/open:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:flex"
      >
        Open
      </motion.span>
    </Link>
  );
}

function Stage() {
  const runway = useRef<HTMLDivElement>(null);
  const base = useId();
  const { scrollYProgress } = useScroll({ target: runway, offset: ["start start", "end end"] });
  // Coming Back from a case study, the stage remounts before the scroll is restored. Start on the project
  // that was open when the visitor left, so the screen is already showing for the reverse morph.
  // Saved only when a link opens the active case study, and used once, so a later visit starts at 01.
  // The stage only renders on the client (see Projects), so this cannot mismatch hydration.
  const [active, setActive] = useState(() => {
    try {
      return Math.min(N - 1, Number(sessionStorage.getItem(LEFT_ON)) || 0);
    } catch {
      return 0;
    }
  });
  const current = useRef(active);
  useEffect(() => {
    try {
      sessionStorage.removeItem(LEFT_ON);
    } catch {}
  }, []);
  const remember = (e: React.MouseEvent) => {
    const to = (e.target as Element).closest("a")?.getAttribute("href");
    if (to !== href(projects[current.current])) return;
    try {
      sessionStorage.setItem(LEFT_ON, String(current.current));
    } catch {}
  };

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    if (i === current.current) return;
    current.current = i;
    setActive(i);
  });

  // Scroll to the start of project i's segment; the scroll listener then makes it active.
  const go = (i: number) => {
    const el = runway.current;
    if (!el || i === current.current) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const segment = (el.offsetHeight - window.innerHeight) / N;
    window.scrollTo({ top: top + i * segment + 2, behavior: "smooth" });
  };

  const p = projects[active];
  const monitor = (
    <div className={FRAME}>
      {projects.map((q, i) => (
        <Shared key={q.slug} name={`screen-${q.slug}`}>
        <motion.div
          aria-hidden={i !== active}
          initial={false}
          animate={{ clipPath: i <= active ? OPEN : SHUT }}
          transition={WIPE}
          className="absolute inset-0 bg-[#0a0a0a]"
        >
          <motion.div initial={false} animate={{ scale: i <= active ? 1 : 1.08 }} transition={WIPE} className="relative h-full">
            <ProjectScreen media={q.media} live={i === active} sizes="50vw" />
          </motion.div>
        </motion.div>
        </Shared>
      ))}
    </div>
  );

  return (
    <div ref={runway} onClickCapture={remember} style={{ height: `calc(${N} * 65vh + 100vh)` }}>
      <div className="sticky top-0 grid h-svh grid-cols-12 items-start gap-x-6 pt-[calc(3.5rem+4vh)]">
        {/* Titles stay on one line at a size that fits four of them plus the open panel in a 900px-tall screen.
            The index takes the five columns plus the spare sixth so "Resource Scheduler" never wraps. */}
        <ol className="col-span-6">
          {projects.map((q, i) => {
            const on = i === active;
            const panel = `${base}-${i}`;
            const title = `display-type block w-fit whitespace-nowrap text-left text-[clamp(2.5rem,4.4vw,5.5rem)] transition-opacity duration-450 hover:opacity-70 focus-visible:opacity-100 ${on ? "" : "opacity-30"}`;
            return (
              <li key={q.slug}>
                <h3>
                  {CASE_STUDIES_LIVE ? (
                    <Shared name={`title-${q.slug}`}>
                    <Link
                      href={href(q)}
                      onFocus={() => go(i)}
                      onClick={(e) => {
                        if (i === current.current) return;
                        e.preventDefault();
                        go(i);
                      }}
                      className={title}
                    >
                      {q.title}
                    </Link>
                    </Shared>
                  ) : (
                    <button type="button" aria-expanded={on} aria-controls={panel} onFocus={() => go(i)} onClick={() => go(i)} className={title}>
                      {q.title}
                    </button>
                  )}
                </h3>
                <div
                  id={panel}
                  inert={!on}
                  className={`grid transition-[grid-template-rows] duration-450 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="max-w-[36rem] pb-6 pt-4">
                      <Progress progress={scrollYProgress} i={i} />
                      <div className="mt-5">
                        <Logline p={q} />
                      </div>
                      <div className="mt-6">
                        <Points p={q} />
                      </div>
                      <Links p={q} />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="col-span-6 col-start-7">
          <p className="mb-3 text-right font-mono text-sm text-dim">
            {pad(active + 1)} / {pad(N)}
          </p>
          {CASE_STUDIES_LIVE ? <OpenCursor to={href(p)}>{monitor}</OpenCursor> : monitor}
          <p className="mt-3 text-sm text-dim">{meta(p)}</p>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const pinned = useSyncExternalStore(onPinChange, () => matchMedia(PIN).matches, () => false);
  return (
    <section id="work" data-time="02:20" className="gutter pt-24 md:pt-32">
      <SectionHead index="01" title="Selected work" aside={<span className="font-mono">({pad(N)})</span>} />
      {pinned ? <Stage /> : projects.map((p, i) => <Article key={p.slug} p={p} i={i} />)}
    </section>
  );
}
