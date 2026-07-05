"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import Corners from "@/components/Corners";
import { profile } from "@/lib/data";

const TERMINAL_ROWS = [
  { key: "name", value: "mohammed_obaid" },
  { key: "role", value: "software_engineer" },
  { key: "org", value: "smartquip" },
  { key: "base", value: "hyderabad.in" },
  { key: "stack", value: "react / next / .net / node" },
  { key: "focus", value: "distributed_systems + ai_products" },
  { key: "hireable", value: "true", acid: true },
];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // terminal rows type in
      gsap.from(".term-row", {
        autoAlpha: 0,
        x: -12,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".term-panel", start: "top 78%", once: true },
      });

      // bio paragraphs reveal by line
      document.fonts.ready.then(() => {
        gsap.utils.toArray<HTMLElement>(".bio-para").forEach((para) => {
          const split = SplitText.create(para, { type: "lines", mask: "lines" });
          gsap.from(split.lines, {
            yPercent: 105,
            stagger: 0.07,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: para, start: "top 85%", once: true },
          });
        });
      });

      // stat counters
      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
        const target = Number(el.dataset.value ?? 0);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="profile"
      className="relative border-t border-line px-6 py-28 md:px-10 md:py-36"
    >
      <SectionHeading index="01" kicker="Profile — who is this" title="Operator" />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* terminal identity card */}
        <div className="term-panel relative self-start border border-line bg-panel p-6 md:p-8">
          <Corners />
          <div className="mono-label mb-6 flex items-center justify-between text-faint">
            <span>identity.log</span>
            <span className="flex gap-1.5">
              <span className="size-2 rounded-full bg-faint" />
              <span className="size-2 rounded-full bg-faint" />
              <span className="size-2 rounded-full bg-acid" />
            </span>
          </div>
          <div className="flex flex-col gap-3 font-mono text-xs md:text-sm">
            {TERMINAL_ROWS.map((row) => (
              <div key={row.key} className="term-row flex gap-3">
                <span className="w-24 shrink-0 text-faint">{row.key}</span>
                <span className={row.acid ? "text-acid" : "text-bone"}>
                  {row.value}
                </span>
              </div>
            ))}
            <div className="term-row mt-2 flex items-center gap-2 text-faint">
              <span className="text-acid">$</span>
              <span className="animate-blink inline-block h-4 w-2 bg-acid" />
            </div>
          </div>
        </div>

        {/* bio + stats */}
        <div>
          {profile.about.map((para, i) => (
            <p
              key={i}
              className={`bio-para font-mono leading-relaxed ${
                i === 0
                  ? "mb-6 text-lg text-bone md:text-2xl md:leading-relaxed"
                  : "mb-6 text-sm text-dim md:text-base"
              }`}
            >
              {para}
            </p>
          ))}

          <div className="mt-14 grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
            {profile.stats.map((stat) => (
              <div
                key={stat.label}
                className="border-b border-r border-line p-5 md:p-6"
              >
                <div className="display-type text-4xl text-bone md:text-5xl">
                  <span className="stat-value" data-value={stat.value}>
                    0
                  </span>
                  <span className="text-acid">{stat.suffix}</span>
                </div>
                <div className="mono-label mt-3 text-faint">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
