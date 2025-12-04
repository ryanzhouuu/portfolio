import React from "react";
import { Code, Database, Globe } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Skills: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Next.js",
        "React Native",
      ],
    },
    {
      title: "Backend",
      skills: [
        "Node.js",
        "Python",
        "PostgreSQL",
        "Express.js",
        "Supabase",
        "FastAPI",
      ],
    },
    {
      title: "Tools",
      skills: ["Git", "Docker", "AWS", "Figma", "Linux"],
    },
  ];

  const programmingLanguages = [
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Java",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      name: "C++",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    },
    {
      name: "PostgreSQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
  ];

  // Duplicate the array for seamless loop
  const duplicatedLanguages = [
    ...programmingLanguages,
    ...programmingLanguages,
  ];

  return (
    <section id="skills" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 mb-20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-display font-medium text-white mb-6">
            Technical Arsenal
          </h2>
          <div className="h-px w-20 bg-white/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {skillCategories.map((category, index) => (
            <div key={category.title} className="group">
              <h3 className="text-2xl font-medium text-white mb-8 flex items-center gap-3">
                {index === 0 && <Code size={24} className="text-gray-400" />}
                {index === 1 && (
                  <Database size={24} className="text-gray-400" />
                )}
                {index === 2 && <Globe size={24} className="text-gray-400" />}
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center text-lg text-gray-400 hover:text-white transition-colors duration-300 border-b border-white/5 py-3"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-4 group-hover:bg-white transition-colors duration-300"></span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Revolving Skills Animation */}
        <div className="relative overflow-hidden py-10 border-t border-white/5">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>

          <div className="flex animate-scroll-left w-max hover:pause">
            {duplicatedLanguages.map((lang, index) => (
              <div
                key={`${lang.name}-${index}`}
                className="flex flex-col items-center justify-center mx-12 group cursor-pointer"
              >
                <div className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100">
                  <img
                    src={lang.logo}
                    alt={lang.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm text-gray-500 font-mono group-hover:text-white transition-colors duration-300">
                  {lang.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
