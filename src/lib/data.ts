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
    company: "Amazon",
    logo: "/images/logos/amazon-logo.png",
    role: "Software Development Engineer Intern",
    period: "May 2026 - Present",
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
    period: "Feb – May 2026",
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
    role: "Undergraduate Researcher",
    period: "May 2025 – Aug 2025",
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
    period: "Jun 2022 - Aug 2024",
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
      "Anime tracker with a pairwise ranking engine and personalized recommendations.",
    details:
      "Built a Next.js and Supabase app that pulls AniList data, ranks watchlists through Bradley-Terry pairwise comparisons, and generates recommendations from taste embeddings. The result is a tracker where recommendations reflect individual preferences rather than popularity.",
    githubUrl: "https://github.com/ryanzhouuu/suki",
    liveUrl: "https://suki-plum.vercel.app",
  },
  {
    slug: "vintdex",
    title: "Vintdex",
    summary:
      "Price tracking and trend estimates for the vintage resale market.",
    details:
      "Built a Next.js and Supabase app that aggregates listing and sale data, normalizes it per item, and surfaces price history and trend estimates in a clean dashboard. It turns scattered resale listings into a legible market signal for buyers and sellers.",
    githubUrl: "https://github.com/vintdex",
  },
  {
    slug: "tri-omicron",
    title: "Tri-Omicron Website",
    summary: "Landing page for UT Austin’s top CS fraternity.",
    details:
      "Built a statically rendered Next.js and Tailwind site with a distinct visual identity designed to load fast and stay easy to update semester over semester. The result is a polished public presence for recruitment, sponsors, and members.",
    githubUrl: "https://github.com/Tri-Omicron/website",
    liveUrl: "https://triomicron.org",
  },
  {
    slug: "arm64-emulator",
    title: "ARM64 System Emulator",
    summary:
      "Cycle-accurate ARM64 processor emulator with a 5-stage pipeline and configurable L1 cache.",
    details:
      "Built a cycle-accurate emulator in C covering the ALU, register file, memory, pipeline hazards, branch prediction, register forwarding, and an L1 data cache with LRU replacement. The final system reduced execution time by 65% over a single-stage baseline and reached 90%+ cache hit rates with tuned configurations.",
  },
];
