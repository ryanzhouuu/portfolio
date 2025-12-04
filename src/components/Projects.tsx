import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Projects: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const projects = [
    {
      title: "Vintdex",
      description:
        "Full-stack web application for tracking and predicting market prices for vintage clothing items.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBTblpayOTpAX3s75UAMe1U8VA83w1VTB51w&s",
      technologies: ["Next.js", "Supabase", "Tailwind CSS"],
      githubUrl: "https://github.com/ryanzhouuu/vintdex",
      liveUrl: "https://vintdex.vercel.app",
    },
    {
      title: "Kinector",
      description:
        "Precision-oriented fitness progress tracking mobile app that provides advanced analytics.",
      image:
        "https://www.slcjcc.org/images/Fitness/Wellness_Weekly/unnamed-12_sml.png",
      technologies: ["Python", "React Native", "FastAPI"],
      githubUrl: "https://github.com/ryanzhouuu",
      liveUrl: "",
    },
    {
      title: "DRE for IDK Cascades",
      description:
        "Dynamic Routing Engine built to improve performance in IDK classifiers by making scheduling decisions.",
      image:
        "https://images.theconversation.com/files/374303/original/file-20201210-18-elk4m.jpg?ixlib=rb-4.1.0&rect=0%2C22%2C7500%2C5591&q=45&auto=format&w=926&fit=clip",
      technologies: ["Python", "Pytorch", "NumPy"],
      githubUrl: "https://github.com/ryanzhouuu",
      liveUrl: "",
    },
    {
      title: "NBA Archetype Clustering",
      description:
        "Clustering of NBA players into archetypes based on their stats using K-Means clustering.",
      image: "https://andscape.com/wp-content/uploads/2017/06/nbalogo.jpg",
      technologies: ["Python", "Pandas", "Scikit-learn"],
      githubUrl: "https://github.com/ryanzhouuu/nba-archetype-clustering",
      liveUrl: "https://nba-archetype-clustering.vercel.app/",
    },
    {
      title: "Greek Mythology Visualization",
      description:
        "Interactive D3.js visualization of the Greek god Zeus' relationships.",
      image:
        "https://www.greek-mythology-pantheon.com/wp-content/uploads/Greek_Gods_and_Goddesses/Zeus_Jupiter_Greek_God/Zeus_Jupiter_Greek_God_Art_01_by_arcosart.jpg",
      technologies: ["D3.js", "HTML/CSS"],
      githubUrl: "https://github.com/ryanzhouuu/mythology-network",
      liveUrl: "http://ryanzhou.me/mythology-network/",
    },
  ];

  return (
    <section id="projects" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 mb-20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-display font-medium text-white mb-6">
            Selected Works
          </h2>
          <div className="h-px w-20 bg-white/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {projects.map((project) => (
            <div key={project.title} className="group">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-none mb-6 aspect-video bg-[#111]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                />

                {/* Overlay Links */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black text-white border border-white/20 rounded-full hover:scale-110 transition-transform"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-2xl font-medium text-white">
                    {project.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-lg mb-4 font-light leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm text-gray-500 font-mono"
                    >
                      {tech}
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

export default Projects;
