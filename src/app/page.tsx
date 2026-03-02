'use client';

import { useEffect, useState } from 'react';
import { DesktopProvider } from '@/context/DesktopContext';
import DesktopShell from '@/components/desktop/DesktopShell';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function checkViewport() {
      setIsDesktop(window.innerWidth >= 1024);
    }
    checkViewport();
    setMounted(true);
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Prevent body scroll on desktop
  useEffect(() => {
    if (mounted && isDesktop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mounted, isDesktop]);

  // Pre-mount: blank screen (boot screen covers desktop, mobile shows nothing briefly)
  if (!mounted) {
    return <div className="min-h-screen bg-bg" />;
  }

  if (isDesktop) {
    return (
      <DesktopProvider>
        <DesktopShell />
      </DesktopProvider>
    );
  }

  // Mobile: original scroll layout
  return (
    <div className="bg-bg min-h-screen">
      <Sidebar />
      <MobileNav />
      <main className="lg:ml-56 pt-14 lg:pt-0">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
