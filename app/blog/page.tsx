import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Mohammed Obaid",
  description: "Writing by Mohammed Obaid on building with Next.js, Prisma and AI agents.",
  alternates: { canonical: "https://www.mohammedobaid.in/blog" },
};

const posts = [
  {
    slug: "room-booking-app-ai-agent-prisma",
    title: "How to build a room booking app with an AI agent using the Prisma stack",
    date: "Nov 4, 2026",
    description:
      "Twenty-five requests for the same room at the same moment: one booking, twenty-four refusals. From an empty folder to a live URL with an AI coding agent, Prisma ORM, Prisma Postgres and Prisma Compute.",
  },
];

export default function BlogIndex() {
  return (
    <main className="blog-page mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link href="/" className="mono-label text-dim transition-colors hover:text-acid">
        ← Mohammed Obaid
      </Link>
      <h1 className="display-type mt-10 text-5xl md:text-6xl">Blog</h1>
      <ul className="mt-12 border-t border-line">
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-line">
            <Link href={`/blog/${p.slug}`} className="group block py-8">
              <p className="mono-label text-dim">{p.date}</p>
              <h2 className="display-type mt-3 text-2xl transition-colors group-hover:text-acid md:text-3xl">
                {p.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-dim">{p.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
