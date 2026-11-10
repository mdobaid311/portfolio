import LitText from "@/components/LitText";
import Reveal from "@/components/Reveal";
import SectionHead, { Rule } from "@/components/SectionHead";
import { experience } from "@/lib/data";

const credentials =
  "By day I build asset-uptime software for rail, aviation and maritime at Smartquip.";

export default function Experience() {
  return (
    <section id="experience" data-time="04:10" className="gutter pt-24 md:pt-32">
      <SectionHead index="02" title="Experience" aside="Since 2019" />

      <LitText
        text={credentials}
        lit={["rail, aviation and maritime", "Smartquip"]}
        className="display-type text-statement leading-[1.04] tracking-[-0.035em] text-dim my-14 max-w-[28em] md:my-20"
      />

      <ol>
        {experience.map((job) => (
          <li key={job.company} className="relative">
            <Reveal className="grid gap-x-6 gap-y-4 py-8 md:grid-cols-12 md:py-10">
              <p className="font-mono text-sm tabular-nums text-dim md:col-span-3">{job.dates}</p>
              <div className="md:col-span-4">
                <h3 className="display-type text-subtitle tracking-[-0.035em]">{job.company}</h3>
                <p className="mt-2 text-dim">{job.role}</p>
              </div>
              <ul className="space-y-2.5 leading-relaxed md:col-span-5">
                {job.notes.map((n) => (
                  <li key={n} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-fg">
                    {n}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Rule className="absolute inset-x-0 bottom-0 bg-line" />
          </li>
        ))}
      </ol>
    </section>
  );
}
