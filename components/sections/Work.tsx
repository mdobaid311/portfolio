"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/lib/data";

export default function Work() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".project-row", {
        autoAlpha: 0,
        y: 46,
        stagger: 0.1,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: ".project-list", start: "top 82%", once: true },
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="work"
      className="relative border-t border-line px-6 py-28 md:px-10 md:py-36"
    >
      <SectionHeading index="03" kicker="Work — selected builds" title="Payloads" />

      <div className="project-list border-t border-line">
        {projects.map((project) => {
          const href = project.live ?? project.repo;
          const Tag = href ? "a" : "div";
          return (
            <Tag
              key={project.index}
              {...(href
                ? { href, target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="project-row group relative block overflow-clip border-b border-line"
              data-cursor
            >
              {/* acid flip layer */}
              <span className="absolute inset-0 origin-top scale-y-0 bg-acid transition-transform duration-[420ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />

              <div className="relative grid items-baseline gap-3 px-1 py-8 transition-colors duration-300 md:grid-cols-[4rem_minmax(0,1.2fr)_minmax(0,1fr)_auto] md:gap-8 md:py-10">
                <span className="mono-label text-faint transition-colors duration-300 group-hover:text-ink/60">
                  /{project.index}
                </span>

                <h3 className="display-type text-3xl text-bone transition-colors duration-300 group-hover:text-ink md:text-5xl">
                  {project.title}
                </h3>

                <div className="max-w-md">
                  <p className="font-mono text-xs leading-relaxed text-dim transition-colors duration-300 group-hover:text-ink/80 md:text-sm">
                    {project.description}
                  </p>
                  <p className="mono-label mt-3 text-faint transition-colors duration-300 group-hover:text-ink/60">
                    {project.tags.join(" · ")}
                  </p>
                </div>

                <div className="mono-label flex items-center gap-4 text-faint transition-colors duration-300 group-hover:text-ink/70 md:flex-col md:items-end md:gap-2">
                  <span>{project.year}</span>
                  <span
                    className={
                      project.status === "SELF-HOSTED" || project.status === "DEPLOYED"
                        ? "text-acid transition-colors duration-300 group-hover:text-ink"
                        : ""
                    }
                  >
                    {project.status}
                  </span>
                  {href && (
                    <span className="hidden transition-transform duration-300 group-hover:translate-x-1 md:block">
                      {project.live ? "VISIT →" : "SOURCE →"}
                    </span>
                  )}
                </div>
              </div>
            </Tag>
          );
        })}
      </div>

      <div className="mt-10 flex justify-end">
        <a
          href="https://github.com/mdobaid311?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="mono-label group flex items-center gap-2 text-dim transition-colors hover:text-acid"
        >
          100+ more in the archive
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
