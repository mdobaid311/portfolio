export type Post = {
  slug: string;
  title: string;
  date: string;
  /** 4184 words at ~225 wpm, code included. Recount if the article changes. */
  readTime: string;
  tags: string[];
  description: string;
};

export const posts: Post[] = [
  {
    slug: "room-booking-app-ai-agent-prisma",
    title: "How to build a room booking app with an AI agent using the Prisma stack",
    date: "Nov 4, 2026",
    readTime: "19 min read",
    tags: ["Prisma", "Next.js", "AI agents", "Postgres"],
    description:
      "Twenty-five requests for the same room at the same moment: one booking, twenty-four refusals. From an empty folder to a live URL with an AI coding agent, Prisma ORM, Prisma Postgres and Prisma Compute.",
  },
];
