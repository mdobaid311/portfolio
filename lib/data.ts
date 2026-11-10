export const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IO = [0.76, 0, 0.24, 1] as const;


export const profile = {
  name: "Mohammed Obaid",
  role: "Full-Stack Software Engineer",
  company: "Smartquip",
  companyMode: "Remote",
  location: "Hyderabad, India",
  coordinates: "17.3850° N / 78.4867° E",
  email: "mdobaid311@gmail.com",
  available: true,
  bio: "I build and ship production web applications end to end — from React and Next.js front ends to .NET and Node.js back ends, event-driven microservices, and self-hosted Kubernetes deployments. At Smartquip I'm the sole React developer on an asset-uptime platform tracking equipment across rail, aviation and maritime.",
  socials: [
    { label: "GitHub", handle: "mdobaid311", href: "https://github.com/mdobaid311" },
    { label: "X / Twitter", handle: "@mdobaid311", href: "https://twitter.com/mdobaid311" },
    { label: "Instagram", handle: "@obaid.code", href: "https://www.instagram.com/obaid.code" },
    { label: "LinkedIn", handle: "Mohammed Obaid", href: "https://www.linkedin.com/in/mohammed-obaid-56a33920b/" },
    { label: "Blog", handle: "Blog", href: "/blog" },
  ],
  stack: [
    "TypeScript", "React", "Next.js", ".NET", "C#", "Node.js", "Kafka", "Kubernetes",
    "Docker", "PostgreSQL", "Redis", "ZooKeeper", "MongoDB", "Python", "FastAPI", "Tailwind", "GSAP",
  ],
};

/** Flip to true once the /work/<slug> case-study pages exist: titles and the monitor become links. */
export const CASE_STUDIES_LIVE = true;

export type Project = {
  slug: string;
  title: string;
  status: string;
  /** Empty until confirmed; empty fields are not rendered. */
  year: string;
  role: string;
  logline: string;
  /** One line with a number. */
  outcome?: string;
  points: [label: string, text: string][];
  tags: string[];
  links: { label: string; href: string }[];
  /** What the screen shows: a screenshot (`poster`), or without one the built-in stand-in (`mock`) in the same frame. */
  media: {
    poster?: string;
    alt: string;
    fit?: "cover" | "contain";
    /** CSS object-position for the crop. */
    position?: string;
    mock?: "miniurl" | "recorder";
  };
};

