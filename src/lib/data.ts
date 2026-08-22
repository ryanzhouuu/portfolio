export const personalInfo = {
  name: "Ryan Zhou",
  title: "CS & Economics @ UT Austin",
  // One concise positioning line for the hero — no marketing filler.
  positioning:
    "computer science student and software engineer working with full-stack engineering, AI/ML, systems, and anything in between.",
  bio: "I'm currently studying Computer Science and Economics in my third year at the University of Texas at Austin. I love learning and building all kinds of software. Outside of work, I'm usually in the gym, with my girlfriend, playing Clash Royale, or watching anime.",
  email: "ryanzhouuu@gmail.com",
  github: "https://github.com/ryanzhouuu",
  linkedin: "https://linkedin.com/in/ryanzhouuu",
  photo: "/images/ryan-headshot.jpeg",
};

export const navItems = [
  { id: "work", label: "Work", path: "#work" },
  { id: "experience", label: "Experience", path: "#experience" },
  { id: "about", label: "About", path: "#about" },
  { id: "education", label: "Education", path: "#education" },
  { id: "contact", label: "Contact", path: "#contact" },
];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "C", "Java", "SQL"],
  },
  {
    category: "Frameworks",
    items: ["React.js", "Next.js", "Node.js", "Express.js"],
  },
  {
    category: "Tools & Platforms",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "AWS",
      "Makefile",
      "Linux",
      "Supabase",
      "Vercel",
      "Cursor",
      "Claude Code",
      "Codex",
      "VSCode",
    ],
  },
];

export const education = [
  {
    school: "University of Texas at Austin",
    degree: "B.S. Computer Science & B.S. Economics",
    period: "2024 – 2028",
    gpa: "4.00 / 4.00",
    courses: [
      { code: "CS439", name: "Operating Systems" },
      { code: "CS373", name: "Software Engineering" },
      { code: "CS429", name: "Computer Architecture" },
      { code: "CS343", name: "Artificial Intelligence" },
      { code: "CS331", name: "Algorithms" },
      { code: "CS314", name: "Data Structures" },
      { code: "CS311", name: "Discrete Mathematics" },
    ],
    banner: "/images/banner.jpg",
  },
  {
    school: "Cinco Ranch High School",
    degree: "High School Diploma",
    period: "2020 – 2024",
    gpa: "4.72 W / 4.0 UW",
    details: ["National Merit Scholar", "AP Scholar with Distinction"],
    courses: [] as { code: string; name: string }[],
  },
];

export const experience = [
  {
    company: "The University of Texas at Austin",
    logo: "/images/logos/texas-longhorns-neon.jpg",
    role: "Undergraduate Teaching Assistant",
    period: "Aug 2026 - Present",
    location: "Austin, TX",
    bullets: ["UGCA for CS311: Discrete Mathematics for Computer Science."],
  },
  {
    company: "Amazon",
    logo: "/images/logos/amazon-logo.png",
    role: "Software Development Engineer Intern",
    period: "May - July 2026",
    location: "Austin, TX",
    bullets: [
      "Designed a self-service admin tool to replace manual console-based admin workflows, reducing average operation time by 60%",
      "Implemented schema validation and AI verification preventing 90% of bad API and Lambda requests from reaching server",
      "Captured 100% of admin actions with comprehensive audit logging, tracking all operation metadata for accountability & rollback",
    ],
  },
  {
    company: "Texas Athletics",
    logo: "/images/logos/texas-longhorns-neon.jpg",
    role: "Student Technician",
    period: "February – May 2026",
    location: "Austin, TX",
    bullets: [
      "Troubleshot and resolved ~25 IT tickets weekly across hardware and software issues for staff and student athletes.",
      "Sanitized 200+ legacy hardware items for recycling or salvage, ensuring data destruction and adherence to strict security protocols",
      "Executed setups/takedowns for university athletics events, minimizing downtime for ticketing offices, stat keepers, and equipment",
    ],
  },
  {
    company: "University of Houston",
    logo: "/images/logos/university-of-houston-logo.png",
    role: "Research Intern",
    period: "May 2025 – July 2025",
    location: "Remote",
    bullets: [
      "Engineered a routing system for CNN classifiers using a decision tree trained on model performance metrics.",
      "Reduced neural network cascade execution time by 18% by scheduling dynamically on latency, confidence, and deadline.",
      "Fine-tuned 5 pre-trained ResNet models of varying complexity on 60,000+ images to optimize computer-vision accuracy.",
    ],
  },
  {
    company: "JRZ Vintage",
    logo: "/images/logos/jrz-logo.png",
    role: "Founder",
    period: "June 2022 - August 2024",
    location: "Houston, TX",
    bullets: [
      "Scaled e-commerce business to 1250+ sales and $60K+ revenue by leveraging data-driven listing strategies and platform analytics",
      "Maintained verified Depop Top Seller status with 4.98/5-stars across 250+ customer reviews and average shipping time <5 days",
      "Orchestrated inventory management for online marketplace & 8+ local in-person pop-up events, systemizing 2500+ unique items",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  details: string;
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "suki",
    title: "Suki",
    summary:
      "Anime tracker built around pairwise rankings and taste-driven recommendations.",
    details:
      "Built a Next.js and Supabase app that pulls live anime metadata from AniList, turns head-to-head choices into ranked series with a Bradley–Terry model, and recommends what to watch next from an embedding-based taste profile. It also supports watch tracking, imports, sharing, and comparing taste with friends.",
    githubUrl: "https://github.com/ryanzhouuu/suki",
    liveUrl: "https://suki-plum.vercel.app",
  },
  {
    slug: "sleeper-manager",
    title: "Sleeper Manager",
    summary:
      "Read-only fantasy basketball assistant for Sleeper Lock-In leagues.",
    details:
      "Built a Python decision assistant that combines Sleeper and NBA data to suggest lineup and Lock-In decisions without changing a roster. It includes projection, simulation, backtesting, replay validation, and notification workflows for turning game data into a repeatable weekly plan.",
    githubUrl: "https://github.com/ryanzhouuu/sleeper-manager",
  },
  {
    slug: "dynamic-routing-engine",
    title: "Adaptive Vision Router",
    summary: "Latency-aware routing across an ensemble of image classifiers.",
    details:
      "Built a Python routing engine that chooses the next image classifier using confidence, latency, and deadline signals. The repository includes static and trained routing policies, profiling and evaluation workflows, and a CLI for training and comparing cascade behavior.",
    githubUrl: "https://github.com/ryanzhouuu/dynamic-routing-engine",
  },
  {
    slug: "tri-omicron",
    title: "Tri-Omicron Website",
    summary:
      "Public website for Tri-Omicron, UT Austin’s computer science fraternity.",
    details:
      "Built a Next.js and Tailwind site that gives the fraternity a public home for its community, events, FAQs, and contact flows. The site is structured to support recruitment, organization updates, and a distinct visual identity for the group.",
    githubUrl: "https://github.com/Tri-Omicron/website",
    liveUrl: "https://triomicron.org",
  },
];
