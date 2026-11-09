import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="gutter pt-32 md:pt-44">
      <div className="flex items-baseline justify-between border-b border-ink pb-3 text-sm">
        <h2 className="font-semibold">Experience</h2>
        <span className="text-muted">Since 2019</span>
      </div>

      <ol>
        {experience.map((job) => (
          <li key={job.company} className="grid gap-x-6 gap-y-4 border-b border-rule py-8 md:grid-cols-12 md:py-10">
            <p className="font-mono text-sm tabular-nums text-muted md:col-span-3">{job.dates}</p>
            <div className="md:col-span-4">
              <h3 className="display-type text-[clamp(1.75rem,2.6vw,2.6rem)] tracking-[-0.035em]">{job.company}</h3>
              <p className="mt-2 text-muted">{job.role}</p>
            </div>
            <ul className="space-y-2.5 leading-relaxed md:col-span-5">
              {job.notes.map((n) => (
                <li key={n} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-ink">
                  {n}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
