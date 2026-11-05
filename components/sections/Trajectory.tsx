import SectionHeading from "@/components/SectionHeading";
import { trajectory } from "@/lib/data";

export default function Trajectory() {
  return (
    <section
      id="trajectory"
      className="relative border-t border-line px-6 py-28 md:px-10 md:py-36"
    >
      <SectionHeading title="Experience" />

      <div className="relative">
        <span className="absolute left-0 top-0 hidden h-full w-px bg-line md:block" />

        <div className="flex flex-col">
          {trajectory.map((chapter) => (
            <article
              key={chapter.index}
              className="group relative border-b border-line py-10 first:border-t md:py-12 md:pl-14"
            >
              <span className="absolute left-0 top-12 hidden -translate-x-1/2 md:block">
                <span
                  className={`block size-2.5 rotate-45 ${
                    chapter.current ? "bg-acid" : "border border-dim bg-ink"
                  }`}
                />
              </span>

              <div className="grid gap-4 md:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1.3fr)] md:gap-10">
                <div className="mono-label pt-1.5 text-faint">
                  <span className={chapter.current ? "text-acid" : ""}>
                    {chapter.period}
                  </span>
                </div>

                <div>
                  <h3 className="display-type text-2xl text-bone transition-colors duration-300 group-hover:text-acid md:text-3xl">
                    {chapter.title}
                  </h3>
                  <p className="mono-label mt-3 text-dim">{chapter.org}</p>
                </div>

                <div>
                  <p className="font-mono text-sm leading-relaxed text-dim">
                    {chapter.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {chapter.stack.map((tech) => (
                      <span
                        key={tech}
                        className="mono-label border border-line px-2.5 py-1.5 text-faint transition-colors duration-300 group-hover:border-acid/30 group-hover:text-dim"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
