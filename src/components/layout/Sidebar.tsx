'use client';

import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { navItems, personalInfo } from '@/lib/data';

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionIds = navItems.map((n) => n.id);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-56 border-r border-border bg-bg z-40">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 border-b border-border">
        <button
          onClick={() => scrollTo('hero')}
          className="text-left group"
        >
          <p className="font-mono text-[11px] text-muted mb-1 tracking-widest uppercase">~/portfolio</p>
          <p className="font-mono text-sm font-semibold text-ink tracking-tight leading-tight group-hover:opacity-70 transition-opacity">
            Ryan Zhou
          </p>
        </button>
      </div>

      {/* Nav tree */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <p className="font-mono text-[10px] text-muted/60 tracking-widest uppercase px-2 mb-3">
          sections
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-sm font-mono text-xs transition-all duration-200 text-left ${
                    isActive
                      ? 'text-ink bg-subtle border-l-2 border-ink pl-[calc(0.5rem-2px)]'
                      : 'text-muted hover:text-ink hover:bg-subtle/60'
                  }`}
                >
                  <span className={`text-[10px] ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                    {isActive ? '▶' : '○'}
                  </span>
                  <span>/{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Social links */}
      <div className="px-6 py-6 border-t border-border">
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-ink transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={15} strokeWidth={1.5} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-ink transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} strokeWidth={1.5} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-muted hover:text-ink transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={15} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </aside>
  );
}
