"use client";

import { useEffect, useState } from "react";

const CITIES = [
  { name: "Hyderabad", zone: "Asia/Kolkata" },
  { name: "London", zone: "Europe/London" },
  { name: "New York", zone: "America/New_York" },
  { name: "San Francisco", zone: "America/Los_Angeles" },
] as const;

/** "HH:MM" in a time zone, 24-hour. */
export const clock = (zone: string, now: Date) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: zone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now);

/** The current time, or null until mounted so server and first client render agree. Ticks every 10 s. */
export function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** Four live clocks. Hyderabad carries the LED dot while it is night there (21:00 to 03:00). */
export default function WorldClocks() {
  const now = useNow();
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
      {CITIES.map(({ name, zone }, i) => {
        const t = now ? clock(zone, now) : "--:--";
        const hour = Number(t.slice(0, 2));
        const night = i === 0 && now !== null && (hour >= 21 || hour < 3);
        return (
          <li key={name} className="border-t border-line pt-4">
            <p className="flex items-center gap-2 text-sm text-dim">
              {name}
              {night && <span aria-hidden className="size-2 rounded-full bg-accent" />}
            </p>
            <p className="mt-2 font-mono text-subtitle tabular-nums">{t}</p>
          </li>
        );
      })}
    </ul>
  );
}
