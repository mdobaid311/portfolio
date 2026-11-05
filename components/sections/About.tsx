import SectionHeading from "@/components/SectionHeading";
import Corners from "@/components/Corners";
import { profile } from "@/lib/data";

const TERMINAL_ROWS = [
  { key: "name", value: "mohammed_obaid" },
  { key: "role", value: "software_developer" },
  { key: "org", value: "smartquip · remote" },
  { key: "base", value: "hyderabad.in" },
  { key: "edu", value: "b.e._cs, mjcet_2023" },
  { key: "stack", value: "react / next / .net / node" },
  { key: "focus", value: "realtime_pipelines + ai_products" },
  { key: "hireable", value: "true", acid: true },
];

export default function About() {
  return (
    <section
      id="profile"
      className="relative border-t border-line px-6 py-28 md:px-10 md:py-36"
    >
      <SectionHeading title="About" />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* terminal identity card */}
        <div className="relative self-start border border-line bg-panel p-6 md:p-8">
          <Corners />
          <div className="mono-label mb-6 flex items-center justify-between text-faint">
            <span>identity.log</span>
            <span className="flex gap-1.5">
              <span className="size-2 rounded-full bg-faint" />
              <span className="size-2 rounded-full bg-faint" />
              <span className="size-2 rounded-full bg-acid" />
            </span>
          </div>
          <div className="flex flex-col gap-3 font-mono text-xs md:text-sm">
            {TERMINAL_ROWS.map((row) => (
              <div key={row.key} className="flex gap-3">
                <span className="w-24 shrink-0 text-faint">{row.key}</span>
                <span className={row.acid ? "text-acid" : "text-bone"}>
                  {row.value}
                </span>
              </div>
            ))}
            <div className="mt-2 flex items-center gap-2 text-faint">
              <span className="text-acid">$</span>
              <span className="animate-blink inline-block h-4 w-2 bg-acid" />
            </div>
          </div>
        </div>

        {/* bio + stats */}
        <div>
          {profile.about.map((para, i) => (
            <p
              key={i}
              className={`font-mono leading-relaxed ${
                i === 0
                  ? "mb-6 text-lg text-bone md:text-2xl md:leading-relaxed"
                  : "mb-6 text-sm text-dim md:text-base"
              }`}
            >
              {para}
            </p>
          ))}

          <div className="mt-14 grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
            {profile.stats.map((stat) => (
              <div
                key={stat.label}
                className="border-b border-r border-line p-5 md:p-6"
              >
                <div className="display-type text-4xl text-bone md:text-5xl">
                  {stat.value}
                  <span className="text-acid">{stat.suffix}</span>
                </div>
                <div className="mono-label mt-3 text-faint">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
