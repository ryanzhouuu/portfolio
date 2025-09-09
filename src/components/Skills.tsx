import React from "react";
import { Code, Database, Globe } from "lucide-react";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "../hooks/useScrollAnimation";

const Skills: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const skillCategories = [
    {
      icon: <Code size={32} />,
      title: "Frontend Development",
      skills: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Next.js",
        "ShadCN UI",
        "React Native",
      ],
      color: "from-blue-500 to-cyan-500",
      description: "Building responsive and interactive user interfaces",
    },
    {
      icon: <Database size={32} />,
      title: "Backend & Database",
      skills: [
        "Node.js",
        "Python",
        "PostgreSQL",
        "Express.js",
        "Supabase",
        "Java",
        "FastAPI",
      ],
      color: "from-purple-500 to-pink-500",
      description: "Developing scalable server-side applications and databases",
    },
    {
      icon: <Globe size={32} />,
      title: "Tools & Platforms",
      skills: ["Git", "Vercel", "Figma", "Linux"],
      color: "from-orange-500 to-red-500",
      description: "Utilizing modern development tools and cloud platforms",
    },
  ];

  const { ref: skillRef, isItemVisible } = useStaggeredAnimation(
    skillCategories.length,
    150
  );

  const programmingLanguages = [
    {
      name: "JavaScript",
      logo: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
          alt="JavaScript"
          className="w-8 h-8"
        />
      ),
    },
    {
      name: "TypeScript",
      logo: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
          alt="TypeScript"
          className="w-8 h-8"
        />
      ),
    },
    {
      name: "Python",
      logo: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
          alt="Python"
          className="w-8 h-8"
        />
      ),
    },
    {
      name: "Java",
      logo: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
          alt="Java"
          className="w-8 h-8"
        />
      ),
    },
    {
      name: "C",
      logo: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"
          alt="C"
          className="w-8 h-8"
        />
      ),
    },
    {
      name: "SQL",
      logo: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
          alt="SQL"
          className="w-8 h-8"
        />
      ),
    },
    {
      name: "HTML/CSS",
      logo: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
          alt="HTML/CSS"
          className="w-8 h-8"
        />
      ),
    },
  ];

  // Duplicate the array for seamless loop
  const duplicatedLanguages = [
    ...programmingLanguages,
    ...programmingLanguages,
  ];

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 md:py-32 bg-gray-950 relative overflow-hidden"
    >
      {/* Enhanced Flowy Animated Light Gradients - Mobile Responsive */}
      <div className="absolute inset-0">
        {/* Primary flowing gradient */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute w-[300px] h-[200px] md:w-[800px] md:h-[600px] bg-gradient-to-l from-cyan-500/16 via-blue-500/12 to-purple-500/18 rounded-full blur-3xl animate-flow-1"></div>
        </div>

        {/* Secondary flowing gradient */}
        <div className="absolute bottom-0 left-0 w-full h-full">
          <div className="absolute w-[250px] h-[150px] md:w-[700px] md:h-[500px] bg-gradient-to-r from-purple-500/14 via-pink-500/10 to-rose-500/16 rounded-full blur-3xl animate-flow-2"></div>
        </div>

        {/* Tertiary flowing gradient */}
        <div className="absolute top-1/2 left-1/2 w-full h-full">
          <div
            className="absolute w-[200px] h-[120px] md:w-[600px] md:h-[400px] bg-gradient-to-br from-emerald-500/12 via-teal-500/8 to-blue-500/14 rounded-full blur-3xl animate-flow-3"
            style={{ left: "-100px", top: "-60px" }}
          ></div>
        </div>

        {/* Additional reverse flowing gradients */}
        <div className="absolute top-1/4 left-1/4 w-full h-full">
          <div className="absolute w-[150px] h-[100px] md:w-[550px] md:h-[350px] bg-gradient-to-tr from-indigo-500/10 via-violet-500/8 to-purple-500/12 rounded-full blur-3xl animate-flow-reverse-1"></div>
        </div>

        {/* Ambient light streams */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/3 w-[120px] h-[60px] md:w-[400px] md:h-[200px] bg-gradient-to-l from-transparent via-cyan-400/6 to-transparent rounded-full blur-2xl animate-drift-1"></div>
          <div className="absolute bottom-1/3 left-1/3 w-[100px] h-[50px] md:w-[350px] md:h-[150px] bg-gradient-to-r from-transparent via-purple-400/6 to-transparent rounded-full blur-2xl animate-drift-2"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6 elegant-underline">
            Technical
            <span className="artistic-accent"> Expertise</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-serif px-4">
            Specialized in modern technologies for full-stack development and
            digital innovation
          </p>
        </div>

        {/* Skill Categories */}
        <div
          ref={skillRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20"
        >
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`group vintage-frame rounded-3xl p-6 sm:p-8 transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl hover-glow-artistic scroll-hover-lift ${
                isItemVisible(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div
                className={`inline-flex p-3 sm:p-4 rounded-2xl bg-gradient-to-r ${category.color} text-white mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
              >
                {category.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 sm:mb-3">
                {category.title}
              </h3>

              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed font-serif">
                {category.description}
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className={`px-2 sm:px-4 py-1 sm:py-2 glass-artistic text-gray-300 rounded-xl text-xs sm:text-sm font-medium border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 ${
                      isItemVisible(index)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                    }`}
                    style={{
                      transitionDelay: `${index * 150 + skillIndex * 50}ms`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Programming Languages Conveyor Belt */}
        <div
          className={`vintage-frame rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-1000 overflow-hidden scroll-hover-glow ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6 sm:mb-8 text-center elegant-underline">
            Programming Languages
          </h3>

          {/* Conveyor Belt Container with Extra Padding */}
          <div className="relative overflow-hidden py-4 sm:py-6 md:py-8">
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-gray-950/90 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-l from-gray-950/90 to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling Container */}
            <div className="flex animate-scroll-left">
              {duplicatedLanguages.map((lang, index) => (
                <div
                  key={`${lang.name}-${index}`}
                  className="flex-shrink-0 mx-2 sm:mx-3 md:mx-4 group"
                >
                  <div className="glass-artistic rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 min-w-[100px] sm:min-w-[120px] md:min-w-[140px] text-center scroll-hover-lift">
                    {/* Language Logo */}
                    <div className="flex justify-center mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {lang.logo}
                    </div>

                    {/* Language Name */}
                    <span className="text-gray-300 group-hover:text-white font-medium transition-colors duration-300 text-xs sm:text-sm font-serif">
                      {lang.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
