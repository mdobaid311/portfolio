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
  logline: string;
  tags: string[];
  year: string;
  href: string;
};

export const projects: Project[] = [
  {
    title: "MiniURL",
    logline: "Distributed URL shortener. ZooKeeper-coordinated Base62 codes, Redis cache, MongoDB replica set, on a self-hosted Kubernetes cluster.",
    tags: ["Node.js", "Redis", "ZooKeeper", "Kubernetes"],
    year: "2026",
    href: "https://github.com/mdobaid311/MiniURL",
  },
  {
    title: "Guide Recorder",
    logline: "Local-first browser workflow recorder. A Chrome extension captures each step; AI writes the guide.",
    tags: ["Next.js", "Chrome MV3", "Prisma", "GenAI"],
    year: "2026",
    href: "https://github.com/mdobaid311/documentation-creation-tool",
  },
  {
    title: "Resource Scheduler",
    logline: "React scheduler with a resource timeline: drag, resize, no double booking. MIT, on npm.",
    tags: ["TypeScript", "React", "npm"],
    year: "2025",
    href: "https://resource-scheduler-docs.vercel.app/",
  },
  {
    title: "Pins",
    logline: "AI image social app. Generate images from prompts and share them on a feed.",
    tags: ["React", "OpenAI", "Sanity.io"],
    year: "2023",
    href: "https://pinsfrontend.vercel.app",
  },
  {
    title: "Kafka Microservices",
    logline: "Event-driven reference build: producers, consumers and sagas talking through Kafka.",
    tags: ["Node.js", "Kafka", "Docker"],
    year: "2025",
    href: "https://github.com/mdobaid311/nodejs-kafka-microservices",
  },
  {
    title: "The Vim Game",
    logline: "A browser game that teaches Vim motions through play.",
    tags: ["JavaScript", "Canvas"],
    year: "2024",
    href: "https://github.com/mdobaid311/the-vim-game",
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
