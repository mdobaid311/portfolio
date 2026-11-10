import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import Header from "@/components/Header";
import Contact from "@/components/sections/Contact";
import ProjectScreen, { Frame } from "@/components/ProjectScreen";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";
import { renderMarkdown } from "@/lib/markdown";

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };
const pad = (n: number) => String(n).padStart(2, "0");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((q) => q.slug === slug);
  if (!p) return {};
  const url = `/work/${p.slug}`;
  return {
    title: p.title,
    description: p.logline,
    alternates: { canonical: url },
    // Without a poster, the site-wide image from app/opengraph-image.tsx stays.
    openGraph: { title: p.title, description: p.logline, url, type: "article", ...(p.media.poster && { images: [p.media.poster] }) },
  };
}

/** Shared with the home monitor and the next-project block: the screen and title morph between pages. */
const Shared = ({ name, children }: { name: string; children: React.ReactNode }) => (
  <ViewTransition name={name} default="none" share="auto">
    {children}
  </ViewTransition>
);

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  // Owner notes in the markdown are HTML comments; keep them out of the page source.
  const { html } = await renderMarkdown(`work/${slug}.md`);
  const body = html.replace(/<!--[\s\S]*?-->\s*/g, "");

  const meta = [
    ["Status", p.status],
    ["Role", p.role],
    ["Year", p.year],
    ["Stack", p.tags.join(", ")],
  ].filter(([, v]) => v);

  return (
    <>
      <Header />
      <main id="main" data-tone="night" className="relative z-10">
        <section id="top" data-time="02:20" className="gutter pb-20 pt-24 md:pb-28 md:pt-28">
          <p className="flex justify-between gap-4 text-sm">
            <Link href="/#work" className="hit-area link-draw text-dim hover:text-fg focus-visible:text-fg">
              ← Selected work
            </Link>
            <span className="font-mono text-dim">
              {pad(i + 1)} / {pad(projects.length)}
            </span>
          </p>

          <div className="mt-12 grid gap-y-6 md:mt-16 lg:grid-cols-12 lg:items-end lg:gap-x-6">
            <h1 className="display-type text-balance text-[clamp(2.4rem,7.7vw,9.1rem)] lg:col-span-8">
              <Shared name={`title-${p.slug}`}>
                <span className="inline-block">{p.title}</span>
              </Shared>
            </h1>
            <p className="max-w-[34ch] text-pretty text-xl leading-snug lg:col-span-4 lg:pb-[0.4em]">{p.logline}</p>
          </div>

          <Shared name={`screen-${p.slug}`}>
            <Frame className="mt-10 md:mt-14">
              <ProjectScreen media={p.media} live priority sizes="100vw" />
            </Frame>
          </Shared>

          <dl className="mt-10 grid gap-6 border-t border-line pt-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {meta.map(([label, value]) => (
              <div key={label}>
                <dt className="text-dim">{label}</dt>
                <dd className="mt-1.5">{value}</dd>
              </div>
            ))}
            <div>
              <dt className="text-dim">Links</dt>
              <dd className="mt-1.5 flex flex-wrap gap-x-5 gap-y-2 font-medium">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="hit-area link-draw">
                    {l.label}{" "}
                    <span aria-hidden className="arrow-ne">
                      ↗
                    </span>
                  </a>
                ))}
              </dd>
            </div>
          </dl>

          {p.outcome && <p className="display-type mt-20 max-w-[24ch] text-balance text-statement">{p.outcome}</p>}
        </section>

        <section data-time="03:10" aria-label="Case study" className="gutter pb-24 md:pb-32">
          <article className="post case" dangerouslySetInnerHTML={{ __html: body }} />
        </section>

        {/* overflow-x-clip: the window reveal starts the screen at scale 1.06, wider than the 32px gutter at 1920. */}
        <section data-time="04:10" className="gutter overflow-x-clip border-t border-line pb-24 pt-10 md:pb-32">
          <Link href={`/work/${next.slug}`} className="group block">
            <span className="text-sm text-dim">Next</span>{" "}
            {/* No shared names here: the home page names every project, so these would pair with it too. */}
            <span className="display-type mt-4 block text-title">
              <span className="link-draw [--line:2px]">{next.title}</span>
            </span>
            <Reveal variant="window" className="mt-8">
              <div aria-hidden>
                <Frame className="aspect-[16/6]! transition-opacity duration-450 group-hover:opacity-80">
                  <ProjectScreen media={next.media} sizes="100vw" />
                </Frame>
              </div>
            </Reveal>
          </Link>
        </section>
      </main>
      <Contact />
    </>
  );
}
