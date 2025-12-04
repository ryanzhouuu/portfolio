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
        "University Honors",
        "Data Structures & Algorithms",
        "Operating Systems",
      ],
    },
    {
      degree: "High School Diploma",
      school: "Cinco Ranch High School",
      period: "2020 - 2024",
      gpa: "4.0/4.0",
      details: ["National Merit Scholar", "AP Scholar with Distinction"],
    },
  ];

  return (
    <section id="education" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 mb-16 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-display font-medium text-white mb-6">
            Education
          </h2>
          <div className="h-px w-20 bg-white/20 mb-12"></div>

          {/* Banner Image */}
          <div className="relative w-full h-48 md:h-64 lg:h-80 rounded-2xl overflow-hidden mb-16 group">
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500 z-10" />
            <img
              src={`${import.meta.env.BASE_URL}images/banner.jpg`}
              alt="UT Austin Campus"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="space-y-16 border-l border-white/10 ml-3 md:ml-0 pl-8 md:pl-0">
          {education.map((edu, index) => (
            <div key={index} className="md:grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block col-span-1 text-right pr-8 pt-1">
                <span className="text-gray-500 font-mono text-sm">
                  {edu.period}
                </span>
              </div>

              {/* Timeline Dot for Desktop */}
              <div className="hidden md:block absolute left-[25%] top-2 w-2 h-2 bg-white rounded-full -translate-x-[5px] ring-4 ring-[#050505]"></div>

              <div className="md:col-span-3 space-y-2">
                <div className="md:hidden mb-2">
                  <span className="text-gray-500 font-mono text-sm">
                    {edu.period}
                  </span>
                </div>
                <h3 className="text-2xl text-white font-medium">
                  {edu.school}
                </h3>
                <p className="text-xl text-gray-400 font-light">{edu.degree}</p>
                <p className="text-gray-500 mt-1">GPA: {edu.gpa}</p>

                <div className="flex flex-wrap gap-3 mt-4 pt-2">
                  {edu.details.map((detail) => (
                    <span
                      key={detail}
                      className="text-sm text-gray-500 bg-white/5 px-3 py-1 rounded-full"
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
