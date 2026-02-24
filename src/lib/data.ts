export const personalInfo = {
  name: 'Ryan Zhou',
  title: 'CS & Economics @ UT Austin',
  bio: 'Computer Science and Economics student at the University of Texas at Austin. I\'m interested in everything software engineering, machine learning, and systems.',
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
    items: ['HTML/CSS', 'React', 'TypeScript', 'Tailwind', 'Next.js', 'React Native', 'Zustand', 'Flutter'],
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
    details: ['Data Structures & Algorithms', 'Software Engineering', 'Operating Systems', 'Computer Architecture', 'Artificial Intelligence', 'Algorithms'],
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
      'Managed inventory of hardware assets (phones, laptops, peripherals)',
      'Sanitized legacy hardware for recycling or salvage, ensuring adherence to security protocols',
      'Executed technical setups for university sporting events with critical hardware and broadcast gear'
    ],
  },
  {
    company: 'University of Houston',
    role: 'Undergraduate Researcher',
    period: 'May 2025 - August 2025',
    location: 'Houston, TX',
    bullets: [
      'Engineered a routing system for convolutional neural network classifiers using a decision tree trained on model performance ',
    ],
  }
];

export const projects = [
  {
    title: 'Vintdex',
    description: 'Full-stack web application for tracking and predicting market prices for vintage clothing items.',
    image: '/images/vintdex.png',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/vintdex',
    liveUrl: '',
  },
  // {
  //   title: 'In-Memory Key-Value Store',
  //   description: 'High performance, concurrent in-memory key-value store implemented in C++.',
  //   image: 'https://www.scylladb.com/wp-content/uploads/Key-Value-Store-diagram-1-e1644958335886.png',
  //   technologies: ['C++', 'Concurrency', 'Sockets'],
  //   githubUrl: 'https://github.com/ryanzhouuu/kvstore',
  //   liveUrl: '',
  // },
  {
    title: 'VIA',
    description: 'A mobile app used for navigation around college campuses',
    image: '/images/via.png',
    technologies: ['Flutter', 'Express.js', 'Supabase'],
    githubUrl: 'https://github.com/via-team/backend',
    liveUrl: 'https://via-backend-2j3d.onrender.com/api-docs'
  },
  {
    title: 'NBA Archetype Clustering',
    description: 'Clustering of NBA players into archetypes based on their stats using K-Means clustering.',
    image: '/images/nba-clustering.png',
    technologies: ['Python', 'Pandas', 'Scikit-learn'],
    githubUrl: 'https://github.com/ryanzhouuu/nba-archetype-clustering',
    liveUrl: 'https://nba-archetype-clustering.vercel.app/',
  },
  {
    title: 'Greek Mythology Visualization',
    description: "Interactive D3.js visualization of the Greek god Zeus' relationships.",
    image: '/images/mount-olympus.png',
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
    image: '/images/kinector.png',
    technologies: ['Python', 'React Native', 'FastAPI'],
    githubUrl: 'https://github.com/ryanzhouuu/Kinector',
    liveUrl: '',
  },
];
