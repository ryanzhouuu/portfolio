import React from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Education: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Texas at Austin",
      location: "Austin, TX",
      period: "2024 - 2028",
      gpa: "4.0/4.0",
      status: "current",
      highlights: [
        "University Honors for 2 consecutive semesters",
      ],
      courses: [
        "Data Structures & Algorithms",
        "Discrete Mathematics",
        "Computer Organization & Architecture",
        "Operating Systems",
        "Linear Algebra",
      ],
    },
    {
      degree: "High School Diploma",
      school: "Cinco Ranch High School",
      location: "Katy, TX",
      period: "2020 - 2024",
      gpa: "4.0/4.0 (UW), 4.7/4.0 (W)",
      status: "completed",
      highlights: [
        "National Merit Scholar",
        "National Honors Society",
        "AP Scholar with Distinction",
      ],
      courses: [
        "AP Computer Science A",
        "AP Calculus BC",
        "AP Statistics",
        "AP Physics",
      ],
    },
  ];

  return (
    <section
      id="education"
      className="py-32 bg-gray-900 relative overflow-hidden"
    >
      {/* Enhanced Flowy Animated Light Gradients */}
      <div className="absolute inset-0">
        {/* Primary flowing gradient */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-[750px] h-[550px] bg-gradient-to-r from-blue-500/16 via-indigo-500/12 to-purple-500/18 rounded-full blur-3xl animate-flow-1"></div>
        </div>

        {/* Secondary flowing gradient */}
        <div className="absolute bottom-0 right-0 w-full h-full">
          <div className="absolute w-[850px] h-[650px] bg-gradient-to-l from-purple-500/18 via-pink-500/14 to-rose-500/16 rounded-full blur-3xl animate-flow-2"></div>
        </div>

        {/* Tertiary flowing gradient */}
        <div className="absolute top-1/2 left-1/2 w-full h-full">
          <div
            className="absolute w-[600px] h-[400px] bg-gradient-to-br from-teal-500/12 via-cyan-500/8 to-blue-500/14 rounded-full blur-3xl animate-flow-3"
            style={{ left: "-300px", top: "-200px" }}
          ></div>
        </div>

        {/* Additional reverse flowing gradients */}
        <div className="absolute top-1/3 right-1/3 w-full h-full">
          <div className="absolute w-[500px] h-[300px] bg-gradient-to-tl from-violet-500/10 via-purple-500/8 to-indigo-500/12 rounded-full blur-3xl animate-flow-reverse-1"></div>
        </div>

        <div className="absolute bottom-1/4 left-1/4 w-full h-full">
          <div className="absolute w-[450px] h-[280px] bg-gradient-to-br from-emerald-500/8 via-green-500/6 to-teal-500/10 rounded-full blur-3xl animate-flow-reverse-2"></div>
        </div>

        {/* Ambient light streams */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[200px] bg-gradient-to-l from-transparent via-blue-400/6 to-transparent rounded-full blur-2xl animate-drift-1"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[150px] bg-gradient-to-r from-transparent via-purple-400/6 to-transparent rounded-full blur-2xl animate-drift-2"></div>
          <div className="absolute top-2/3 left-2/3 w-[300px] h-[120px] bg-gradient-to-br from-transparent via-pink-400/5 to-transparent rounded-full blur-2xl animate-drift-3"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 elegant-underline">
            Academic
            <span className="artistic-accent"> Journey</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-serif">
            Educational foundation and achievements in computer science
          </p>
        </div>

        {/* Education Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>

          <div className="space-y-16">
            {education.map((edu, index) => (
              <div
                key={edu.degree}
                className={`relative flex flex-col md:flex-row items-start md:items-center transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : index % 2 === 0
                    ? "opacity-0 -translate-x-10"
                    : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 400}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full z-10 shadow-lg shadow-blue-500/50"></div>

                {/* Content */}
                <div
                  className={`w-full md:w-7/12 ml-16 md:ml-0 ${
                    index % 2 === 0
                      ? "md:text-right md:pr-32"
                      : "md:ml-auto md:pl-32"
                  }`}
                >
                  <div className="group vintage-frame rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:-translate-y-2 hover-glow-artistic">
                    <div className="flex items-center gap-3 mb-4">
                      <GraduationCap className="text-blue-400" size={24} />
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          edu.status === "current"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {edu.status === "current" ? "In Progress" : "Completed"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-display font-bold text-white mb-3">
                      {edu.degree}
                    </h3>
                    <p className="text-xl font-semibold artistic-accent mb-4">
                      {edu.school}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award size={16} />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-white mb-3">
                          Highlights
                        </h4>
                        <ul className="space-y-2">
                          {edu.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className={`text-gray-300 text-sm flex items-start font-serif ${
                                index % 2 === 0 ? "md:justify-between" : "md:justify-start"
                              }`}
                            >
                              <span className="text-purple-400 mr-2 flex-shrink-0">
                                •
                              </span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-white mb-3">
                          Relevant Courses
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course) => (
                            <span
                              key={course}
                              className="px-3 py-1 glass-artistic text-purple-300 rounded-xl text-xs font-medium border border-purple-500/30"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
