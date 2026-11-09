"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { profile } from "@/lib/data";

const links = [
  ["#work", "Work"],
  ["#experience", "Experience"],
  ["#writing", "Writing"],
  ["#contact", "Contact"],
] as const;

export default function Header() {
  const reduce = useReducedMotion();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {reduce === false && <ReactLenis root options={{ lerp: 0.1, anchors: true }} />}

      <header className="grid grid-cols-2 gap-x-6 gutter pt-5 text-sm leading-snug md:grid-cols-4 ">
        <a href="#top" className="font-semibold">
          {profile.name}
        </a>
        <p className="hidden text-muted md:block">
          Full-stack engineer
          <br />
          at {profile.company}, remote
        </p>
        <p className="hidden text-muted md:block">
          {profile.location}
          <br />
          <span className="font-mono text-[0.8rem] tabular-nums">{time ?? "--:--"}</span> local time
        </p>
        <nav aria-label="Sections" className="flex flex-wrap justify-end gap-x-4 gap-y-2">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hit-area transition-colors hover:text-accent">
              {label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
