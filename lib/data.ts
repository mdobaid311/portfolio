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
    "Full-stack engineer building transport & ground-support tech at Smartquip. React on the surface, .NET and Node underneath — from pixel to pipeline.",
  about: [
    "I build software end to end — interfaces people actually enjoy using, backed by services that don't fall over.",
    "By day I ship transport & ground-support equipment tech at Smartquip with React and .NET. After hours I run a self-hosted Kubernetes cluster, wire up event-driven microservices, and chase whatever idea won't leave me alone.",
    "Clean, swappable architecture is the obsession. AI-integrated products and distributed systems are the current frontier.",
  ],
  socials: [
    { label: "GitHub", handle: "mdobaid311", href: "https://github.com/mdobaid311" },
    { label: "X / Twitter", handle: "@mdobaid311", href: "https://twitter.com/mdobaid311" },
    { label: "Instagram", handle: "@obaid.code", href: "https://www.instagram.com/obaid.code" },
    { label: "Email", handle: "mdobaid311@gmail.com", href: "mailto:mdobaid311@gmail.com" },
  ],
  stats: [
    { value: 5, suffix: "+", label: "Years shipping code" },
    { value: 100, suffix: "+", label: "Public repositories" },
    { value: 30, suffix: "+", label: "Technologies in orbit" },
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
      "Distributed URL shortener engineered for throughput — running in production on a self-hosted Kubernetes cluster.",
    tags: ["Node.js", "Redis", "Kubernetes", "Docker"],
    year: "2026",
    status: "SELF-HOSTED",
  },
  {
    index: "02",
    title: "Guide Recorder",
    description:
      "Local-first guide & documentation recorder. Capture a flow in the browser, get shareable step-by-step docs — no cloud required.",
    tags: ["Next.js", "Chrome MV3", "TypeScript"],
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
    title: "Kafka Microservices",
    description:
      "Event-driven microservices reference build — producers, consumers and sagas talking through Kafka.",
    tags: ["Node.js", "Kafka", "TypeScript", "Docker"],
    year: "2025",
    repo: "https://github.com/mdobaid311/nodejs-kafka-microservices",
    status: "ARCHIVED",
  },
  {
    index: "05",
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
    period: "NOW",
    title: "Software Engineer",
    org: "Smartquip",
    summary:
      "Building transport & ground-support equipment tech. React front ends backed by .NET services — real hardware, real logistics, real users.",
    stack: ["React", ".NET", "C#", "TypeScript", "SQL"],
    current: true,
  },
  {
    index: "02",
    period: "2022 — 2024",
    title: "Full-Stack Everything",
    org: "Independent / Open Source",
    summary:
      "Shipped across the map — MERN apps, GraphQL APIs, FastAPI services, Django tools, real-time dashboards. 100+ public repos of learning in the open.",
    stack: ["Next.js", "Node.js", "GraphQL", "Python", "MongoDB", "PostgreSQL"],
  },
  {
    index: "01",
    period: "2021",
    title: "First Commit",
    org: "github.com/mdobaid311",
    summary:
      "Joined GitHub, pushed the first repo, and never really stopped. What started as clones and experiments became a compulsion to build.",
    stack: ["JavaScript", "HTML", "CSS", "React"],
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
      "React",
      "Next.js",
      "Angular",
      "Redux",
      "Tailwind CSS",
      "Sass",
      "Vite",
      "GSAP",
    ],
  },
  {
    index: "B",
    label: "Systems",
    items: [
      "Node.js",
      "Express",
      ".NET Core",
      "C#",
      "FastAPI",
      "Python",
      "GraphQL",
      "Java",
      "REST APIs",
      "Microservices",
    ],
  },
  {
    index: "C",
    label: "Data & Events",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "MySQL",
      "Apache Kafka",
      "Firebase",
      "Appwrite",
    ],
  },
  {
    index: "D",
    label: "Ops & Infra",
    items: [
      "Docker",
      "Kubernetes",
      "Self-hosted k8s",
      "CI/CD",
      "Git",
      "Bash",
      "Vercel",
      "Linux",
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
  "GraphQL",
  "Python",
  "FastAPI",
  "MongoDB",
  "Tailwind",
];
