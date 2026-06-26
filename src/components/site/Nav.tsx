'use client';

import { useEffect, useState } from 'react';
import { navItems, personalInfo } from '@/lib/data';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-cinematic ${
        scrolled ? 'border-b border-metal/60 bg-void/70 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="font-display text-[15px] text-chrome"
          style={{ fontVariationSettings: "'wght' 800, 'wdth' 125" }}
          aria-label="Ryan Zhou — home"
        >
          RYAN&nbsp;ZHOU
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.path}
                className="link-underline font-mono text-[11px] uppercase tracking-widest2 text-steel transition-colors duration-300 hover:text-chrome"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${personalInfo.email}`}
          className="link-underline font-mono text-[11px] uppercase tracking-widest2 text-silver transition-colors duration-300 hover:text-chrome"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
