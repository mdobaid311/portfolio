export const profile = {
  name: "Mohammed Obaid",
  firstName: "Mohammed",
  lastName: "Obaid",
  role: "Full-Stack Software Engineer",
  company: "Smartquip",
  location: "Hyderabad, India",
  coordinates: "17.3850° N / 78.4867° E",
  timezone: "Asia/Kolkata",
  email: "mdobaid311@gmail.com",
  hireable: true,
  tagline:
    "Full-stack engineer at Smartquip building asset-monitoring and ground-support tech for rail, aviation and maritime. React on the surface, .NET and Node underneath — from pixel to pipeline.",
  about: [
    "I build and ship production web applications end to end — from React and Next.js front ends to .NET and Node.js back ends, event-driven microservices, and self-hosted Kubernetes deployments.",
    "At Smartquip I'm the sole React developer on an asset-uptime platform tracking equipment across rail, aviation and maritime — and I architected the Ground Support Equipment system set to run operations at the new Western Sydney International Airport. Comfortable owning an application single-handedly, from requirements to release.",
    "Clean, swappable architecture is the obsession. Real-time data pipelines and AI-integrated products are the current frontier.",
  ],
  socials: [
    { label: "GitHub", handle: "mdobaid311", href: "https://github.com/mdobaid311" },
    { label: "X / Twitter", handle: "@mdobaid311", href: "https://twitter.com/mdobaid311" },
    { label: "Instagram", handle: "@obaid.code", href: "https://www.instagram.com/obaid.code" },
    { label: "Email", handle: "mdobaid311@gmail.com", href: "mailto:mdobaid311@gmail.com" },
  ],
  stats: [
    { value: 5, suffix: "+", label: "Years shipping code" },
    { value: 4, suffix: "", label: "Production platforms delivered" },
    { value: 100, suffix: "+", label: "Public repositories" },
    { value: 1, suffix: "", label: "Self-hosted k8s cluster" },
  ],
};

export type Project = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  repo?: string;
  live?: string;
  status: "DEPLOYED" | "SELF-HOSTED" | "IN DEVELOPMENT" | "ARCHIVED";
};

export const projects: Project[] = [
  {
    index: "01",
    title: "MiniURL",
    description:
      "Production-grade distributed URL shortener — three microservices generating collision-free Base62 codes via ZooKeeper, Redis-cached hot URLs, MongoDB replica set, JWT auth, analytics and rate limiting. Runs on a self-hosted multi-node k8s cluster with autoscaling and zero-downtime rolling updates.",
    tags: ["Node.js", "MongoDB", "Redis", "ZooKeeper", "Kubernetes"],
    year: "2026",
    status: "SELF-HOSTED",
  },
  {
    index: "02",
    title: "Guide Recorder",
    description:
      "Local-first platform that records any browser workflow and turns it into editable, shareable step-by-step guides. A Chrome MV3 extension streams clicks, input and screenshots to a Next.js backend — with AI-generated step descriptions, screenshot redaction and Markdown / HTML / PDF export.",
    tags: ["Next.js 16", "Chrome MV3", "Prisma", "Google GenAI"],
    year: "2026",
    repo: "https://github.com/mdobaid311/documentation-creation-tool",
    status: "IN DEVELOPMENT",
  },
  {
    index: "03",
    title: "Resource Scheduler",
    description:
      "A scheduling board for planning people and resources across time — drag, drop, done.",
    tags: ["TypeScript", "React"],
    year: "2025",
    repo: "https://github.com/mdobaid311/resource-scheduler",
    live: "https://resource-scheduler-demo.vercel.app/",
    status: "DEPLOYED",
  },
  {
    index: "04",
    title: "Pins — AI Image Social App",
    description:
      "Full-stack social platform that generates images from natural-language prompts and shares them on a feed — Google Auth, Sanity.io content backend, real-time rendering.",
    tags: ["React", "OpenAI", "Sanity.io", "Node.js"],
    year: "2023",
    repo: "https://github.com/mdobaid311/pins",
    live: "https://pinsfrontend.vercel.app",
    status: "DEPLOYED",
  },
  {
    index: "05",
    title: "Kafka Microservices",
    description:
      "Event-driven microservices reference build — producers, consumers and sagas talking through Kafka.",
    tags: ["Node.js", "Kafka", "TypeScript", "Docker"],
    year: "2025",
    repo: "https://github.com/mdobaid311/nodejs-kafka-microservices",
    status: "ARCHIVED",
  },
  {
    index: "06",
    title: "The Vim Game",
    description:
      "A browser game that teaches Vim motions through play. hjkl your way to victory.",
    tags: ["JavaScript", "Canvas"],
    year: "2024",
    repo: "https://github.com/mdobaid311/the-vim-game",
    status: "DEPLOYED",
  },
];

