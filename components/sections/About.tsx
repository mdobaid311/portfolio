import LitText from "@/components/LitText";
import { profile } from "@/lib/data";

const statement =
  "3+ years shipping production code. 4 platforms running in production. 100+ public repositories, and 1 Kubernetes cluster I host myself.";

export default function About() {
  return (
    <section id="about" data-time="02:04" className="gutter pt-[22vh] pb-[18vh]">
      <div className="grid gap-6 border-t border-line pt-6 md:grid-cols-4">
        <h2 className="text-sm text-dim">In short</h2>
        <LitText
          text={statement}
          lit={["3+", "4", "100+", "1"]}
          className="display-type text-statement leading-[1.04] tracking-[-0.035em] text-dim md:col-span-3"
        />
      </div>

      <div className="mt-24 grid gap-6 border-t border-line pt-6 md:mt-32 md:grid-cols-4">
        <h2 className="text-sm text-dim">Tools I reach for</h2>
        <p className="text-lg leading-relaxed text-dim md:col-span-3">
          {profile.stack.map((t, i) => (
            <span key={t}>
              <span className="text-fg">{t}</span>
              {i < profile.stack.length - 1 && ", "}
            </span>
          ))}
          .
        </p>
      </div>
    </section>
  );
}
