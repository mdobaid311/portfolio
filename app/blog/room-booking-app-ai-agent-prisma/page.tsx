import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { marked } from "marked";

const TITLE = "How to build a room booking app with an AI agent using the Prisma stack";
const DESCRIPTION =
  "Twenty-five requests for the same room at the same moment: one booking, twenty-four refusals. Building it from an empty folder to a live URL with an AI coding agent, Prisma ORM, Prisma Postgres and Prisma Compute.";
const URL = "https://www.mohammedobaid.in/blog/room-booking-app-ai-agent-prisma";

export const metadata: Metadata = {
  title: `${TITLE} — Mohammed Obaid`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Mohammed Obaid",
    type: "article",
    publishedTime: "2026-11-04",
    authors: ["Mohammed Obaid"],
    images: ["https://www.mohammedobaid.in/blog/screenshot-dark.png"],
  },
};

// Own trusted markdown file, rendered at build time.
const html = marked.parse(
  readFileSync(join(process.cwd(), "content/room-booking-app-ai-agent-prisma.md"), "utf8"),
  { async: false },
);

export default function Post() {
  return (
    <main className="blog-page mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link href="/blog" className="mono-label text-dim transition-colors hover:text-acid">
        ← Blog
      </Link>
      <h1 className="display-type mt-10 text-4xl md:text-5xl">{TITLE}</h1>
      <p className="mono-label mt-6 text-dim">Nov 4, 2026 · Mohammed Obaid</p>
      <article className="post mt-12" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
