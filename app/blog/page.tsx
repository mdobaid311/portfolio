import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Contact from "@/components/sections/Contact";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing by Mohammed Obaid on building with Next.js, Prisma and AI agents.",
  alternates: { canonical: "/blog" },
  // Without its own openGraph block the page would inherit the home page's og:title and og:url.
  openGraph: {
    title: "Blog | Mohammed Obaid",
    description: "Writing by Mohammed Obaid on building with Next.js, Prisma and AI agents.",
    url: "/blog",
    siteName: "Mohammed Obaid",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Mohammed Obaid: I build web software end to end, mostly after dark." }],
  },
};

export default function BlogIndex() {
  return (
    <>
      <Header />
      {/* A reading surface: paper (day tone). Opaque, because the footer curtain sits fixed underneath it. */}
      <main id="main" className="relative z-10 bg-bg">
        {/* The clock reads dawn here and runs on to the footer's 06:12. */}
        <div data-time="05:30" className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:pb-32 md:pt-40">
          <p className="mono-label text-signal">Engineering journal</p>
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
                  <h2 className="display-type mt-3 text-2xl transition-colors group-hover:text-signal md:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-4 font-display text-base leading-relaxed text-dim">
                    {p.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <p className="mono-label text-dim">{p.tags.join(" · ")}</p>
                    <span className="mono-label text-signal transition-transform duration-300 group-hover:translate-x-1">
                      Read article →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Contact />
    </>
  );
}
