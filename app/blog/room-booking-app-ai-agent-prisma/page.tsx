import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { Marked } from "marked";
import { createHighlighter } from "shiki";
import { BlogFooter, BlogHeader } from "@/components/BlogChrome";
import PostEnhancer from "@/components/PostEnhancer";
import { posts } from "@/lib/posts";
import { profile } from "@/lib/data";

const SLUG = "room-booking-app-ai-agent-prisma";
const post = posts.find((p) => p.slug === SLUG)!;
const TITLE = post.title;
const DESCRIPTION = post.description;
const URL = `https://www.mohammedobaid.in/blog/${SLUG}`;
const REPO = "https://github.com/mdobaid311/room-booking-prisma-template";

export const metadata: Metadata = {
  title: `${TITLE} | Mohammed Obaid`,
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

const LANGS = new Set(["bash", "prisma", "sql", "ts", "yaml"]);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Own trusted markdown file, rendered at build time. Code is highlighted with shiki (no client JS).
async function render() {
  const hl = await createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: [...LANGS],
  });
  const toc: { id: string; text: string }[] = [];

  const md = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        if (depth !== 2) return `<h${depth}>${inner}</h${depth}>\n`;
        const text = tokens.map((t) => t.raw).join("").replace(/[`*]/g, "");
        const id = slugify(text);
        toc.push({ id, text });
        return `<h2 id="${id}">${inner}</h2>\n`;
      },
      code({ text, lang }) {
        const known = lang && LANGS.has(lang) ? lang : "text";
        const html = hl.codeToHtml(text, {
          lang: known,
          themes: { light: "github-light", dark: "github-dark" },
          defaultColor: false,
        });
        return `<div class="code" data-lang="${esc(lang || "text")}">${html}</div>\n`;
      },
      image({ href, text }) {
        return `<figure><img src="${esc(href)}" alt="${esc(text)}" loading="lazy"><figcaption>${esc(text)}</figcaption></figure>`;
      },
      paragraph({ tokens }) {
        const inner = this.parser.parseInline(tokens);
        // a lone image becomes a <figure>, which cannot sit inside a <p>
        return tokens.length === 1 && tokens[0].type === "image" ? inner : `<p>${inner}</p>\n`;
      },
    },
  });

  let html = md.parse(
    readFileSync(join(process.cwd(), "content/room-booking-app-ai-agent-prisma.md"), "utf8"),
    { async: false },
  ) as string;

  // external links open in a new tab, so readers keep their place in the article
  html = html.replace(/<a href="(https?:)/g, '<a target="_blank" rel="noopener noreferrer" href="$1');

  // the recap repeats the steps above it: keep it, folded
  html = html.replace(
    /(<h2 id="the-same-build-by-hand-in-brief">[\s\S]*?<\/h2>)([\s\S]*?)(?=<h2 )/,
    '$1<details class="fold"><summary>Show the quick reference</summary>$2</details>\n',
  );

  return { html, toc };
}

function TocList({ toc }: { toc: { id: string; text: string }[] }) {
  return (
    <ol className="mt-4 flex flex-col gap-2.5">
      {toc.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="font-display text-sm leading-snug text-muted transition-colors hover:text-accent"
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
    <main id="main" className="blog-page mx-auto max-w-3xl px-6 py-16 md:py-24 xl:max-w-6xl">
      <BlogHeader back={{ href: "/blog", label: "Blog" }} />

      <div className="mt-10 xl:grid xl:grid-cols-[14rem_minmax(0,1fr)] xl:gap-16">
        <aside className="hidden xl:block">
          <nav aria-label="On this page" className="sticky top-10 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <p className="mono-label text-muted">On this page</p>
            <TocList toc={toc} />
          </nav>
        </aside>

        <div className="min-w-0 max-w-3xl">
          <h1 className="display-type text-4xl md:text-5xl">{TITLE}</h1>
          <p className="mono-label mt-6 text-muted">
            {post.date} · {post.readTime} · {profile.name}
          </p>
          <p className="mono-label mt-2 text-muted">{post.tags.join(" · ")}</p>

          <details className="mt-10 border border-rule px-4 xl:hidden">
            <summary className="mono-label cursor-pointer py-3 text-muted">On this page</summary>
            <nav aria-label="On this page" className="pb-4">
              <TocList toc={toc} />
            </nav>
          </details>

          <article className="post mt-12" dangerouslySetInnerHTML={{ __html: html }} />

          <aside className="mt-16 border border-rule bg-card p-6 md:p-8">
            <p className="mono-label text-muted">Building something similar?</p>
            <p className="display-type mt-3 text-2xl md:text-3xl">Let&apos;s talk.</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              <a href={`mailto:${profile.email}`} className="mono-label text-accent hover:underline">
                Email me →
              </a>
              <a href={REPO} target="_blank" rel="noopener noreferrer" className="mono-label text-muted transition-colors hover:text-accent">
                Source on GitHub ↗
              </a>
              <Link href="/blog" className="mono-label text-muted transition-colors hover:text-accent">
                More writing →
              </Link>
            </div>
          </aside>

          <BlogFooter />
        </div>
      </div>

      <PostEnhancer />
    </main>
  );
}
