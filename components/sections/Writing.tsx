import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { posts } from "@/lib/posts";

export default function Writing() {
  const post = posts[0];
  return (
    <section id="writing" className="relative border-t border-line px-6 py-28 md:px-10 md:py-36">
      <SectionHeading title="Writing" />

      <Link
        href={`/blog/${post.slug}`}
        className="group grid gap-6 border border-line bg-panel p-6 transition-colors hover:border-acid/50 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-10"
      >
        <div className="max-w-3xl">
          <p className="mono-label text-faint">
            Latest · {post.date} · {post.readTime}
          </p>
          <h3 className="display-type mt-4 text-2xl text-bone transition-colors group-hover:text-acid md:text-4xl">
            {post.title}
          </h3>
          <p className="mt-5 font-display text-base leading-relaxed text-dim">
            {post.description}
          </p>
        </div>
        <span className="mono-label text-acid transition-transform duration-300 group-hover:translate-x-1">
          Read article →
        </span>
      </Link>

      <div className="mt-10 flex justify-end">
        <Link
          href="/blog"
          className="mono-label text-dim transition-colors hover:text-acid"
        >
          All posts →
        </Link>
      </div>
    </section>
  );
}
