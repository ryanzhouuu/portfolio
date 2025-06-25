//import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">
                © 2024 Ryan Zhou. All rights reserved.
              </p>
            </div>
            <div className="text-gray-400">
              <p>Built with React, TypeScript & Tailwind CSS</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;