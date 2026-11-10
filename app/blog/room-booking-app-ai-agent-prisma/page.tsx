import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Contact from "@/components/sections/Contact";
import PostEnhancer from "@/components/PostEnhancer";
import { posts } from "@/lib/posts";
import { profile } from "@/lib/data";
import { renderMarkdown, type Toc } from "@/lib/markdown";

const SLUG = "room-booking-app-ai-agent-prisma";
const post = posts.find((p) => p.slug === SLUG)!;
const TITLE = post.title;
const DESCRIPTION = post.description;
const URL = `https://www.mohammedobaid.in/blog/${SLUG}`;
const REPO = "https://github.com/mdobaid311/room-booking-prisma-template";

export const metadata: Metadata = {
  title: TITLE,
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

async function render() {
  const { html, toc } = await renderMarkdown("room-booking-app-ai-agent-prisma.md");

  // the recap repeats the steps above it: keep it, folded
  const folded = html.replace(
    /(<h2 id="the-same-build-by-hand-in-brief">[\s\S]*?<\/h2>)([\s\S]*?)(?=<h2 )/,
    '$1<details class="fold"><summary>Show the quick reference</summary>$2</details>\n',
  );

  return { html: folded, toc };
}

function TocList({ toc }: { toc: Toc }) {
  return (
    <ol className="mt-4 flex flex-col gap-2.5">
      {toc.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="font-display text-sm leading-snug text-dim transition-colors hover:text-fg"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default async function Post() {
  const { html, toc } = await render();

  return (
    <>
    <Header />
    {/* A reading surface: paper (day tone). Opaque, because the footer curtain sits fixed underneath it. */}
    <main id="main" className="relative z-10 bg-bg">
    {/* The clock reads dawn here and runs on to the footer's 06:12. */}
    <div data-time="05:30" className="mx-auto max-w-3xl px-6 pb-24 pt-24 md:pb-32 md:pt-32 xl:max-w-6xl">
      <Link href="/blog" className="hit-area link-draw mono-label text-dim hover:text-fg">
        ← Blog
      </Link>

      <div className="mt-10 xl:grid xl:grid-cols-[14rem_minmax(0,1fr)] xl:gap-16">
        <aside className="hidden xl:block">
          {/* top-24: clears the fixed 56px header */}
          <nav aria-label="On this page" className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <p className="mono-label text-dim">On this page</p>
            <TocList toc={toc} />
          </nav>
        </aside>

        <div className="min-w-0 max-w-3xl">
          <h1 className="display-type text-4xl md:text-5xl">{TITLE}</h1>
          <p className="mono-label mt-6 text-dim">
            {post.date} · {post.readTime} · {profile.name}
          </p>
          <p className="mono-label mt-2 text-dim">{post.tags.join(" · ")}</p>

          <details className="mt-10 border border-line px-4 xl:hidden">
            <summary className="mono-label cursor-pointer py-3 text-dim">On this page</summary>
            <nav aria-label="On this page" className="pb-4">
              <TocList toc={toc} />
            </nav>
          </details>

          <article className="post mt-12" dangerouslySetInnerHTML={{ __html: html }} />

          <aside className="mt-16 border border-line bg-surface p-6 md:p-8">
            <p className="mono-label text-dim">Building something similar?</p>
            <p className="display-type mt-3 text-2xl md:text-3xl">Let&apos;s talk.</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              <a href={`mailto:${profile.email}`} className="mono-label text-signal hover:underline">
                Email me →
              </a>
              <a href={REPO} target="_blank" rel="noopener noreferrer" className="mono-label text-dim transition-colors hover:text-fg">
                Source on GitHub ↗
              </a>
              <Link href="/blog" className="mono-label text-dim transition-colors hover:text-fg">
                More writing →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <PostEnhancer />
    </div>
    </main>
    <Contact />
    </>
  );
}
