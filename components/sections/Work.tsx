import SectionHeading from "@/components/SectionHeading";
import ProjectVisual from "@/components/ProjectVisual";
import { projects } from "@/lib/data";

export default function Work() {
  return (
    <section
      id="work"
      className="relative border-t border-line px-6 py-28 md:px-10 md:py-36"
    >
      <SectionHeading title="Projects" />

      <div className="border-t border-line">
        {projects.map((project) => {
          const href = project.live ?? project.repo;
          // A row with extra links cannot be one big <a> (links do not nest), so its
          // title link stretches over the row instead and the extra links sit on top.
          const stretched = Boolean(href && project.links);
          const Tag = href && !stretched ? "a" : "div";
          return (
            <div key={project.index} className="border-b border-line">
              <Tag
                {...(href && !stretched
                  ? { href, target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group relative block overflow-clip"
                data-cursor
              >
                {/* acid flip layer */}
                <span className="absolute inset-0 origin-top scale-y-0 bg-acid transition-transform duration-[420ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />

                <div className="relative grid items-baseline gap-3 px-1 py-8 transition-colors duration-300 md:grid-cols-[4rem_minmax(0,1.2fr)_minmax(0,1fr)_auto] md:gap-x-8 md:gap-y-6 md:py-10">
                  <span className="mono-label text-faint transition-colors duration-300 group-hover:text-ink/60">
                    /{project.index}
                  </span>

                  <h3 className="display-type text-3xl text-bone transition-colors duration-300 group-hover:text-ink md:text-5xl">
                    {stretched ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>

                  <div className="max-w-md">
                    <p className="font-display text-base leading-relaxed text-dim transition-colors duration-300 group-hover:text-ink/80">
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
                    {project.links?.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 underline-offset-4 hover:underline"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>

                  {project.visual && (
                    <div className="md:col-span-3 md:col-start-2">
                      <ProjectVisual visual={project.visual} />
                    </div>
                  )}
                </div>
              </Tag>

              {project.caseStudy && (
                <details className="case group px-1 pb-8 md:ml-24 md:pb-10">
                  <summary className="mono-label inline-flex cursor-pointer list-none items-center gap-2 text-dim transition-colors hover:text-acid [&::-webkit-details-marker]:hidden">
                    <span className="inline-block w-3 text-acid transition-transform group-open:rotate-45">
                      +
                    </span>
                    Case study
                  </summary>
                  <dl className="mt-6 grid max-w-3xl gap-x-8 gap-y-5 md:grid-cols-[8rem_minmax(0,1fr)]">
                    {project.caseStudy.map((row) => (
                      <div key={row.label} className="contents">
                        <dt className="mono-label pt-1 text-faint">{row.label}</dt>
                        <dd className="font-display text-base leading-relaxed text-bone">
                          {row.text}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </details>
              )}
            </div>
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
          100+ more on GitHub
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
