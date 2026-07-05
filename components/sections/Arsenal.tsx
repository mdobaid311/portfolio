"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import Corners from "@/components/Corners";
import { skillGroups, marqueeItems } from "@/lib/data";

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="flex overflow-clip border-b border-line py-4 first:border-t">
      <div
        className={`flex shrink-0 items-center gap-10 pr-10 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {items.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span
              className={`display-type whitespace-nowrap text-3xl md:text-5xl ${
                i % 4 === 1 ? "display-outline-acid" : i % 2 === 0 ? "text-bone/90" : "display-outline"
              }`}
            >
              {item}
            </span>
            <span className="size-1.5 rotate-45 bg-acid/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Arsenal() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".arsenal-panel", {
        autoAlpha: 0,
        y: 36,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".arsenal-grid", start: "top 82%", once: true },
      });

      gsap.from(".skill-item", {
        autoAlpha: 0,
        x: -10,
        stagger: 0.015,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: { trigger: ".arsenal-grid", start: "top 78%", once: true },
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="arsenal"
      className="relative border-t border-line py-28 md:py-36"
    >
      <div className="px-6 md:px-10">
        <SectionHeading
          index="04"
          kicker="Arsenal — tools of the trade"
          title="Tech Stack"
          outline
        />
      </div>

      <div className="mb-16">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>

      <div className="arsenal-grid grid gap-px border-y border-line bg-line px-0 sm:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group) => (
          <div key={group.index} className="arsenal-panel relative bg-ink p-6 md:p-8">
            <Corners className="opacity-0 transition-opacity duration-300 [div:hover>&]:opacity-100" />
            <div className="mono-label mb-6 flex items-baseline justify-between text-faint">
              <span>
                UNIT-{group.index} <span className="text-acid">{"//"}</span>{" "}
                {group.label}
              </span>
              <span>{String(group.items.length).padStart(2, "0")}</span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {group.items.map((item, i) => (
                <li
                  key={item}
                  className="skill-item group/item flex items-baseline gap-3 font-mono text-sm text-dim transition-colors duration-200 hover:text-bone"
                >
                  <span className="mono-label text-[9px] text-faint transition-colors group-hover/item:text-acid">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
