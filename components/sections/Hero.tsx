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

/** Placeholder the footage window rests on before it opens. */
function Capsule({ ref }: { ref: React.Ref<HTMLSpanElement> }) {
  return <span ref={ref} className="inline-block h-[0.74em] w-[2.1em] align-[-0.04em]" />;
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
  // The capsule slot exists once per line-break set; only the visible one has a width.
  const slotWide = useRef<HTMLSpanElement>(null);
  const slotNarrow = useRef<HTMLSpanElement>(null);
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
  const cueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

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
      const s = [slotWide.current, slotNarrow.current].find((n) => n && n.offsetWidth > 0);
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
    <section ref={section} id="top" data-time="18:30" className={reduce ? "" : "relative h-[160vh]"}>
      {/* The footage is fully open at 80% of the runway (grow), 48vh into this 160vh section: the clock reads about 2 a.m. there. */}
      {!reduce && <span aria-hidden data-time="02:00" className="absolute inset-x-0 top-[48vh]" />}
      <div ref={stage} className={`relative overflow-hidden ${reduce ? "" : "sticky top-0 h-svh"}`}>
        <motion.div style={reduce ? undefined : { opacity: textOpacity, y: textY }} className="gutter @container pb-16 pt-[18vh] md:pt-[16vh]">
          {/* 13cqi, not 13vw: at 13vw "mostly after dark." wraps to a fifth line on phones. */}
          <h1 className="display-type text-[13cqi] md:text-hero">
            <span className="sr-only">I build web software end to end, mostly after dark.</span>
            <span aria-hidden className="hidden md:block">
              <Line delay={0}>I build web software</Line>
              <Line delay={90}>
                end to end, <Capsule ref={slotWide} />
              </Line>
              <Line delay={180}>
                mostly <em className="font-medium">after dark.</em>
              </Line>
            </span>
            <span aria-hidden className="md:hidden">
              <Line delay={0}>I build web</Line>
              <Line delay={60}>software end</Line>
              <Line delay={120}>
                to end, <Capsule ref={slotNarrow} />
              </Line>
              <Line delay={180}>
                mostly <em className="font-medium">after dark.</em>
              </Line>
            </span>
          </h1>

          <div className="mt-12 grid gap-8 text-lg leading-relaxed md:mt-16 md:grid-cols-4 md:gap-6">
            {/* The red dot moved to the header LED: one red object on the page. */}
            <p className="text-sm">Available for new work</p>
            {/* TODO(confirm): bio wording, B5 copy deck. */}
            <p className="max-w-[46ch] text-pretty md:col-span-2">
              Full-stack engineer in Hyderabad. React and Next.js in front, .NET and Node.js behind, Kubernetes underneath. By day
              I build asset-uptime software for rail, aviation and maritime at Smartquip.
            </p>
            <p className="flex gap-5 text-sm md:justify-end">
              <a href={`mailto:${profile.email}`} className="hit-area link-draw">
                Email
              </a>
              <a href="https://github.com/mdobaid311" target="_blank" rel="noopener noreferrer" className="hit-area link-draw">
                GitHub{" "}
                <span aria-hidden className="arrow-ne">
                  ↗
                </span>
              </a>
            </p>
          </div>
        </motion.div>

        {!reduce && (
          <motion.p style={{ opacity: cueOpacity }} className="gutter absolute inset-x-0 bottom-6 text-sm text-dim md:bottom-8">
            Scroll. Night falls.
          </motion.p>
        )}

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
            {/* TODO(asset): 1920px black-and-white loop. Add <source media="(min-width: 1024px)" src="/hero-1080.webm|.mp4"> here,
                then update CLIP and re-tune FOCUS and POS (encode commands in docs/REVAMP-PLAN.md, 1.3). */}
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
