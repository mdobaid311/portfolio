import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const BASE = "https://www.mohammedobaid.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE },
    { url: `${BASE}/blog` },
    ...posts.map((p) => ({ url: `${BASE}/blog/${p.slug}`, lastModified: new Date(p.date) })),
  ];
}
