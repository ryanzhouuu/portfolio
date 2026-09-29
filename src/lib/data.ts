export const personalInfo = {
  name: "Ryan Zhou",
  role: "Software Engineer",
  title: "CS & Economics @ UT Austin",
  // One concise positioning line for the hero — no marketing filler.
  positioning:
    "computer science student and software engineer working with full-stack engineering, AI/ML, systems, and anything in between.",
  email: "ryanzhouuu@gmail.com",
  github: "https://github.com/ryanzhouuu",
  linkedin: "https://linkedin.com/in/ryanzhouuu",
  photo: "/images/ryan-headshot.jpeg",
};

/** About → Interests. Kept lowercase on purpose. */
export const interests = [
  { title: "the gym", description: "currently running anterior/posterior split" },
  { title: "clash royale", description: "4x ultimate champion on f2p account" },
  { title: "anime", description: "current favs: black clover, mushoku tensei" },
  { title: "basketball", description: "houston rockets fan" },
  { title: "vintage clothing", description: "check out @jrz.vtg on instagram" },
];

/** Liquid chrome behind the hero. React preloads it from the fetchPriority hint. */
export const heroImage = "/images/backgrounds/chrome-negative-left.webp";

export const navItems = [
  { id: "experience", label: "Experience", path: "#experience" },
  { id: "work", label: "Projects", path: "#work" },
  { id: "about", label: "About", path: "#about" },
];

export const education = [
  {
    school: "University of Texas at Austin",
    degree: "B.S. Computer Science & B.S. Economics",
    period: "2024 — 2028",
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
    period: "2020 — 2024",
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
    period: "Aug 2026 — Present",
    location: "Austin, TX",
    bullets: ["CS311: Discrete Mathematics for Computer Science."],
  },
  {
    company: "Amazon",
    logo: "/images/logos/amazon-logo.png",
    role: "Software Development Engineer Intern",
    period: "May 2026 — Jul 2026",
    location: "Austin, TX",
    bullets: [
      "Security Data Management"
    ],
  },
  {
    company: "Texas Athletics",
    logo: "/images/logos/texas-longhorns-neon.jpg",
    role: "Student Technician",
    period: "Feb 2026 — May 2026",
    location: "Austin, TX",
    bullets: [
      "Texas Athletics IT Department"
    ],
  },
  {
    company: "University of Houston",
    logo: "/images/logos/university-of-houston-logo.png",
    role: "Research Intern",
    period: "May 2025 — Jul 2025",
    location: "Remote",
    bullets: [
      "CNN Classifiers",
    ],
  },
  {
    company: "JRZ Vintage",
    logo: "/images/logos/jrz-logo.png",
    role: "Founder",
    period: "Jun 2022 — Aug 2024",
    location: "Houston, TX",
    bullets: [
      "Selling Grails",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  githubUrl?: string;
  liveUrl?: string;
  /** Makes the title itself the link, for projects named after their site. */
  titleUrl?: string;
  /** Site-relative promo, opened from the project row. Not shown until requested. */
  videoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "suki",
    title: "Suki",
    summary:
      "Anime tracking, ranking, recommendations all-in-one.",
    githubUrl: "https://github.com/ryanzhouuu/suki",
    liveUrl: "https://suki-plum.vercel.app",
    videoUrl: "/suki-promo.mp4",
  },
  {
    slug: "sleeper-manager",
    title: "Sleeper Manager",
    summary:
      "Personal fantasy basketball advisor for Sleeper Lock-In leagues.",
    githubUrl: "https://github.com/ryanzhouuu/sleeper-manager",
  },
  {
    slug: "clash-sos",
    title: "Hard Counter",
    summary:
      "Using Clash Royale decks to score player performance against their matchups.",
    githubUrl: "https://github.com/ryanzhouuu/clash-sos",
  },
  {
    slug: "tri-omicron",
    title: "triomicron.org",
    titleUrl: "https://triomicron.org",
    summary:
      "Public website for Tri-Omicron, UT Austin’s premier computer science fraternity.",
    githubUrl: "https://github.com/Tri-Omicron/website",
  },
];
