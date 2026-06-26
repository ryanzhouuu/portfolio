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
    details: [
      "Data Structures",
      "Software Engineering",
      "Operating Systems",
      "Computer Architecture",
      "Artificial Intelligence",
      "Algorithms",
    ],
    banner: "/images/banner.jpg",
  },
  {
    school: "Cinco Ranch High School",
    degree: "High School Diploma",
    period: "2020 – 2024",
    gpa: "4.72 W / 4.0 UW",
    details: ["National Merit Scholar", "AP Scholar with Distinction"],
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
  description: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  year: string;
  role: string;
  category: string;
  problem: string;
  build: string;
  result: string;
  highlights: string[];
  private?: boolean;
};

// NOTE: `year`, `role`, and the problem/build/result narrative are written to
// fit each project's evident purpose. Review and adjust to match reality.
export const projects: Project[] = [
  {
    slug: "suki",
    title: "Suki",
    description: "Web application for ranking and recommending anime.",
    shortDescription:
      "Anime tracker with a pairwise ranking engine and personalized recommendations.",
    image: "/images/suki-ui.png",
    technologies: ["Next.js", "Supabase", "Tailwind CSS"],
    githubUrl: "https://github.com/ryanzhouuu/suki",
    liveUrl: "https://suki-plum.vercel.app",
    year: "2026",
    role: "Full-stack",
    category: "Web App",
    problem:
      "Anime fans juggle multiple sites to track shows, follow friends, and find recommendations — no single tool does all three well.",
    build:
      "A Next.js app backed by Supabase that pulls live data from the AniList API, lets users build and rank their watchlists through pairwise comparisons, and surfaces recommendations from vector embeddings of their taste profile.",
    result:
      "A unified tracker where ranking feels like a game and recommendations actually reflect what you like rather than what's popular.",
    highlights: [
      "Bradley-Terry ranking engine using pairwise comparisons",
      "Vector embedding-driven personalized recommendations",
      "AniList API integration for live anime data and watch history",
    ],
  },
  {
    slug: "vintdex",
    title: "Vintdex",
    description:
      "Full-stack web application for tracking and predicting market prices for vintage clothing.",
    shortDescription:
      "Price tracking and trend estimates for the vintage resale market.",
    image: "/images/vintdex-ui.png",
    technologies: ["Next.js", "Supabase", "Tailwind CSS"],
    githubUrl: "https://github.com/vintdex",
    liveUrl: "",
    year: "2025",
    role: "Full-stack",
    category: "Web App",
    problem:
      "Vintage resale pricing is opaque — comparable sales scatter across platforms and vanish when items sell, leaving buyers and sellers guessing.",
    build:
      "A Next.js app backed by Supabase that aggregates listing and sale data, normalizes it per item, and surfaces price history and trend estimates in a clean dashboard.",
    result:
      "A single source for what specific pieces actually trade for over time, turning scattered listings into a legible market signal.",
    highlights: [
      "Automated data pipeline aggregating listings across platforms",
      "Per-item price history and trend estimates",
      "Supabase-backed data layer with auth",
    ],
  },
  {
    slug: "via",
    title: "VIA",
    description: "Mobile app for navigation around college campuses.",
    shortDescription: "Campus navigation for students by students.",
    image: "/images/via-ui.png",
    technologies: ["Flutter", "Express.js", "Supabase"],
    githubUrl: "https://github.com/via-team/backend",
    liveUrl: "",
    year: "2025",
    role: "Backend & Mobile",
    category: "Mobile App",
    problem:
      "Consumer maps stop at the building entrance. On a large campus, finding the right hall and room is the hard part — and no existing tool solves it.",
    build:
      "A Flutter client over an Express + Supabase backend that models campus buildings as routable graphs and serves step-by-step directions through a documented REST API.",
    result:
      "Navigation that picks up where Google Maps leaves off, with an open API surface other campus tools can build on.",
    highlights: [
      "Graph-based indoor routing engine",
      "Documented REST API for campus navigation",
      "Cross-platform Flutter client",
    ],
  },
  {
    slug: "nba-archetype-clustering",
    title: "NBA Archetype Clustering",
    description:
      "Clustering of NBA players into archetypes from their statistics using K-Means.",
    shortDescription:
      "Data-driven player archetypes that go beyond traditional position labels.",
    image: "/images/nba-arc-ui.png",
    technologies: ["Python", "Pandas", "Scikit-learn"],
    githubUrl: "https://github.com/ryanzhouuu/nba-archetype-clustering",
    liveUrl: "https://nba-archetype-clustering.vercel.app/",
    year: "2024",
    role: "Data & ML",
    category: "Machine Learning",
    problem:
      'Traditional position labels flatten how players actually play — two "forwards" can be statistically nothing alike.',
    build:
      "A Python pipeline that cleans season stats, engineers per-possession features, and runs K-Means to surface natural groupings by playing style rather than nominal position.",
    result:
      "Archetypes that describe role and style more honestly than guard/forward/center, presented through an interactive published write-up.",
    highlights: [
      "Per-possession feature engineering over season statistics",
      "K-Means clustering with elbow-method tuning and archetype labeling",
      "Interactive visualization of cluster results",
    ],
  },
  {
    slug: "tri-omicron",
    title: "Tri-Omicron Website",
    description:
      "Landing page for Tri-Omicron, the premier CS organization at UT Austin.",
    shortDescription: "Landing page for UT Austin’s top CS fraternity.",
    image: "/images/tri-o-ui.png",
    technologies: ["Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/Tri-Omicron/website",
    liveUrl: "https://triomicron.org",
    year: "2025",
    role: "Frontend",
    category: "Website",
    problem:
      "All student orgs need an informational site — somewhere recruits, sponsors, and members could find events, learn about the org, and apply.",
    build:
      "A statically rendered Next.js + Tailwind site with a distinct visual identity designed to load fast and stay easy to update semester over semester.",
    result:
      "A polished public presence that holds up under recruitment season traffic and gives the org a proper introduction.",
    highlights: [
      "Statically rendered Next.js site with near-instant load times",
      "Distinct visual identity reflecting the org’s brand",
      "Content structure designed for easy semester-by-semester updates",
    ],
  },
  {
    slug: "arm64-emulator",
    title: "ARM64 System Emulator",
    description:
      "Cycle-accurate ARM64 processor emulator with a 5-stage pipeline and configurable L1 data cache.",
    shortDescription:
      "Cycle-accurate ARM64 processor emulator with a 5-stage pipeline and configurable L1 cache.",
    image: "/images/arm64-emulator.png",
    technologies: ["C", "ARM64", "Makefile", "GDB", "Valgrind", "Linux"],
    githubUrl: "",
    liveUrl: "",
    year: "2025",
    role: "Systems",
    category: "Systems",
    private: true,
    problem:
      "Simulating a real processor at cycle-level accuracy requires faithfully modeling every pipeline stage, hazard condition, and cache policy — not just the instruction set.",
    build:
      "A cycle-accurate emulator in C covering ALU, register file, and memory, extended with a 5-stage instruction pipeline implementing hazard detection, branch prediction, and register forwarding, plus an L1 data cache with LRU replacement and configurable associativity and block size.",
    result:
      "65% reduction in execution time over a single-stage baseline; L1 cache hitting 90%+ with tuned associativity and block size configurations.",
    highlights: [
      "5-stage pipeline with hazard detection, branch prediction, and register forwarding",
      "L1 data cache with LRU replacement and configurable associativity and block size",
      "65% execution time reduction; 90%+ cache hit rates",
    ],
  },
  {
    slug: "distributed-nn",
    title: "Distributed Neural Network",
    description:
      "Multi-layer perceptron built from scratch in C++17, accelerated with SIMD and distributed across workers over TCP.",
    shortDescription:
      "MLP from scratch in C++17 with SIMD acceleration and distributed training over TCP.",
    image: "/images/distributed-nn.png",
    technologies: ["C++17", "CMake", "SIMD", "TCP"],
    githubUrl: "",
    liveUrl: "",
    year: "2026",
    role: "Systems & ML",
    category: "Systems",
    private: true,
    problem:
      "Training a neural network on a single core is slow and opaque. Distributing gradient computation across workers requires solving synchronization, IPC overhead, and numerical precision at once.",
    build:
      "A multi-layer perceptron implemented from scratch in C++17 — custom linear algebra, activation functions, and SGD — accelerated with 256-bit SIMD intrinsics and parallelized across a parameter server–worker architecture with inter-process communication over TCP sockets.",
    result:
      "4x reduction in computation time from SIMD vectorization; distributed design scales training across multiple workers with well-defined IPC boundaries.",
    highlights: [
      "Custom linear algebra, activations, and SGD — no ML libraries",
      "4x speedup via 256-bit SIMD vector intrinsics",
      "Parameter server–worker architecture with TCP-based IPC",
    ],
  },
  {
    slug: "pintos",
    title: "PintOS Operating System",
    description:
      "x86 OS kernel with thread scheduling, demand-paging virtual memory, system calls, and an indexed inode file system.",
    shortDescription:
      "x86 OS kernel with thread scheduling, demand-paging VM, and an indexed inode file system.",
    image: "/images/pintos.png",
    technologies: ["C", "Makefile", "GDB", "Linux", "x86"],
    githubUrl: "",
    liveUrl: "",
    year: "2025",
    role: "Systems",
    category: "Systems",
    private: true,
    problem:
      "An OS kernel ties together scheduling, memory, I/O, and the file system in ways that only become clear when you implement each subsystem and watch them break each other.",
    build:
      "Core kernel subsystems for an x86 OS in C: preemptive thread scheduler, demand-paging virtual memory with clock page replacement and lazy stack initialization, a POSIX-like system call interface, and a multi-level indexed inode file system.",
    result:
      "A functional kernel handling page faults, process isolation, and extensible file storage up to 8 MB with constant-time inode access patterns.",
    highlights: [
      "Demand-paging VM with clock replacement and lazy stack initialization",
      "Preemptive thread scheduler with synchronization primitives",
      "Multi-level indexed inode file system supporting files up to 8 MB",
    ],
  },
  {
    slug: "mythology-network",
    title: "Greek Mythology Visualization",
    description:
      "Interactive D3.js force-directed graph of Zeus' relationships in Greek mythology.",
    shortDescription:
      "Force-directed graph of Zeus' relationships in Greek mythology.",
    image: "/images/mythology-ui.png",
    technologies: ["D3.js", "HTML/CSS"],
    githubUrl: "https://github.com/ryanzhouuu/mythology-network",
    liveUrl: "http://ryanzhou.me/mythology-network/",
    year: "2024",
    role: "Data Viz",
    category: "Visualization",
    problem:
      "Greek mythology is a dense web of relationships that reads poorly as prose — the connections are the story, and a flat list hides them entirely.",
    build:
      "A force-directed D3.js network built from a hand-curated relationship dataset, rendered as a draggable, hoverable graph with labeled edges.",
    result:
      "A visual map that makes the structure of the myths legible at a glance and invites exploration rather than linear reading.",
    highlights: [
      "Force-directed layout with physics-based node positioning",
      "Drag, hover, and trace interactions",
      "Hand-curated relationship dataset",
    ],
  },
];
