"use client";

import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/data";

type Indicator = { left: number; width: number } | null;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [indicator, setIndicator] = useState<Indicator>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The section crossing the middle of the viewport is the active one.
  useEffect(() => {
    const ids = ["top", ...navItems.map((item) => item.id)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? null : entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const measure = () => {
      const link = active ? linkRefs.current[active] : null;
      setIndicator(link ? { left: link.offsetLeft, width: link.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <header
      data-intro-nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-cinematic ${
        scrolled
          ? "border-b border-metal/60 bg-void/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" className="font-display text-[15px] tracking-[-0.02em] text-chrome" aria-label="Ryan Zhou — home">
          RZ
        </a>

        <ul className="relative hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                ref={(el) => {
                  linkRefs.current[item.id] = el;
                }}
                href={item.path}
                aria-current={active === item.id ? "location" : undefined}
                className={`label-mono transition-colors duration-300 hover:text-chrome ${
                  active === item.id ? "text-chrome" : "text-steel"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <span
            aria-hidden
            className="nav-indicator pointer-events-none absolute -bottom-2 left-0 h-px"
            style={{
              width: indicator?.width ?? 0,
              transform: `translateX(${indicator?.left ?? 0}px)`,
              opacity: indicator ? 1 : 0,
            }}
          />
        </ul>
      </nav>
    </header>
  );
}
