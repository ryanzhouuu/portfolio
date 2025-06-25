import React from 'react';
import { ExternalLink, Github, Calendar, Users, Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Projects: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const projects = [
    {
      title: 'Vintdex',
      description: 'A full-stack web application helping users track and predict the prices of the rare vintage clothing across various secondhand marketplaces.',
      longDescription: 'Built with Next.js and Supabase. Features OpenAI CLIP image search, user authentication, price tracking and prediction, and visualizations',
      image: 'https://i.etsystatic.com/13770942/r/il/ec15fc/1881395568/il_fullxfull.1881395568_rlm6.jpg',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Supabase', 'Chart.js', 'ShadCN UI'],
      githubUrl: 'https://github.com/Vintdex',
      liveUrl: '',
      status: 'in-progress',
      teamSize: 2,
      duration: '6 months',
      highlights: ['Winner of University Hackathon 2023', '1000+ active users', 'Featured in local tech magazine']
    },
    {
      title: 'Kinector AI',
      description: 'An AI-powered gym assistant that helps users program optimal workouts and track nutrition to achieve their fitness goals.',
      longDescription: 'Developed using Python, React Native, and Supabase. Features workout generation, nutrition tracking, and progress tracking.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOcZ7lgRUckLvrjUKUJxYrky0XCfBmehijOg&s0',
      technologies: ['Python', 'React Native', 'Supabase'],
      githubUrl: 'https://github.com',
      liveUrl: '',
      status: 'in-progress',
      teamSize: 2,
      duration: '4 months',
      highlights: ['Patent pending', 'Reduces review time by 40%', 'Used by 3 tech companies']
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';  
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of my latest work in web development, mobile apps, and machine learning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status === 'in-progress' ? 'In Progress' : 'Completed'}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  <div className="flex space-x-2">
                    <a
                      href={project.githubUrl}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      aria-label="View GitHub repository"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={project.liveUrl}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Project Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>{project.teamSize} {project.teamSize === 1 ? 'person' : 'people'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{project.duration}</span>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Highlights */}
                {/*<div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                    <Star size={14} className="text-yellow-500" />
                    Key Achievements
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {project.highlights.slice(0, 2).map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>*/}

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <a
                    href={project.liveUrl}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    View Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className={`text-center mt-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '800ms' }}>
          <a
            href="https://github.com"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-gray-700 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 border border-gray-200"
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;