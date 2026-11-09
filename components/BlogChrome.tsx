import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/lib/data";

const link = "mono-label text-dim transition-colors hover:text-acid";

export function BlogHeader({ back }: { back: { href: string; label: string } }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Link href={back.href} className={link}>
        ← {back.label}
      </Link>
      <nav aria-label="Site" className="flex items-center gap-5">
        <Link href="/#work" className={`${link} hidden sm:inline`}>
          Projects
        </Link>
        <Link href="/#contact" className={`${link} hidden sm:inline`}>
          Contact
        </Link>
        <ThemeToggle />
      </nav>
    </div>
  );
}

export function BlogFooter() {
  return (
    <footer className="mt-24 border-t border-line pt-8">
      <p className="font-display text-base text-dim">
        Written by {profile.name}, full-stack engineer at {profile.company}.
      </p>
      <nav aria-label="Footer" className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
        <Link href="/" className={link}>
          Home
        </Link>
        <Link href="/#work" className={link}>
          Projects
        </Link>
        <Link href="/blog" className={link}>
          Blog
        </Link>
        <a href="https://github.com/mdobaid311" target="_blank" rel="noopener noreferrer" className={link}>
          GitHub ↗
        </a>
        <a href={`mailto:${profile.email}`} className={link}>
          Email
        </a>
      </nav>
    </footer>
  );
}
