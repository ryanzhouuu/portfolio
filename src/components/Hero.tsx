import React from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { useParallax } from '../hooks/useScrollAnimation';

const Hero: React.FC = () => {
  const offsetY = useParallax();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-white max-w-4xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Ryan Zhou
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Computer Science Student passionate about building the future with code
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200"
              >
                Get In Touch
              </button>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6 mt-8">
              <a href="https://github.com/ryanzhouuu" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/ryanzhouuu" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200">
                <Linkedin size={24} />
              </a>
              <a href="mailto:ryanzhouuu@gmail.com" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <button onClick={() => scrollToSection('skills')}>
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;