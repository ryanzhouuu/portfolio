'use client';

import { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { navItems, personalInfo } from '@/lib/data';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      {/* Top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-5 h-14">
        <button onClick={() => scrollTo('hero')} className="font-mono text-sm font-semibold text-ink">
          Ryan Zhou
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="text-muted hover:text-ink transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-bg/95 backdrop-blur-sm pt-14">
          <nav className="px-6 py-8">
            <p className="font-mono text-[10px] text-muted/60 tracking-widest uppercase mb-4">
              sections
            </p>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="font-mono text-lg text-ink hover:text-muted transition-colors py-2 block"
                  >
                    /{item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-5 mt-10 pt-8 border-t border-border">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink transition-colors">
                <Github size={18} strokeWidth={1.5} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink transition-colors">
                <Linkedin size={18} strokeWidth={1.5} />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="text-muted hover:text-ink transition-colors">
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
