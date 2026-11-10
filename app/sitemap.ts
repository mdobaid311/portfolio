import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { projects } from "@/lib/data";

const BASE = "https://www.mohammedobaid.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE },
    ...projects.map((p) => ({ url: `${BASE}/work/${p.slug}` })),
    { url: `${BASE}/blog` },
    ...posts.map((p) => ({ url: `${BASE}/blog/${p.slug}`, lastModified: new Date(p.date) })),
  ];
}
