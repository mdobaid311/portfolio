"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { profile } from "@/lib/data";
import ShiftClock from "@/components/ShiftClock";

const links = [
  ["#work", "Work"],
  ["#experience", "Experience"],
  ["#writing", "Writing"],
  ["#contact", "Contact"],
] as const;

// The header and the LED layer share this grid so the LED lands beside the clock.
// The clock cell has a fixed width, so the 1fr columns either side split the rest evenly in both layers.
const ROW =
  "gutter fixed inset-x-0 top-0 grid h-14 grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] items-center gap-x-4 text-sm md:grid-cols-4 md:gap-x-6";

export default function Header() {
  const reduce = useReducedMotion();
  const menu = useRef<HTMLDialogElement>(null);
  const close = () => menu.current?.close();
  // Work, Experience and Writing only exist on the home page; the footer (#contact) is on every page.
  const home = usePathname() === "/";
  const to = (hash: string) => (home || hash === "#contact" ? hash : `/${hash}`);

  // While the tab is hidden the title says the shift goes on; the real title comes back on return.
  useEffect(() => {
    let title = document.title;
    const onChange = () => {
      if (document.hidden) {
        title = document.title;
        document.title = "Still up. — Mohammed Obaid";
      } else {
        document.title = title;
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => {
      document.removeEventListener("visibilitychange", onChange);
      if (document.hidden) document.title = title;
    };
  }, []);

  return (
    <>
      {reduce === false && <ReactLenis root options={{ lerp: 0.1, anchors: true }} />}

      {/* Difference blending reads as white on ink and the footage, and as ink on paper, with no tone logic. */}
      <header className={`${ROW} z-50 text-white mix-blend-difference`}>
        <a href={home ? "#top" : "/"} className="hit-area justify-self-start truncate font-semibold">
          {profile.name}
        </a>
        <ShiftClock className="pl-4" />
        <nav aria-label="Sections" className="hidden justify-end gap-x-5 md:col-span-2 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={to(href)} className="hit-area link-draw">
              {label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => menu.current?.showModal()}
          className="hit-area justify-self-end md:hidden"
        >
          Menu
        </button>
      </header>

      {/* The standby LED stays outside the blend so it keeps its red. */}
      {/* --sun (0 to 1) is set on <html> by the footer as the sun rises: the LED fades out as it becomes the sun. */}
      <div aria-hidden className={`${ROW} pointer-events-none z-[51]`} style={{ opacity: "calc(1 - var(--sun, 0))" }}>
        <span className="relative col-start-2 flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 [animation-duration:2.4s]" />
          <span className="relative size-2 rounded-full bg-accent" />
        </span>
      </div>

      <dialog
        ref={menu}
        aria-label="Menu"
        data-tone="night"
        data-lenis-prevent
        className="m-0 h-dvh max-h-none w-full max-w-none flex-col bg-bg p-0 text-fg open:flex md:hidden"
      >
        <div className="gutter flex h-14 shrink-0 items-center justify-between text-sm">
          <span className="font-semibold">{profile.name}</span>
          <button type="button" onClick={close} className="hit-area">
            Close
          </button>
        </div>
        <nav aria-label="Sections" className="gutter mt-[12vh]">
          <ul>
            {links.map(([href, label], i) => (
              <li key={href} className="overflow-hidden pb-[0.06em]">
                <a
                  href={to(href)}
                  onClick={close}
                  className="display-type block animate-rise text-[14vw]"
                  style={{ animationDelay: `${120 + i * 60}ms` }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="gutter mt-auto flex flex-col gap-3 pb-8 text-sm">
          <a href={`mailto:${profile.email}`} className="hit-area self-start text-base">
            {profile.email}
          </a>
          <p className="flex flex-wrap gap-x-5 gap-y-2 text-dim">
            {profile.socials.map((s) => {
              const external = s.href.startsWith("http");
              return (
                <a
                  key={s.href}
                  href={s.href}
                  onClick={close}
                  className="hit-area hover:text-fg"
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {s.label}
                </a>
              );
            })}
          </p>
        </div>
      </dialog>
    </>
  );
}