export type Chapter = {
  index: string;
  period: string;
  title: string;
  org: string;
  summary: string;
  stack: string[];
  current?: boolean;
};

export const trajectory: Chapter[] = [
  {
    index: "03",
    period: "JUL 2024 — NOW",
    title: "Software Developer",
    org: "Smartquip · Remote",
    summary:
      "Sole React developer on an asset-uptime monitoring platform for rail, aviation and maritime. Architected a Ground Support Equipment management system from scratch — set to run operations at the new Western Sydney International Airport. Migrated a legacy freight-tracking app to the latest .NET.",
    stack: ["React", ".NET", "C#", "TypeScript", "Serverless"],
    current: true,
  },
  {
    index: "02",
    period: "JAN 2023 — JUL 2024",
    title: "Junior Software Engineer",
    org: "XIT Solutions Inc",
    summary:
      "Built a real-time stream-processing platform on Apache Kafka. Full-stack developer on a sales-analytics application for Guitar Center; frontend on a cloud taxation product with React and Microsoft Power Platform.",
    stack: ["React", "Apache Kafka", "Node.js", "Power Platform", "REST"],
  },
  {
    index: "01",
    period: "2019 — 2023",
    title: "The Formative Years",
    org: "B.E. Computer Science — MJCET, Hyderabad",
    summary:
      "Diploma to bachelor's in computer science while shipping 100+ public repos in the open — experiments, clones, and a final-year AI image-generation social platform that's still live.",
    stack: ["JavaScript", "Python", "React", "Fundamentals"],
  },
];

export type SkillGroup = {
  index: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    index: "A",
    label: "Interface",
    items: [
      "TypeScript",
      "JavaScript",
      "React 16–19",
      "Next.js",
      "Angular",
      "Tailwind CSS",
      "Zustand",
      "Redux",
      "Vite",
      "GSAP",
    ],
  },
  {
    index: "B",
    label: "Systems",
    items: [
      "Node.js",
      ".NET Serverless",
      "C#",
      "Express",
      "FastAPI",
      "Python",
      "Prisma",
      "GraphQL",
      "REST Design",
      "Microservices",
    ],
  },
  {
    index: "C",
    label: "Data & Events",
    items: [
      "PostgreSQL",
      "MongoDB",
      "SQL Server",
      "Redis",
      "SQLite",
      "Apache Kafka",
      "ZooKeeper",
      "Sanity.io",
    ],
  },
  {
    index: "D",
    label: "Ops & Infra",
    items: [
      "Docker",
      "Kubernetes",
      "Self-hosted k8s",
      "Nginx",
      "Linux Admin",
      "CI/CD",
      "Power Platform",
      "Vercel",
    ],
  },
];

export const marqueeItems = [
  "TypeScript",
  "React",
  "Next.js",
  ".NET",
  "C#",
  "Node.js",
  "Kafka",
  "Kubernetes",
  "Docker",
  "PostgreSQL",
  "Redis",
  "ZooKeeper",
  "MongoDB",
  "Python",
  "FastAPI",
  "Tailwind",
];