export const projects: Project[] = [
  {
    slug: "resource-scheduler",
    title: "Resource Scheduler",
    status: "On npm",
    year: "", // TODO(confirm): year of first npm release
    role: "", // TODO(confirm): e.g. "Design and build"
    logline: "A free React scheduler with a resource timeline. Drag, resize, no double booking.",
    outcome: undefined, // TODO(asset): one line with a number (weekly npm downloads, GitHub stars)
    points: [
      ["Problem", "Booking screens need rooms, people or machines as rows on a timeline, with overlap rules enforced while you drag."],
      ["Built", "A React component with drag, resize and move, no-double-booking checks, keyboard support and a headless rules module."],
      ["Ships", "MIT licensed on npm, with docs and live demos. It powers the room booking app in my blog post."],
    ],
    tags: ["TypeScript", "React"],
    links: [
      { label: "Docs", href: "https://resource-scheduler-docs.vercel.app/" },
      { label: "npm", href: "https://www.npmjs.com/package/resource-scheduler" },
      { label: "GitHub", href: "https://github.com/mdobaid311/resource-scheduler" },
    ],
    media: {
      poster: "/work/resource-scheduler.png",
      alt: "A room booking app built with Resource Scheduler: rooms as rows on a day timeline, with bookings dragged into free slots.",
      position: "50% 0%",
    },
  },
  {
    slug: "miniurl",
    title: "MiniURL",
    status: "Self-hosted",
    year: "", // TODO(confirm): year built
    role: "", // TODO(confirm): e.g. "Design and build"
    logline: "A distributed URL shortener, built to be run rather than demoed.",
    outcome: undefined, // TODO(asset): one line with a number (p95 redirect latency, requests per second under load)
    points: [
      ["Problem", "Resolve links fast and never hand out the same code twice, even with several instances writing at once."],
      ["Built", "Three services behind one API. ZooKeeper hands out unique Base62 ranges, Redis caches hot URLs and MongoDB runs as a replica set, with JWT auth, analytics and rate limiting on top."],
      ["Runs", "On a multi-node Kubernetes cluster I host myself, with autoscaling and zero-downtime rolling updates."],
    ],
    tags: ["Node.js", "MongoDB", "Redis", "ZooKeeper", "Kubernetes"],
    links: [{ label: "GitHub", href: "https://github.com/mdobaid311/MiniURL" }],
    // TODO(asset): 16:10 screenshot (poster) to replace the stand-in diagram.
    media: {
      mock: "miniurl",
      alt: "MiniURL architecture: a client calls three services on a self-hosted Kubernetes cluster. The services use ZooKeeper for collision-free Base62 codes, Redis for hot URLs and a MongoDB replica set.",
    },
  },
  {
    slug: "liliums",
    title: "Liliums",
    status: "Live",
    year: "", // TODO(confirm): launch year
    role: "", // TODO(confirm): e.g. "Design and build"
    logline: "Website for Liliums, a floral studio in Hyderabad.",
    outcome: undefined, // TODO(asset): one line with a number (WhatsApp orders per month since launch)
    points: [
      ["Brief", "Put the bouquets online without the weight of a shop: browse, pick, message."],
      ["Built", "A catalogue of eight collections and seventy-one bouquets, each in Standard, Deluxe or Premium."],
      ["Orders", "No checkout. Order opens WhatsApp with the bouquet already named in the message."],
    ],
    tags: ["Catalogue", "WhatsApp ordering"],
    links: [{ label: "liliums.in", href: "https://www.liliums.in" }],
    media: {
      poster: "/work/liliums.jpg",
      alt: "The Liliums home page: a gold rose under an arch above the Liliums wordmark, with Order on WhatsApp and Shop by occasion buttons.",
      position: "50% 75%",
    },
  },
  {
    slug: "guide-recorder",
    title: "Guide Recorder",
    status: "In development",
    year: "", // TODO(confirm): year started
    role: "", // TODO(confirm): e.g. "Design and build"
    logline: "Record a browser workflow once, get an editable step-by-step guide.",
    outcome: undefined, // TODO(asset): one line with a number (minutes to document a workflow, before and after)
    points: [
      ["Problem", "Documenting a workflow by hand means screenshotting every click, and the guide is stale the next time the UI changes."],
      ["Built", "A Chrome MV3 extension streams clicks, input and screenshots to a Next.js backend that writes each step with Google GenAI and redacts sensitive parts."],
      ["Runs", "Local-first. Edit the guide, then export Markdown, HTML or PDF."],
    ],
    tags: ["Next.js", "Chrome MV3", "Prisma", "Google GenAI"],
    links: [{ label: "GitHub", href: "https://github.com/mdobaid311/documentation-creation-tool" }],
    // TODO(asset): 16:10 screenshot (poster) of a generated guide to replace the stand-in.
    media: {
      mock: "recorder",
      alt: "Guide Recorder mock-up: a guide titled How to send an invoice writes itself step by step, with the customer’s email redacted.",
    },
  },
];

export type Role = {
  company: string;
  role: string;
  dates: string;
  notes: string[];
};

export const experience: Role[] = [
  {
    company: "Smartquip",
    role: "Software Developer · Remote",
    dates: "JUL 2024 — NOW",
    notes: [
      "Sole React developer on an asset-uptime monitoring platform for rail, aviation and maritime.",
      "Architected a Ground Support Equipment management system from scratch, set to run operations at the new Western Sydney International Airport.",
      "Migrated a legacy freight-tracking app to the latest .NET.",
    ],
  },
  {
    company: "XIT Solutions Inc",
    role: "Junior Software Engineer",
    dates: "JAN 2023 — JUL 2024",
    notes: [
      "Built a real-time stream-processing platform on Apache Kafka.",
      "Full-stack developer on a sales-analytics application for Guitar Center.",
      "Front end of a cloud taxation product with React and Microsoft Power Platform.",
    ],
  },
  {
    company: "MJCET, Hyderabad",
    role: "B.E. Computer Science",
    dates: "2019 — 2023",
    notes: [
      "Shipped 100+ public repositories in the open: experiments, clones and side projects.",
      "Final-year project: Pins, an AI image-generation social app that is still live.",
    ],
  },
];
