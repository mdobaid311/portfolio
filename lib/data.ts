export const EXPO_OUT = [0.16, 1, 0.3, 1] as const;


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
    { label: "Blog", handle: "Blog", href: "/blog" },
  ],
  stack: [
    "TypeScript", "React", "Next.js", ".NET", "C#", "Node.js", "Kafka", "Kubernetes",
    "Docker", "PostgreSQL", "Redis", "ZooKeeper", "MongoDB", "Python", "FastAPI", "Tailwind", "GSAP",
  ],
};

export type Project = {
  title: string;
  status: string;
  logline: string;
  points: [label: string, text: string][];
  tags: string[];
  links: { label: string; href: string }[];
  visual: "miniurl" | "scheduler" | "recorder" | "liliums" | "portfolio";
};

export const projects: Project[] = [
  {
    title: "MiniURL",
    status: "Self-hosted",
    logline: "A distributed URL shortener, built to be run rather than demoed.",
    points: [
      ["Problem", "Resolve links fast and never hand out the same code twice, even with several instances writing at once."],
      ["Built", "Three services behind one API. ZooKeeper hands out unique Base62 ranges, Redis caches hot URLs and MongoDB runs as a replica set, with JWT auth, analytics and rate limiting on top."],
      ["Runs", "On a multi-node Kubernetes cluster I host myself, with autoscaling and zero-downtime rolling updates."],
    ],
    tags: ["Node.js", "MongoDB", "Redis", "ZooKeeper", "Kubernetes"],
    links: [{ label: "GitHub", href: "https://github.com/mdobaid311/MiniURL" }],
    visual: "miniurl",
  },
  {
    title: "Resource Scheduler",
    status: "On npm",
    logline: "A free React scheduler with a resource timeline. Drag, resize, no double booking.",
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
    visual: "scheduler",
  },
  {
    title: "Guide Recorder",
    status: "In development",
    logline: "Record a browser workflow once, get an editable step-by-step guide.",
    points: [
      ["Problem", "Documenting a workflow by hand means screenshotting every click, and the guide is stale the next time the UI changes."],
      ["Built", "A Chrome MV3 extension streams clicks, input and screenshots to a Next.js backend that writes each step with Google GenAI and redacts sensitive parts."],
      ["Runs", "Local-first. Edit the guide, then export Markdown, HTML or PDF."],
    ],
    tags: ["Next.js", "Chrome MV3", "Prisma", "Google GenAI"],
    links: [{ label: "GitHub", href: "https://github.com/mdobaid311/documentation-creation-tool" }],
    visual: "recorder",
  },
  {
    title: "Liliums",
    status: "Live",
    logline: "Website for Liliums, a floral studio in Hyderabad.",
    points: [
      ["Brief", "Put the bouquets online without the weight of a shop: browse, pick, message."],
      ["Built", "A catalogue of eight collections and seventy-one bouquets, each in Standard, Deluxe or Premium."],
      ["Orders", "No checkout. Order opens WhatsApp with the bouquet already named in the message."],
    ],
    tags: ["Catalogue", "WhatsApp ordering"],
    links: [{ label: "liliums.in", href: "https://www.liliums.in" }],
    visual: "liliums",
  },
  {
    title: "This portfolio",
    status: "You are here",
    logline: "A type-led site with my own desk footage running through it.",
    points: [
      ["Built", "Next.js with Tailwind CSS, Motion and Lenis. Static pages, a blog with highlighted code."],
      ["Detail", "The footage is me at my desk, cut to a 340 KB loop. The headline plays it inline as a word, then opens it to full screen as you scroll."],
    ],
    tags: ["Next.js", "Tailwind CSS", "Motion", "Lenis"],
    links: [{ label: "mohammedobaid.in", href: "https://www.mohammedobaid.in" }],
    visual: "portfolio",
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
