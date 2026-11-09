import SectionHeading from "@/components/SectionHeading";
import Corners from "@/components/Corners";
import { coreSkills, skillGroups } from "@/lib/data";

export default function Arsenal() {
  return (
    <section id="arsenal" className="relative border-t border-line py-28 md:py-36">
      <div className="px-6 md:px-10">
        <SectionHeading title="Skills" />

        <div className="mb-14">
          <p className="mono-label mb-5 text-faint">Core · what I reach for every day</p>
          <ul className="flex flex-wrap gap-3">
            {coreSkills.map((skill) => (
              <li
                key={skill}
                className="display-type border border-acid/40 px-4 py-3 text-lg text-bone transition-colors hover:border-acid hover:text-acid md:text-2xl"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-px border-y border-line bg-line px-0 sm:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group) => (
          <div key={group.index} className="relative bg-ink p-6 md:p-8">
            <Corners className="opacity-0 transition-opacity duration-300 [div:hover>&]:opacity-100" />
            <div className="mono-label mb-6 text-faint">{group.label}</div>
            <ul className="flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-sm text-dim transition-colors duration-200 hover:text-bone"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
