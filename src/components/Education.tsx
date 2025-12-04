import React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Education: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Texas at Austin",
      period: "2024 - 2028",
      gpa: "4.0/4.0",
      details: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "Computer Architecture",
        "Artificial Intelligence",
      ],
    },
    {
      degree: "High School Diploma",
      school: "Cinco Ranch High School",
      period: "2020 - 2024",
      gpa: "4.72 W /4.0 UW",
      details: ["National Merit Scholar", "AP Scholar with Distinction"],
    },
  ];

  return (
    <section id="education" className="py-16 sm:py-24 md:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 mb-12 sm:mb-16 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-white mb-4 sm:mb-6">
            Education
          </h2>
          <div className="h-px w-16 sm:w-20 bg-white/20 mb-8 sm:mb-12"></div>

          {/* Banner Image */}
          <div className="relative w-full h-40 sm:h-48 md:h-64 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden mb-12 sm:mb-16 group">
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500 z-10" />
            <img
              src={`${import.meta.env.BASE_URL}images/banner.jpg`}
              alt="UT Austin Campus"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="space-y-12 sm:space-y-16 border-l border-white/10 ml-2 sm:ml-3 md:ml-0 pl-6 sm:pl-8 md:pl-0">
          {education.map((edu, index) => (
            <div
              key={index}
              className="md:grid md:grid-cols-4 gap-6 md:gap-8 relative"
            >
              <div className="hidden md:block col-span-1 text-right pr-6 md:pr-8 pt-1">
                <span className="text-gray-500 font-mono text-xs sm:text-sm">
                  {edu.period}
                </span>
              </div>

              {/* Timeline Dot for Desktop */}
              <div className="hidden md:block absolute left-[25%] top-2 w-2 h-2 bg-white rounded-full -translate-x-[5px] ring-4 ring-[#050505]"></div>

              {/* Timeline Dot for Mobile */}
              <div className="md:hidden absolute left-0 top-2 w-2 h-2 bg-white rounded-full -translate-x-[9px] ring-4 ring-[#050505]"></div>

              <div className="md:col-span-3 space-y-1.5 sm:space-y-2">
                <div className="md:hidden mb-2">
                  <span className="text-gray-500 font-mono text-xs sm:text-sm">
                    {edu.period}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl text-white font-medium">
                  {edu.school}
                </h3>
                <p className="text-lg sm:text-xl text-gray-400 font-light">
                  {edu.degree}
                </p>
                <p className="text-sm sm:text-base text-gray-500 mt-1">
                  GPA: {edu.gpa}
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4 pt-2">
                  {edu.details.map((detail) => (
                    <span
                      key={detail}
                      className="text-xs sm:text-sm text-gray-500 bg-white/5 px-2.5 sm:px-3 py-1 rounded-full"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
