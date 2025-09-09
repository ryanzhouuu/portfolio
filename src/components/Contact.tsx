import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'ryanzhouuu@gmail.com',
      link: 'mailto:ryanzhouuu@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '+1 (281) 906-3743',
      link: 'tel:+12819063743',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: 'Austin, TX',
      link: null,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      url: 'https://github.com/ryanzhouuu',
      color: 'hover:text-white hover:bg-gray-700/50'
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/ryanzhouuu',
      color: 'hover:text-blue-400 hover:bg-blue-500/10'
    },
    {
      icon: <Mail size={24} />,
      label: 'Email',
      url: 'mailto:ryanzhouuu@gmail.com',
      color: 'hover:text-red-400 hover:bg-red-500/10'
    }
  ];

  return (
    <section id="contact" className="py-32 bg-gray-900 relative overflow-hidden">
      {/* Enhanced Flowy Animated Light Gradients */}
      <div className="absolute inset-0">
        {/* Primary flowing gradient */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-[800px] h-[600px] bg-gradient-to-r from-cyan-500/16 via-blue-500/12 to-indigo-500/18 rounded-full blur-3xl animate-flow-1"></div>
        </div>
        
        {/* Secondary flowing gradient */}
        <div className="absolute bottom-0 right-0 w-full h-full">
          <div className="absolute w-[750px] h-[550px] bg-gradient-to-l from-purple-500/18 via-violet-500/14 to-pink-500/16 rounded-full blur-3xl animate-flow-2"></div>
        </div>
        
        {/* Tertiary flowing gradient */}
        <div className="absolute top-1/2 left-1/2 w-full h-full">
          <div className="absolute w-[650px] h-[450px] bg-gradient-to-br from-emerald-500/12 via-teal-500/8 to-cyan-500/14 rounded-full blur-3xl animate-flow-3" style={{ left: '-325px', top: '-225px' }}></div>
        </div>
        
        {/* Additional reverse flowing gradients */}
        <div className="absolute top-1/4 right-1/3 w-full h-full">
          <div className="absolute w-[500px] h-[300px] bg-gradient-to-tl from-rose-500/10 via-pink-500/8 to-purple-500/12 rounded-full blur-3xl animate-flow-reverse-1"></div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/4 w-full h-full">
          <div className="absolute w-[450px] h-[280px] bg-gradient-to-br from-orange-500/8 via-amber-500/6 to-yellow-500/10 rounded-full blur-3xl animate-flow-reverse-2"></div>
        </div>
        
        {/* Ambient light streams */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[200px] bg-gradient-to-r from-transparent via-blue-400/6 to-transparent rounded-full blur-2xl animate-drift-1"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[150px] bg-gradient-to-l from-transparent via-purple-400/6 to-transparent rounded-full blur-2xl animate-drift-2"></div>
          <div className="absolute top-2/3 right-2/3 w-[300px] h-[120px] bg-gradient-to-br from-transparent via-cyan-400/5 to-transparent rounded-full blur-2xl animate-drift-3"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 elegant-underline">
            Let's
            <span className="artistic-accent"> Connect</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-serif">
            I'm always open to discussing new opportunities, projects, or just having a chat about technology
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {contactInfo.map((info, index) => (
              <div
                key={info.label}
                className={`group vintage-frame rounded-3xl p-8 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover-glow-artistic ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${info.color} text-white mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  {info.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-white mb-2">{info.label}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-400 hover:text-white transition-colors duration-300 font-medium font-serif"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-gray-400 font-medium font-serif">{info.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '600ms' }}>
            <h3 className="text-2xl font-display font-bold text-white mb-8 elegant-underline">Connect With Me</h3>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.url}
                  className={`p-4 glass-artistic border border-purple-500/20 rounded-2xl text-gray-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color} hover:border-purple-500/40`}
                  aria-label={social.label}
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className={`text-center mt-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '1000ms' }}>
            <div className="vintage-frame rounded-3xl p-12 hover-glow-artistic">
              <h3 className="text-3xl font-display font-bold text-white mb-4 elegant-underline">Ready to Start Your Next Project?</h3>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto font-serif">
                Let's turn your ideas into reality. I'm available for freelance work and full-time opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:ryan.zhou@email.com"
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  Email Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;