import Link from "next/link";
import { posts } from "@/lib/posts";
import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <>
      <section id="writing" className="gutter pt-32 md:pt-44">
        <div className="flex items-baseline justify-between border-b border-ink pb-3 text-sm">
          <h2 className="font-semibold">Writing</h2>
          <Link href="/blog" className="text-muted transition-colors hover:text-accent">
            All posts →
          </Link>
        </div>
        <ul>
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-rule">
              <Link href={`/blog/${p.slug}`} className="group grid gap-x-6 gap-y-2 py-6 md:grid-cols-12 md:items-baseline md:py-8">
                <span className="font-mono text-sm tabular-nums text-muted md:col-span-3">{p.date}</span>
                <span className="text-2xl leading-snug tracking-[-0.02em] transition-colors group-hover:text-accent md:col-span-7 md:text-3xl">
                  {p.title}
                </span>
                <span className="text-sm text-muted md:col-span-2 md:text-right">{p.readTime}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer id="contact" className="mt-32 bg-ink gutter pb-6 pt-20 text-paper md:mt-44 md:pt-28">
        <p className="text-paper/60">Have something that needs building? Write to me.</p>
        <a
          href={`mailto:${profile.email}`}
          className="display-type mt-5 block break-words text-[clamp(2.25rem,8.2vw,10rem)] transition-colors duration-500 hover:text-accent"
        >
          {profile.email}
        </a>

        <div className="mt-24 grid gap-10 text-sm leading-relaxed md:mt-32 md:grid-cols-4 md:gap-6">
          <ul>
            {profile.socials.map((s) => {
              const external = s.href.startsWith("http");
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="transition-colors hover:text-accent"
                  >
                    {s.label} {external && "↗"}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="text-paper/60">
            {profile.location}
            <br />
            {profile.coordinates}
          </p>
          <p className="text-paper/60 md:col-span-2">
            Set in Schibsted Grotesk. Built with Next.js, Tailwind CSS, Motion and Lenis. The footage is me at my
            desk, shot on a phone.
          </p>
        </div>

        <div className="mt-20 flex justify-between border-t border-paper/15 pt-5 text-sm text-paper/60">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a href="#top" className="transition-colors hover:text-paper">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}
