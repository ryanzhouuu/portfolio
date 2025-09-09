import React from "react";
import { ExternalLink, Github, Calendar, Users, Star } from "lucide-react";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "../hooks/useScrollAnimation";

const Projects: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const projects = [
    {
      title: "Vintdex",
      description:
        "Full-stack web application for tracking and predicting market prices for vintage clothing items.",
      longDescription:
        "Built with Next.js and Supabase. Features data visualization, user authentication, and reverse image search.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBTblpayOTpAX3s75UAMe1U8VA83w1VTB51w&s",
      technologies: ["Next.js", "Supabase", "Tailwind CSS", "OpenAI CLIP"],
      githubUrl: "https://github.com/ryanzhouuu/vintdex",
      liveUrl: "https://vintdex.vercel.app",
      status: "in-progress",
      teamSize: 2,
      duration: "4 months",
      highlights: [],
    },
    {
      title: "Kinector",
      description:
        "Precision-oriented fitness progress tracking mobile app that provides advanced analytics.",
      longDescription:
        "Developed using Python, TensorFlow, and integrated with GitHub API. The tool analyzes code patterns and provides actionable feedback to developers.",
      image:
        "https://www.slcjcc.org/images/Fitness/Wellness_Weekly/unnamed-12_sml.png",
      technologies: ["Python", "React Native", "Supabase", "FastAPI"],
      githubUrl: "https://github.com/ryanzhouuu",
      liveUrl: "",
      status: "in-progress",
      teamSize: 1,
      duration: "2 months",
      highlights: [],
    },
    {
      title: "DRE for IDK Cascades",
      description:
        "Dynamic Routing Engine built to improve performance in IDK classifiers by making scheduling decisions.",
      longDescription:
        "Full-stack application with React frontend, Express.js backend, and MongoDB database. Includes payment integration and real-time features.",
      image:
        "https://images.theconversation.com/files/374303/original/file-20201210-18-elk4m.jpg?ixlib=rb-4.1.0&rect=0%2C22%2C7500%2C5591&q=45&auto=format&w=926&fit=clip",
      technologies: ["Python", "Pytorch", "Numpy", "Pandas", "Matplotlib"],
      githubUrl: "https://github.com/ryanzhouuu",
      liveUrl: "",
      status: "in-progress",
      teamSize: 1,
      duration: "1 months",
      highlights: [],
    },
    {
      title: "NBA Archetype Clustering",
      description:
        "Clustering of NBA players into archetypes based on their stats using K-Means clustering.",
      longDescription:
        "Used K-Means clustering to cluster NBA players into archetypes based on their stats. The clusters were then analyzed to determine the characteristics of each archetype.",
      image: "https://andscape.com/wp-content/uploads/2017/06/nbalogo.jpg",
      technologies: ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
      githubUrl: "https://github.com/ryanzhouuu/nba-archetype-clustering",
      liveUrl: "https://nba-archetype-clustering.vercel.app/",
      status: "completed",
      teamSize: 1,
      duration: "1 month",
      highlights: [],
    },
    {
      title: "Greek Mythology Network Visualization",
      description: "Used D3.js to generate a visualization of the Greek god Zeus' relationships for a mythology class.",
      longDescription: "The visualization is a network of Zeus' relationships with other gods and goddesses. The nodes are the gods and goddesses and the edges are the relationships between them. The visualization is interactive and allows the user to hover over the nodes and edges to see the details of the relationships.",
      image: "https://www.greek-mythology-pantheon.com/wp-content/uploads/Greek_Gods_and_Goddesses/Zeus_Jupiter_Greek_God/Zeus_Jupiter_Greek_God_Art_01_by_arcosart.jpg",
      technologies: ["D3.js", "HTML", "CSS"],
      githubUrl: "https://github.com/ryanzhouuu/mythology-network",
      liveUrl: "ryanzhou.me/mythology-network",
      status: "completed",
      teamSize: 1,
      duration: "1 month",
      highlights: [],
    }
  ];

  const { ref: projectsRef, isItemVisible } = useStaggeredAnimation(
    projects.length,
    200
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 md:py-32 bg-gray-950 relative overflow-hidden"
    >
      {/* Enhanced Flowy Animated Light Gradients - Mobile Responsive */}
      <div className="absolute inset-0">
        {/* Primary flowing gradient */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute w-[300px] h-[200px] md:w-[900px] md:h-[700px] bg-gradient-to-l from-purple-500/18 via-violet-500/14 to-indigo-500/16 rounded-full blur-3xl animate-flow-1"></div>
        </div>

        {/* Secondary flowing gradient */}
        <div className="absolute bottom-0 left-0 w-full h-full">
          <div className="absolute w-[250px] h-[150px] md:w-[800px] md:h-[600px] bg-gradient-to-r from-blue-500/16 via-cyan-500/12 to-teal-500/14 rounded-full blur-3xl animate-flow-2"></div>
        </div>

        {/* Tertiary flowing gradient */}
        <div className="absolute top-1/3 left-1/3 w-full h-full">
          <div className="absolute w-[200px] h-[120px] md:w-[650px] md:h-[450px] bg-gradient-to-br from-pink-500/12 via-rose-500/8 to-red-500/10 rounded-full blur-3xl animate-flow-3"></div>
        </div>

        {/* Additional reverse flowing gradients */}
        <div className="absolute top-2/3 right-1/4 w-full h-full">
          <div className="absolute w-[150px] h-[100px] md:w-[550px] md:h-[350px] bg-gradient-to-tl from-emerald-500/10 via-green-500/8 to-lime-500/12 rounded-full blur-3xl animate-flow-reverse-1"></div>
        </div>

        <div className="absolute bottom-1/4 right-2/3 w-full h-full">
          <div className="absolute w-[120px] h-[80px] md:w-[500px] md:h-[300px] bg-gradient-to-tr from-orange-500/8 via-amber-500/6 to-yellow-500/10 rounded-full blur-3xl animate-flow-reverse-2"></div>
        </div>

        {/* Ambient light streams */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[120px] h-[60px] md:w-[450px] md:h-[220px] bg-gradient-to-r from-transparent via-purple-400/6 to-transparent rounded-full blur-2xl animate-drift-1"></div>
          <div className="absolute bottom-1/3 right-1/3 w-[100px] h-[50px] md:w-[400px] md:h-[180px] bg-gradient-to-l from-transparent via-blue-400/6 to-transparent rounded-full blur-2xl animate-drift-2"></div>
          <div className="absolute top-1/2 right-1/2 w-[80px] h-[40px] md:w-[350px] md:h-[140px] bg-gradient-to-br from-transparent via-cyan-400/5 to-transparent rounded-full blur-2xl animate-drift-3"></div>
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
            Featured
            <span className="artistic-accent"> Projects</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-serif px-4">
            A showcase of my latest work in web development, mobile apps, and
            machine learning
          </p>
        </div>

        <div
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project, index) => {
            const isLiveDisabled =
              project.status === "in-progress" || !project.liveUrl;
            return (
              <div
                key={project.title}
                className={`group vintage-frame rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/10 transition-all duration-700 transform hover:-translate-y-4 hover-glow-artistic scroll-hover-lift ${
                  isItemVisible(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {/* Project Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status === "in-progress"
                        ? "In Progress"
                        : "Completed"}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>
                    <div className="flex space-x-1 sm:space-x-2">
                      <a
                        href={project.githubUrl}
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-purple-500/20 rounded-xl transition-all duration-300 transform hover:scale-110"
                        aria-label="View GitHub repository"
                      >
                        <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </a>
                      <a
                        href={isLiveDisabled ? "#" : project.liveUrl}
                        aria-disabled={isLiveDisabled}
                        onClick={
                          isLiveDisabled ? (e) => e.preventDefault() : undefined
                        }
                        title={
                          isLiveDisabled
                            ? "Live demo coming soon"
                            : "View live demo"
                        }
                        className={`p-1.5 sm:p-2 text-gray-400 rounded-xl transition-all duration-300 ${
                          isLiveDisabled
                            ? "opacity-40 cursor-not-allowed pointer-events-none"
                            : "hover:text-blue-400 hover:bg-blue-500/10 transform hover:scale-110"
                        }`}
                        aria-label="View live demo"
                      >
                        <ExternalLink
                          size={16}
                          className="sm:w-[18px] sm:h-[18px]"
                        />
                      </a>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed font-serif">
                    {project.description}
                  </p>

                  {/* Project Stats */}
                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                    <div className="flex items-center space-x-1">
                      <Users size={12} className="sm:w-[14px] sm:h-[14px]" />
                      <span>
                        {project.teamSize}{" "}
                        {project.teamSize === 1 ? "person" : "people"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} className="sm:w-[14px] sm:h-[14px]" />
                      <span>{project.duration}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={tech}
                        className={`px-2 sm:px-3 py-1 glass-artistic text-purple-300 rounded-xl text-xs font-medium border border-purple-500/30 transition-all duration-300 ${
                          isItemVisible(index)
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-5"
                        }`}
                        style={{
                          transitionDelay: `${index * 200 + techIndex * 50}ms`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span
                        className={`px-2 sm:px-3 py-1 bg-gray-500/20 text-gray-400 rounded-xl text-xs font-medium border border-gray-500/30 transition-all duration-300 ${
                          isItemVisible(index)
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-5"
                        }`}
                        style={{ transitionDelay: `${index * 200 + 200}ms` }}
                      >
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Highlights */}
                  {/* <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                      <Star
                        size={12}
                        className="sm:w-[14px] sm:h-[14px] text-yellow-400"
                      />
                      Key Achievements
                    </h4>
                    <ul className="text-xs sm:text-sm text-gray-400 space-y-1 font-serif">
                      {project.highlights.slice(0, 2).map((highlight, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-purple-400 mr-2 mt-1">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div> */}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <a
                      href={isLiveDisabled ? "#" : project.liveUrl}
                      aria-disabled={isLiveDisabled}
                      onClick={
                        isLiveDisabled ? (e) => e.preventDefault() : undefined
                      }
                      title={
                        isLiveDisabled
                          ? "Live demo coming soon"
                          : "View live demo"
                      }
                      className={`flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-2.5 sm:py-3 px-3 sm:px-4 rounded-2xl font-medium transition-all duration-300 text-sm sm:text-base ${
                        isLiveDisabled
                          ? "opacity-50 cursor-not-allowed pointer-events-none"
                          : "hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
                      }`}
                    >
                      View Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="px-3 sm:px-4 py-2.5 sm:py-3 border border-purple-500/30 text-gray-300 rounded-2xl font-medium hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 text-sm sm:text-base text-center"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        <div
          className={`text-center mt-12 sm:mt-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <a
            href="https://github.com/ryanzhouuu"
            className="inline-flex items-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-4 glass-artistic text-gray-300 rounded-2xl font-semibold hover:text-white transform hover:scale-105 transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50 hover-glow-artistic text-sm sm:text-base"
          >
            <Github size={18} className="sm:w-5 sm:h-5" />
            <span className="font-serif">View All Projects on GitHub</span>
            <ExternalLink size={14} className="sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
