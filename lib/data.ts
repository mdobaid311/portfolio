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
    "Full-stack engineer at Smartquip building asset-monitoring and ground-support tech for rail, aviation and maritime. React on the surface, .NET and Node underneath.",
  about: [
    "I build and ship production web apps end to end: React and Next.js on the front, .NET and Node.js behind them, event-driven microservices, and Kubernetes clusters I host myself.",
    "At Smartquip I'm the only React developer on an asset-uptime platform that tracks equipment across rail, aviation and maritime. I also architected the Ground Support Equipment system that is set to run operations at the new Western Sydney International Airport, working on my own from requirements to release.",
    "I care most about clean, swappable architecture. Right now I'm digging into real-time data pipelines and AI-integrated products.",
  ],
  socials: [
    { label: "Blog", handle: "Read my posts", href: "/blog" },
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

export type ProjectVisual =
  | { type: "image"; src: string; alt: string; width: number; height: number }
  | { type: "miniurl" };

export type Project = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  repo?: string;
  live?: string;
  /** Extra links shown on the row, beside the main one. */
  links?: { label: string; href: string }[];
  /** Screenshot or diagram shown under the row. */
  visual?: ProjectVisual;
  /** Short problem / build / run breakdown, shown in a "Case study" disclosure. */
  caseStudy?: { label: string; text: string }[];
  status: "DEPLOYED" | "SELF-HOSTED" | "IN DEVELOPMENT" | "ARCHIVED";
};

export const projects: Project[] = [
  {
    index: "01",
    title: "MiniURL",
    description:
      "Distributed URL shortener built from three microservices. ZooKeeper hands out collision-free Base62 codes, Redis caches hot URLs and MongoDB runs as a replica set, with JWT auth, analytics and rate limiting on top. Runs on a self-hosted multi-node Kubernetes cluster with autoscaling and zero-downtime rolling updates.",
    tags: ["Node.js", "MongoDB", "Redis", "ZooKeeper", "Kubernetes"],
    year: "2026",
    repo: "https://github.com/mdobaid311/MiniURL",
    visual: { type: "miniurl" },
    caseStudy: [
      {
        label: "Problem",
        text: "A short-link service has to resolve links fast and never hand out the same code twice, even with several instances writing at once.",
      },
      {
        label: "What I built",
        text: "Three microservices behind one API. ZooKeeper coordinates the instances so every Base62 code is unique, Redis caches hot URLs in front of MongoDB, and MongoDB runs as a replica set. JWT auth, click analytics and rate limiting sit on top.",
      },
      {
        label: "How it runs",
        text: "On a multi-node Kubernetes cluster I host myself, with autoscaling and zero-downtime rolling updates.",
      },
    ],
    status: "SELF-HOSTED",
  },
  {
    index: "02",
    title: "Guide Recorder",
    description:
      "Local-first tool that records a browser workflow and turns it into an editable, shareable step-by-step guide. A Chrome MV3 extension streams clicks, input and screenshots to a Next.js backend, which adds AI-written step descriptions and screenshot redaction, and exports Markdown, HTML or PDF.",
    tags: ["Next.js 16", "Chrome MV3", "Prisma", "Google GenAI"],
    year: "2026",
    repo: "https://github.com/mdobaid311/documentation-creation-tool",
    caseStudy: [
      {
        label: "Problem",
        text: "Documenting a workflow by hand means screenshotting and describing every click, and the guide is stale the next time the UI changes.",
      },
      {
        label: "What I built",
        text: "A Chrome MV3 extension records clicks, input and screenshots and streams them to a Next.js backend. The backend writes each step's description with Google GenAI, redacts sensitive parts of the screenshots, and lets you edit the guide before exporting Markdown, HTML or PDF.",
      },
      {
        label: "How it runs",
        text: "Local-first: the recording and the guide stay on your machine.",
      },
    ],
    status: "IN DEVELOPMENT",
  },
  {
    index: "03",
    title: "Resource Scheduler",
    description:
      "A free, MIT-licensed React scheduler with a resource timeline: drag, resize, no double booking, keyboard accessible. Published on npm, with docs and live demos. The screenshot is a room booking app built on it.",
    tags: ["TypeScript", "React"],
    year: "2025",
    repo: "https://github.com/mdobaid311/resource-scheduler",
    live: "https://resource-scheduler-docs.vercel.app/",
    caseStudy: [
      {
        label: "Problem",
        text: "Booking screens need rooms, people or machines as rows on a timeline, with overlap rules the UI enforces while you drag.",
      },
      {
        label: "What I built",
        text: "A React component with drag, resize and move, no-double-booking checks, keyboard support and a headless rules module, MIT licensed and published on npm with docs and live demos.",
      },
      {
        label: "In use",
        text: "It powers the room booking app in the screenshot, which I wrote up in the blog post on building it with an AI agent and the Prisma stack.",
      },
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/resource-scheduler" },
      { label: "GitHub", href: "https://github.com/mdobaid311/resource-scheduler" },
    ],
    visual: {
      type: "image",
      src: "/work/resource-scheduler.png",
      alt: "A room booking app built with Resource Scheduler: rooms as rows on a day timeline, with bookings dragged into free slots.",
      width: 1440,
      height: 1160,
    },
    status: "DEPLOYED",
  },
  {
    index: "04",
    title: "Pins: AI Image Social App",
    description:
      "Full-stack social app that generates images from natural-language prompts and shares them on a feed. Google Auth, a Sanity.io content backend and real-time rendering.",
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
      "Event-driven microservices reference build: producers, consumers and sagas talking through Kafka.",
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
    period: "JUL 2024 – NOW",
    title: "Software Developer",
    org: "Smartquip · Remote",
    summary:
      "Sole React developer on an asset-uptime monitoring platform for rail, aviation and maritime. Architected a Ground Support Equipment management system from scratch, set to run operations at the new Western Sydney International Airport. Migrated a legacy freight-tracking app to the latest .NET.",
    stack: ["React", ".NET", "C#", "TypeScript", "Serverless"],
    current: true,
  },
  {
    index: "02",
    period: "JAN 2023 – JUL 2024",
    title: "Junior Software Engineer",
    org: "XIT Solutions Inc",
    summary:
      "Built a real-time stream-processing platform on Apache Kafka. Full-stack developer on a sales-analytics application for Guitar Center; frontend on a cloud taxation product with React and Microsoft Power Platform.",
    stack: ["React", "Apache Kafka", "Node.js", "Power Platform", "REST"],
  },
  {
    index: "01",
    period: "2019 – 2023",
    title: "Student years",
    org: "B.E. Computer Science, MJCET, Hyderabad",
    summary:
      "Diploma to bachelor's in computer science while shipping 100+ public repos in the open: experiments, clones, and a final-year AI image-generation social platform that's still live.",
    stack: ["JavaScript", "Python", "React", "Fundamentals"],
  },
];

export type SkillGroup = {
  index: string;
  label: string;
  items: string[];
};

/** The daily drivers, shown first. They are left out of the groups below to avoid repeating. */
export const coreSkills = ["React", "Next.js", "TypeScript", "Node.js", ".NET / C#", "PostgreSQL"];

export const skillGroups: SkillGroup[] = [
  {
    index: "A",
    label: "Interface",
    items: [
      "JavaScript",
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
      ".NET Serverless",
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
