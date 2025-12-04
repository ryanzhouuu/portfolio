import React from "react";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { useParallax } from "../hooks/useScrollAnimation";

const Hero: React.FC = () => {
  const offsetY = useParallax();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden bg-[#050505] flex items-center justify-center"
    >
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505] animate-spin-slow"
          style={{ animationDuration: "60s" }}
        />
        <div
          className="absolute top-[20%] right-[20%] w-96 h-96 bg-blue-900/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-[20%] left-[20%] w-64 h-64 bg-purple-900/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "1s" }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a] to-[#050505] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col items-start space-y-6 sm:space-y-8 animate-fade-in order-2 lg:order-1">
            <div
              className="space-y-3 sm:space-y-4"
              style={{ transform: `translateY(${offsetY * 0.1}px)` }}
            >
              <h2 className="text-sm sm:text-lg md:text-xl font-light tracking-widest text-gray-400 uppercase">
                Hello, I'm
              </h2>
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-medium tracking-tight text-white leading-none">
                Ryan Zhou
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-gray-400 font-light max-w-2xl mt-4 sm:mt-6 leading-relaxed">
                Computer Science Student interested in{" "}
                <span className="text-white">software engineering</span>,{" "}
                <span className="text-white">machine learning</span>, and{" "}
                <span className="text-white">computer systems</span>.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-4 sm:gap-6 pt-4 sm:pt-8"
              style={{ transform: `translateY(${offsetY * 0.05}px)` }}
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="group flex items-center space-x-2 text-white border-b border-white pb-1 hover:opacity-70 transition-all duration-300"
              >
                <span className="text-base sm:text-lg font-light">
                  View Projects
                </span>
                <ArrowRight
                  size={16}
                  className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-base sm:text-lg font-light"
              >
                Contact Me
              </button>
            </div>

            {/* Minimal Social Links */}
            <div className="flex items-center space-x-6 sm:space-x-8 pt-8 sm:pt-12">
              {[
                {
                  icon: Github,
                  href: "https://github.com/ryanzhouuu",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/ryanzhouuu",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:ryanzhouuu@gmail.com",
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors duration-300"
                  aria-label={label}
                >
                  <Icon size={20} className="sm:w-6 sm:h-6" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div
            className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in mb-8 lg:mb-0"
            style={{ transform: `translateY(${offsetY * 0.05}px)` }}
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full opacity-20 group-hover:opacity-40 blur-3xl transition-opacity duration-500" />
              <img
                src={`${import.meta.env.BASE_URL}images/ryan.jpeg`}
                alt="Ryan Zhou"
                className="relative w-full h-full object-cover rounded-full transition-all duration-700 border border-white/10 group-hover:border-white/30 shadow-2xl shadow-black/50"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
