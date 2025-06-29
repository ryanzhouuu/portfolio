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
      className="pt-14 min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900"
    >
      {/* Enhanced Flowy Animated Light Gradients */}
      <div className="absolute inset-0">
        {/* Primary flowing gradient - More visible */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute w-[900px] h-[700px] bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-pink-500/18 rounded-full blur-3xl animate-flow-1"
            style={{
              top: "5%",
              left: "5%",
              transform: `translate(${offsetY * 0.05}px, ${offsetY * 0.03}px)`,
            }}
          ></div>
        </div>

        {/* Secondary flowing gradient - More visible */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div
            className="absolute w-[800px] h-[600px] bg-gradient-to-l from-purple-500/18 via-indigo-500/12 to-cyan-500/16 rounded-full blur-3xl animate-flow-2"
            style={{
              top: "15%",
              right: "0%",
              transform: `translate(${-offsetY * 0.04}px, ${offsetY * 0.06}px)`,
            }}
          ></div>
        </div>

        {/* Tertiary flowing gradient - More visible */}
        <div className="absolute bottom-0 left-1/2 w-full h-full">
          <div
            className="absolute w-[700px] h-[500px] bg-gradient-to-t from-rose-500/14 via-violet-500/10 to-blue-500/16 rounded-full blur-3xl animate-flow-3"
            style={{
              bottom: "10%",
              left: "25%",
              transform: `translate(${offsetY * 0.02}px, ${-offsetY * 0.04}px)`,
            }}
          ></div>
        </div>

        {/* Additional reverse flowing gradients for more complexity */}
        <div className="absolute top-1/3 right-1/4 w-full h-full">
          <div
            className="absolute w-[600px] h-[400px] bg-gradient-to-br from-emerald-500/12 via-teal-500/8 to-blue-500/14 rounded-full blur-3xl animate-flow-reverse-1"
            style={{
              transform: `translate(${-offsetY * 0.03}px, ${offsetY * 0.05}px)`,
            }}
          ></div>
        </div>

        <div className="absolute bottom-1/3 left-1/4 w-full h-full">
          <div
            className="absolute w-[550px] h-[350px] bg-gradient-to-tl from-orange-500/10 via-pink-500/8 to-purple-500/12 rounded-full blur-3xl animate-flow-reverse-2"
            style={{
              transform: `translate(${offsetY * 0.04}px, ${-offsetY * 0.03}px)`,
            }}
          ></div>
        </div>

        {/* Enhanced ambient light streams */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[250px] bg-gradient-to-r from-transparent via-purple-400/8 to-transparent rounded-full blur-2xl animate-drift-1"></div>
          <div className="absolute top-3/4 right-1/4 w-[450px] h-[200px] bg-gradient-to-l from-transparent via-blue-400/8 to-transparent rounded-full blur-2xl animate-drift-2"></div>
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[150px] bg-gradient-to-r from-transparent via-pink-400/6 to-transparent rounded-full blur-2xl animate-drift-3"></div>
        </div>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.015)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-white max-w-6xl mx-auto">
          <div className="space-y-12 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              <span className="block text-gray-100 mb-6 elegant-underline">
                Hello, I'm
              </span>
            </h2>
            <h1 className="text-7xl md:text-9xl font-display font-bold leading-tight">
              <span className="artistic-accent text-8xl md:text-[10rem] tracking-wide">
                Ryan Zhou
              </span>
            </h1>

            <div className="ornamental-divider"></div>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-serif">
              Computer Science Student passionate about
              <span className="artistic-accent font-semibold">
                {" "}
                full-stack development
              </span>{" "}
              and
              <span className="text-purple-300 font-semibold">
                {" "}
                scalable software solutions
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
              <button
                onClick={() => scrollToSection("projects")}
                className="group px-10 py-5 bg-gradient-to-r from-purple-600/20 to-blue-600/20 glass-artistic border border-purple-500/30 rounded-2xl font-serif font-semibold text-purple-100 hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 flex items-center space-x-3"
              >
                <span className="text-lg">View My Projects</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="artistic-btn px-10 py-5 rounded-2xl font-serif font-semibold text-purple-200 transform hover:scale-105 transition-all duration-500 backdrop-blur-sm text-lg"
              >
                Contact Me
              </button>
            </div>

            {/* Elegant Social Links */}
            <div className="flex justify-center space-x-8 mt-16">
              {[
                { icon: Github, href: "https://github.com/ryanzhouuu", label: "GitHub" },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/ryanzhouuu",
                  label: "LinkedIn",
                },
                { icon: Mail, href: "mailto:ryanzhouuu@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-5 glass-artistic border border-purple-500/20 rounded-2xl hover:border-purple-500/40 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 group glow-artistic"
                  aria-label={label}
                >
                  <Icon
                    size={24}
                    className="text-purple-200 group-hover:text-purple-100 transition-colors duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
