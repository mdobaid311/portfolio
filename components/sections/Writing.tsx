import Link from "next/link";
import { posts } from "@/lib/posts";
import SectionHead from "@/components/SectionHead";

const allPosts = (
  <Link href="/blog" className="hit-area transition-colors hover:text-fg">
    All posts{" "}
    <span aria-hidden className="arrow-e">
      →
    </span>
  </Link>
);

export default function Writing() {
  // One or two posts do not earn a section of their own: show the latest as a single wide row.
  if (posts.length < 3) {
    const p = posts[0];
    return (
      <section id="writing" data-time="04:50" className="gutter pt-24 md:pt-32">
        <div className="grid gap-x-6 gap-y-3 border-t border-line pt-6 md:grid-cols-12 md:items-baseline">
          <h2 className="text-sm text-dim md:col-span-3">Writing</h2>
          {p && (
            <Link href={`/blog/${p.slug}`} className="group flex flex-col gap-2 md:col-span-7 md:flex-row md:items-baseline md:justify-between md:gap-6">
              <span className="display-type text-subtitle tracking-[-0.035em] underline decoration-transparent decoration-1 underline-offset-[0.22em] transition-[text-decoration-color] group-hover:decoration-current">
                {p.title}
              </span>
              <span className="shrink-0 whitespace-nowrap text-sm text-dim">
                {p.readTime} <span aria-hidden className="arrow-e">→</span>
              </span>
            </Link>
          )}
          <p className="text-sm text-dim md:col-span-2 md:text-right">{allPosts}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="writing" data-time="04:50" className="gutter pt-24 md:pt-32">
      <SectionHead index="03" title="Writing" aside={allPosts} />
      <ul>
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-line">
            {/* A rule wipes in along the row's bottom edge on hover. */}
            <Link
              href={`/blog/${p.slug}`}
              className="group relative grid gap-x-6 gap-y-2 py-6 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-fg after:transition-transform after:duration-500 hover:after:scale-x-100 focus-visible:after:scale-x-100 md:grid-cols-12 md:items-baseline md:py-8"
            >
              <span className="font-mono text-sm tabular-nums text-dim md:col-span-3">{p.date}</span>
              <span className="text-2xl leading-snug tracking-[-0.02em] md:col-span-7 md:text-3xl">{p.title}</span>
              <span className="text-sm text-dim md:col-span-2 md:text-right">{p.readTime}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
