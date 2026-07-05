"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { profile } from "@/lib/data";

function LocalClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: profile.timezone,
      }).format(new Date());
    const update = () => setTime(format());
    const raf = requestAnimationFrame(update);
    const id = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  return <span suppressHydrationWarning>{time} IST</span>;
}

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const magnetRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      document.fonts.ready.then(() => {
        const split = SplitText.create(".contact-title-line", {
          type: "chars,lines",
          mask: "lines",
        });
        gsap.from(split.chars, {
          yPercent: 115,
          stagger: 0.024,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            once: true,
          },
        });
      });

      gsap.from(".contact-fade", {
        autoAlpha: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 65%", once: true },
      });

      // magnetic CTA
      const magnet = magnetRef.current;
      if (!magnet || window.matchMedia("(pointer: coarse)").matches) return;

      const xTo = gsap.quickTo(magnet, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(magnet, "y", { duration: 0.4, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        const rect = magnet.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist < 220) {
          xTo(dx * 0.28);
          yTo(dy * 0.28);
        } else {
          xTo(0);
          yTo(0);
        }
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative flex min-h-svh flex-col justify-between overflow-clip border-t border-line px-6 pt-28 md:px-10 md:pt-36"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative">
        <div className="contact-fade mono-label mb-8 flex items-center gap-3 text-dim">
          <span className="text-acid">/05</span>
          <span className="h-px w-10 bg-line" />
          <span>Contact — open a channel</span>
        </div>

        <h2 className="display-type text-[clamp(2.2rem,10vw,10rem)] text-bone">
          <span className="contact-title-line block">Let&apos;s build</span>
          <span className="contact-title-line display-outline-acid block">
            something
          </span>
        </h2>

        <div className="mt-14 flex flex-col items-start gap-12 md:flex-row md:items-center md:gap-20">
          <a
            ref={magnetRef}
            href={`mailto:${profile.email}`}
            className="contact-fade group relative inline-flex items-center justify-center"
            data-cursor
          >
            <span className="flex size-36 items-center justify-center rounded-full border border-acid/50 transition-colors duration-300 group-hover:bg-acid md:size-44">
              <span className="mono-label text-center leading-relaxed text-acid transition-colors duration-300 group-hover:text-ink">
                Send
                <br />
                transmission
                <br />→
              </span>
            </span>
            <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-acid/20" />
          </a>

          <div className="contact-fade flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-lg text-bone underline decoration-line underline-offset-8 transition-colors hover:decoration-acid md:text-2xl"
            >
              {profile.email}
            </a>
            <p className="font-mono text-sm text-dim">
              Currently at {profile.company} — always up for interesting
              problems, side quests and collaborations.
            </p>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="relative mt-24 border-t border-line py-8">
        <div className="contact-fade grid gap-6 md:grid-cols-4 md:items-center">
          <div className="flex flex-col gap-1.5">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label group flex items-baseline gap-2 text-dim transition-colors hover:text-acid"
              >
                <span className="text-faint">{social.label}</span>
                <span>{social.handle}</span>
              </a>
            ))}
          </div>

          <div className="mono-label text-faint">
            <p>{profile.coordinates}</p>
            <p className="mt-1.5 text-dim">
              <LocalClock />
            </p>
          </div>

          <div className="mono-label text-faint">
            <p>Next.js 16 / GSAP / Three.js</p>
            <p className="mt-1.5">Designed & built by me, for me</p>
          </div>

          <div className="mono-label text-faint md:text-right">
            <p>© {new Date().getFullYear()} Mohammed Obaid</p>
            <p className="mt-1.5 flex items-center gap-2 md:justify-end">
              <span className="size-1.5 rounded-full bg-acid" />
              All systems nominal
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
