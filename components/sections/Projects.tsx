import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="work" className="gutter pt-32 md:pt-44">
      <div className="flex items-baseline justify-between border-b border-ink pb-3 text-sm">
        <h2 className="font-semibold">Selected work</h2>
        <span className="text-muted">2023 – 2026</span>
      </div>

      <ul>
        {projects.map((p) => (
          <li key={p.title} className="border-b border-rule">
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-x-6 gap-y-3 py-6 md:grid-cols-12 md:items-baseline md:py-8"
            >
              <span className="font-mono text-sm tabular-nums text-muted md:col-span-1">{p.year}</span>
              <h3 className="display-type text-[clamp(2.1rem,4.4vw,4.5rem)] transition-[color,translate] duration-500 group-hover:translate-x-2 group-hover:text-accent md:col-span-5">
                {p.title}
                <span aria-hidden className="ml-3 inline-block text-[0.5em] align-middle opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  ↗
                </span>
              </h3>
              <p className="max-w-[44ch] text-base leading-relaxed text-muted md:col-span-4">{p.logline}</p>
              <p className="text-sm text-muted md:col-span-2 md:text-right">{p.tags.join(", ")}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
