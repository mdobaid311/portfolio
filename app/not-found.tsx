import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
};

const link = "hit-area link-draw hover:text-signal";

export default function NotFound() {
  return (
    <>
      <Header />
      {/* Night, full viewport. The only time stamp is 03:33, so the header clock stays frozen there. */}
      <main id="main" data-tone="night" data-time="03:33" className="gutter flex min-h-svh flex-col justify-center py-24">
        <p className="font-mono text-sm text-dim">404</p>
        <h1 className="display-type mt-6 max-w-[12ch] text-title text-balance">
          Nothing here, <em className="font-medium">even after dark.</em>
        </h1>
        <p className="mt-8 max-w-[44ch] text-lg leading-relaxed text-dim">
          The page you followed doesn’t exist, or it has moved. These ones do.
        </p>
        <p className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
          <Link href="/" className={link}>
            Home
          </Link>
          <Link href="/#work" className={link}>
            Selected work
          </Link>
          <Link href="/blog" className={link}>
            Writing
          </Link>
          <a href={`mailto:${profile.email}`} className={link}>
            Email me
          </a>
        </p>
      </main>
    </>
  );
}
