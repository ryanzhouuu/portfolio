'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';

const DOCK_LINKS = [
  {
    id: 'github',
    label: 'github',
    icon: Github,
    href: personalInfo.github,
  },
  {
    id: 'linkedin',
    label: 'linkedin',
    icon: Linkedin,
    href: personalInfo.linkedin,
  },
  {
    id: 'email',
    label: 'email',
    icon: Mail,
    href: `mailto:${personalInfo.email}`,
  },
  {
    id: 'resume',
    label: 'resume',
    icon: FileText,
    href: withBasePath('/resume.pdf'),
  },
] as const;

export default function Dock() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 z-50 flex items-center justify-center gap-6 bg-bg/80 backdrop-blur-sm border-t border-border">
      {DOCK_LINKS.map(({ id, label, icon: Icon, href }) => (
        <div key={id} className="flex flex-col items-center gap-1">
          <motion.a
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.12, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-10 h-10 flex items-center justify-center border border-border bg-subtle hover:bg-border text-muted hover:text-ink transition-colors"
            title={label}
          >
            <Icon size={16} strokeWidth={1.5} />
          </motion.a>
          <span className="font-mono text-[9px] text-muted/50">{label}</span>
        </div>
      ))}
    </div>
  );
}
