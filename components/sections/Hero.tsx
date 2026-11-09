"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { animate, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { EXPO_OUT, profile } from "@/lib/data";

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

const REDUCE = "(prefers-reduced-motion: reduce)";
const onMotionPref = (cb: () => void) => {
  const m = matchMedia(REDUCE);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// Sine in-out: no dead zone at the start of the scrub.
const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

// The footage: its frame size, where the lit monitor sits in it, and its CSS object-position.
const CLIP = { w: 1280, h: 720 };
const FOCUS = { x: 0.49, y: 0.37 };
const POS = { x: 0.42, y: 0.35 };
// The capsule shows the footage zoomed out (monitor and silhouette), then dollies in to the natural frame.
// Stays below 1 only because the capsule is far smaller than the stage, so the clamp in paint() always holds.
const ZOOM = 0.5;

/**
 * The capsule in the headline is a placeholder; the video layer covers the whole stage and is
 * clipped down to the capsule's box. Scrolling the hero's runway opens the clip to the full stage.
 * Only clip-path and transform change per frame, so nothing re-lays out while scrolling.
 */
export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLSpanElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const box = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const progress = useRef(0);
  const reveal = useRef(0);
  const reduce = useSyncExternalStore(onMotionPref, () => matchMedia(REDUCE).matches, () => false);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const grow = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const shadeOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);

  const paint = () => {
    const el = frame.current;
    const v = video.current;
    const st = stage.current;
    if (!el || !v || !st) return;
    const W = st.clientWidth;
    const H = st.clientHeight;
    const e = ease(progress.current);
    const b = box.current;

    // The window: capsule box (wiped in from the left on load) at e = 0, whole stage at e = 1.
    const x = lerp(b.x, 0, e);
    const y = lerp(b.y, 0, e);
    const w = lerp(b.w * reveal.current, W, e);
    const h = lerp(b.h, H, e);
    el.style.clipPath = `inset(${y}px ${W - x - w}px ${H - y - h}px ${x}px round ${lerp(b.h / 2, 0, e)}px)`;

    // The footage: lit monitor centred in the capsule, settling to its natural framing.
    const k = Math.max(W / CLIP.w, H / CLIP.h);
    const fx = (W - CLIP.w * k) * POS.x + FOCUS.x * CLIP.w * k;
    const fy = (H - CLIP.h * k) * POS.y + FOCUS.y * CLIP.h * k;
    const s = lerp(ZOOM, 1, e);
    // Clamp so the footage always covers the window.
    const tx = Math.max(x + w - s * W, Math.min(x, lerp(b.x + b.w / 2, fx, e) - s * fx));
    const ty = Math.max(y + h - s * H, Math.min(y, lerp(b.y + b.h / 2, fy, e) - s * fy));
    v.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
  };

  useMotionValueEvent(grow, "change", (t) => {
    if (reduce) return;
    progress.current = t;
    paint();
  });

  useEffect(() => {
    const motionOff = matchMedia(REDUCE).matches;

    // offsetLeft/Top ignore transforms, so this is where the capsule rests once the headline settles.
    const measure = () => {
      const s = slot.current;
      if (!s || !stage.current) return;
      let x = 0;
      let y = 0;
      for (let n: HTMLElement | null = s; n && n !== stage.current; n = n.offsetParent as HTMLElement | null) {
        x += n.offsetLeft;
        y += n.offsetTop;
      }
      box.current = { x, y, w: s.offsetWidth, h: s.offsetHeight };
      progress.current = motionOff ? 0 : grow.get();
      paint();
    };

    measure();
    document.fonts.ready.then(measure);
    const ro = new ResizeObserver(measure);
    if (stage.current) ro.observe(stage.current);

    // Wipe the capsule open once its headline line has risen into place.
    let wipe: ReturnType<typeof animate> | null = null;
    if (motionOff) {
      reveal.current = 1;
      paint();
    } else {
      wipe = animate(0, 1, {
        duration: 1.4,
        delay: 0.9,
        ease: EXPO_OUT,
        onUpdate: (r) => {
          reveal.current = r;
          paint();
        },
      });
    }

    // Play only while the hero is on screen.
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const io = new IntersectionObserver(([entry]) => {
      const v = video.current;
      if (!v || motionOff || saveData) return;
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    if (section.current) io.observe(section.current);

    return () => {
      wipe?.stop();
      ro.disconnect();
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={section} id="top" className={reduce ? "" : "h-[160vh]"}>
      <div ref={stage} className={`relative overflow-hidden ${reduce ? "" : "sticky top-0 h-svh"}`}>
        <motion.div style={reduce ? undefined : { opacity: textOpacity, y: textY }} className="gutter pb-16 pt-[14vh] md:pt-[18vh]">
          <h1 className="display-type text-[8.6vw] md:text-[min(7.2vw,138px)]">
            <Line delay={0}>I build web software</Line>{" "}
            <Line delay={90}>
              end to end,{" "}
              <span ref={slot} aria-hidden className="inline-block h-[0.74em] w-[2.1em] align-[-0.04em]" />
            </Line>{" "}
            <Line delay={180}>
              mostly <em className="font-medium">after dark.</em>
            </Line>
          </h1>

          <div className="mt-12 grid gap-8 text-lg leading-relaxed md:mt-16 md:grid-cols-4 md:gap-6">
            <p className="flex items-start gap-2.5 text-sm">
              <span className="relative mt-[0.4em] flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative size-2 rounded-full bg-accent" />
              </span>
              Available for new work
            </p>
            <p className="max-w-[46ch] text-pretty md:col-span-2">{profile.bio}</p>
            <p className="flex gap-5 text-sm md:justify-end">
              <a href={`mailto:${profile.email}`} className="hit-area link-draw hover:text-accent">
                Email
              </a>
              <a href="https://github.com/mdobaid311" target="_blank" rel="noopener noreferrer" className="hit-area link-draw hover:text-accent">
                GitHub ↗
              </a>
            </p>
          </div>
        </motion.div>

        {/* Covers the stage; paint() clips it to the capsule and opens it as you scroll. */}
        <div ref={frame} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-ink [clip-path:inset(50%)]">
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            className="absolute inset-0 h-full w-full origin-top-left object-cover will-change-transform"
            style={{ objectPosition: `${POS.x * 100}% ${POS.y * 100}%` }}
          >
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {!reduce && (
            <>
              {/* Vignette pulls the eye to the lit monitors once the frame is open. */}
              <motion.div
                style={{ opacity: shadeOpacity }}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_42%_36%,transparent_30%,rgb(18_18_18/0.65)_100%)]"
              />
              <motion.p
                style={{ opacity: captionOpacity }}
                className="gutter absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-gradient-to-t from-ink/80 to-transparent pb-6 pt-24 text-base text-paper/85 md:pb-8 md:text-lg"
              >
                <span>At the desk in Hyderabad, a little after 2 a.m.</span>
                <span className="hidden font-mono text-sm text-paper/60 sm:inline">Fig. 1</span>
              </motion.p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
