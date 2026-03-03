'use client';

import { useDesktop, WINDOW_CONFIGS } from '@/context/DesktopContext';
import Window from './Window';
import TerminalWindow from '@/components/terminal/TerminalWindow';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function WindowManager() {
  const { windows } = useDesktop();

  return (
    <>
      {WINDOW_CONFIGS.map((config, index) => {
        const state = windows.find((w) => w.id === config.id)!;
        return (
          <Window key={config.id} config={config} state={state} staggerIndex={index}>
            {config.id === 'terminal'   && <TerminalWindow />}
            {config.id === 'about'      && <About inView={true} compact={true} />}
            {config.id === 'skills'     && <Skills inView={true} compact={true} />}
            {config.id === 'education'  && <Education inView={true} compact={true} />}
            {config.id === 'experience' && <Experience inView={true} compact={true} />}
            {config.id === 'projects'   && <Projects inView={true} compact={true} />}
            {config.id === 'contact'    && <Contact inView={true} compact={true} />}
            {config.id === 'resume'     && (
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-subtle flex-shrink-0">
                  <span className="font-mono text-xs text-muted">resume.pdf</span>
                  <a
                    href="/resume.pdf"
                    download
                    className="font-mono text-xs text-muted hover:text-ink transition-colors underline-draw"
                  >
                    download
                  </a>
                </div>
                <iframe src="/resume.pdf" className="flex-1 w-full border-0" title="Resume" />
              </div>
            )}
          </Window>
        );
      })}
    </>
  );
}
