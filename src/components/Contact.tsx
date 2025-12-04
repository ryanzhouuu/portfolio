import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 text-center ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-8">
            Let's work together.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light mb-12 leading-relaxed">
            I'm currently open to new opportunities. Whether you have a question
            or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="flex flex-col items-center space-y-8">
            <a
              href="mailto:ryanzhouuu@gmail.com"
              className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors duration-300 text-lg"
            >
              Say Hello
            </a>

            <div className="flex items-center space-x-8 mt-12">
              <a
                href="https://github.com/ryanzhouuu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-300"
              >
                <Github size={24} strokeWidth={1.5} />
              </a>
              <a
                href="https://linkedin.com/in/ryanzhouuu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-300"
              >
                <Linkedin size={24} strokeWidth={1.5} />
              </a>
              <a
                href="mailto:ryanzhouuu@gmail.com"
                className="text-gray-500 hover:text-white transition-colors duration-300"
              >
                <Mail size={24} strokeWidth={1.5} />
              </a>
            </div>

            <footer className="mt-20 pt-20 text-gray-600 text-sm font-light">
              © {new Date().getFullYear()} Ryan Zhou. All rights reserved.
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
