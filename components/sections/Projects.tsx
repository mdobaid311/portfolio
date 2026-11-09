import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="work" className="gutter pt-32 md:pt-44">
      <div className="flex items-baseline justify-between border-b border-ink pb-3 text-sm">
        <h2 className="font-semibold">Selected work</h2>
        <span className="font-mono text-muted">({String(projects.length).padStart(2, "0")})</span>
      </div>

      {projects.map((p, i) => {
        const flip = i % 2 === 1;
        return (
          <article key={p.title} className="grid gap-10 border-b border-rule py-14 md:py-20 lg:grid-cols-12 lg:gap-x-6">
            <Reveal
              className={`flex flex-col lg:row-start-1 ${flip ? "lg:col-span-4 lg:col-start-9" : "lg:col-span-4 lg:col-start-1"}`}
            >
              <p className="flex justify-between text-sm text-muted">
                <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
                <span>{p.status}</span>
              </p>
              <h3 className="display-type mt-6 text-balance text-[clamp(2.4rem,4.4vw,5rem)]">{p.title}</h3>
              <p className="mt-5 max-w-[34ch] text-pretty text-xl leading-snug">{p.logline}</p>

              <dl className="mt-10 space-y-4 text-[0.95rem] leading-relaxed">
                {p.points.map(([label, text]) => (
                  <div key={label} className="grid grid-cols-[5rem_1fr] gap-4 border-t border-rule pt-4">
                    <dt className="text-muted">{label}</dt>
                    <dd className="text-pretty">{text}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 text-sm text-muted">{p.tags.join(" · ")}</p>
              <p className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8 text-sm font-medium">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-draw hover:text-accent">
                    {l.label} ↗
                  </a>
                ))}
              </p>
            </Reveal>

            <Reveal
              delay={0.12}
              className={`lg:row-start-1 ${flip ? "lg:col-span-7 lg:col-start-1" : "lg:col-span-7 lg:col-start-6"}`}
            >
              <ProjectVisual kind={p.visual} />
            </Reveal>
          </article>
        );
      })}
    </section>
  );
}
