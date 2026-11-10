import LitText from "@/components/LitText";
import WorldClocks from "@/components/WorldClocks";

const FACTS = [
  { label: "What I take on", value: "Web apps end to end: product front ends, APIs, and the infrastructure they run on." },
  { label: "Freelance", value: "Open for freelance work. Email me." },
  { label: "Replies", value: "Near instant." },
];

/** Night tone, last section of the dark page. The bottom padding is the breathing room before the curtain lifts. */
export default function WorkingTogether() {
  return (
    <section id="together" data-time="05:30" className="gutter pt-24 pb-[20vh] md:pt-32">
      <LitText
        text="When it is after dark here, it is the working day in New York and San Francisco."
        lit={["New York", "San Francisco"]}
        className="display-type text-statement leading-[1.04] tracking-[-0.035em] text-dim max-w-[22em]"
      />

      <div className="mt-14 md:mt-20">
        <WorldClocks />
      </div>

      {/* One fact reads as a single row, three as three columns; the hairline sits above each either way. */}
      <dl className="mt-14 grid gap-x-6 gap-y-8 md:mt-20 md:grid-cols-3">
        {FACTS.map((f) => (
          <div key={f.label} className="border-t border-line pt-4">
            <dt className="text-sm text-dim">{f.label}</dt>
            <dd className="mt-2 max-w-[28em] text-xl text-fg">{f.value}</dd>
          </div>
        ))}
      </dl>

      {/* TODO(asset): one testimonial (quote in text-subtitle, name and role beneath in text-dim). Omit until a real one exists. */}
    </section>
  );
}
