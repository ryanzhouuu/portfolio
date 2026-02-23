export const personalInfo = {
  name: 'Ryan Zhou',
  title: 'CS & Economics @ UT Austin',
  bio: 'Computer Science and Economics student at the University of Texas at Austin. I build things at the intersection of software engineering, machine learning, and systems — from low-level C++ infrastructure to full-stack web applications.',
  email: 'ryanzhouuu@gmail.com',
  github: 'https://github.com/ryanzhouuu',
  linkedin: 'https://linkedin.com/in/ryanzhouuu',
  photo: '/images/ryan.jpeg',
};

export const navItems = [
  { id: 'hero', label: 'home', path: '#hero' },
  { id: 'about', label: 'about', path: '#about' },
  { id: 'education', label: 'education', path: '#education' },
  { id: 'experience', label: 'experience', path: '#experience' },
  { id: 'projects', label: 'projects', path: '#projects' },
  { id: 'contact', label: 'contact', path: '#contact' },
];

export const skills = [
  {
    category: 'Frontend',
    items: ['HTML/CSS', 'React', 'TypeScript', 'Tailwind', 'Next.js', 'React Native', 'Zustand'],
  },
  {
    category: 'Backend',
    items: ['Python', 'Node.js', 'PostgreSQL', 'Express.js', 'Supabase', 'FastAPI', 'Firebase'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Docker', 'Linux', 'Vercel', 'Makefile', 'GDB', 'Figma'],
  },
];

export const techLogos = [
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
];

export const education = [
  {
    school: 'University of Texas at Austin',
    degree: 'B.S. Computer Science & B.S. Economics',
    period: '2024 – 2028',
    gpa: '4.00 / 4.00',
    details: ['Data Structures & Algorithms', 'Operating Systems', 'Computer Architecture', 'Artificial Intelligence'],
    banner: '/images/banner.jpg',
  },
  {
    school: 'Cinco Ranch High School',
    degree: 'High School Diploma',
    period: '2020 – 2024',
    gpa: '4.72 W / 4.0 UW',
    details: ['National Merit Scholar', 'AP Scholar with Distinction'],
  },
];

export const experience = [
  {
    company: 'Amazon',
    role: 'Software Development Engineer Intern',
    period: 'Summer 2026',
    location: 'Austin, TX',
    bullets: [
      'Incoming Summer 2026 on the Security team',
    ],
  },
  {
    company: 'Texas Athletics',
    role: 'Student Technician',
    period: 'February 2026 - Present',
    location: 'Austin, TX',
    bullets: [
      '',
    ],
  },
];

export const projects = [
  {
    title: 'Vintdex',
    description: 'Full-stack web application for tracking and predicting market prices for vintage clothing items.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBTblpayOTpAX3s75UAMe1U8VA83w1VTB51w&s',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/ryanzhouuu/vintdex',
    liveUrl: '',
  },
  {
    title: 'In-Memory Key-Value Store',
    description: 'High performance, concurrent in-memory key-value store implemented in C++.',
    image: 'https://www.scylladb.com/wp-content/uploads/Key-Value-Store-diagram-1-e1644958335886.png',
    technologies: ['C++', 'Concurrency', 'Sockets'],
    githubUrl: 'https://github.com/ryanzhouuu/kvstore',
    liveUrl: '',
  },
  {
    title: 'NBA Archetype Clustering',
    description: 'Clustering of NBA players into archetypes based on their stats using K-Means clustering.',
    image: 'https://andscape.com/wp-content/uploads/2017/06/nbalogo.jpg',
    technologies: ['Python', 'Pandas', 'Scikit-learn'],
    githubUrl: 'https://github.com/ryanzhouuu/nba-archetype-clustering',
    liveUrl: 'https://nba-archetype-clustering.vercel.app/',
  },
  {
    title: 'Greek Mythology Visualization',
    description: "Interactive D3.js visualization of the Greek god Zeus' relationships.",
    image: 'https://www.greek-mythology-pantheon.com/wp-content/uploads/Greek_Gods_and_Goddesses/Zeus_Jupiter_Greek_God/Zeus_Jupiter_Greek_God_Art_01_by_arcosart.jpg',
    technologies: ['D3.js', 'HTML/CSS'],
    githubUrl: 'https://github.com/ryanzhouuu/mythology-network',
    liveUrl: 'http://ryanzhou.me/mythology-network/',
  },
  {
    title: 'Tri-Omicron Website',
    description: 'Landing page for Omicron Omicron Omicron, the premier CS fraternity at UT Austin.',
    image: '/images/joeyMog.png',
    technologies: ['Next.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Tri-Omicron/website',
    liveUrl: 'https://triomicron.org',
  },
  {
    title: 'Kinector',
    description: 'Precision-oriented fitness progress tracking mobile app that provides advanced analytics.',
    image: 'https://www.slcjcc.org/images/Fitness/Wellness_Weekly/unnamed-12_sml.png',
    technologies: ['Python', 'React Native', 'FastAPI'],
    githubUrl: 'https://github.com/ryanzhouuu/Kinector',
    liveUrl: '',
  },
];
