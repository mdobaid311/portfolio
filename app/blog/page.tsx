import type { Metadata } from "next";
import Link from "next/link";
import { BlogFooter, BlogHeader } from "@/components/BlogChrome";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Mohammed Obaid",
  description: "Writing by Mohammed Obaid on building with Next.js, Prisma and AI agents.",
  alternates: { canonical: "https://www.mohammedobaid.in/blog" },
};

export default function BlogIndex() {
  return (
    <main id="main" className="blog-page mx-auto max-w-3xl px-6 py-16 md:py-24">
      <BlogHeader back={{ href: "/", label: "Mohammed Obaid" }} />

      <p className="mono-label mt-16 text-acid">Engineering journal</p>
      <h1 className="display-type mt-4 text-4xl md:text-6xl">
        Ideas, systems &amp; things I&apos;ve built.
      </h1>
      <p className="mt-6 max-w-xl font-display text-lg leading-relaxed text-dim">
        Practical notes on full-stack development, distributed systems, AI-assisted workflows
        and developer tooling.
      </p>

      <ul className="mt-14 border-t border-line">
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-line">
            <Link href={`/blog/${p.slug}`} className="group block py-8">
              <p className="mono-label text-dim">
                {p.date} · {p.readTime}
              </p>
              <h2 className="display-type mt-3 text-2xl transition-colors group-hover:text-acid md:text-3xl">
                {p.title}
              </h2>
              <p className="mt-4 font-display text-base leading-relaxed text-dim">
                {p.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="mono-label text-faint">{p.tags.join(" · ")}</p>
                <span className="mono-label text-acid transition-transform duration-300 group-hover:translate-x-1">
                  Read article →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <BlogFooter />
    </main>
  );
}
