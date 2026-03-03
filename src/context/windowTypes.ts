export type WindowId = 'terminal' | 'about' | 'skills' | 'education' | 'experience' | 'projects' | 'contact' | 'resume';

export interface WindowConfig {
  id: WindowId;
  title: string;
  defaultWidth: number;
  defaultHeight: number;
  icon: string;
}

export interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

export type DesktopAction =
  | { type: 'OPEN_WINDOW';     id: WindowId }
  | { type: 'CLOSE_WINDOW';    id: WindowId }
  | { type: 'MINIMIZE_WINDOW'; id: WindowId }
  | { type: 'RESTORE_WINDOW';  id: WindowId }
  | { type: 'FOCUS_WINDOW';    id: WindowId }
  | { type: 'TOGGLE_WINDOW';   id: WindowId };

export const WINDOW_CONFIGS: WindowConfig[] = [
  { id: 'terminal',   title: 'terminal',       defaultWidth: 700, defaultHeight: 480, icon: '>_'  },
  { id: 'about',      title: 'about.tsx',      defaultWidth: 780, defaultHeight: 600, icon: '{ }' },
  { id: 'skills',     title: 'skills.tsx',     defaultWidth: 700, defaultHeight: 520, icon: 'fn'  },
  { id: 'education',  title: 'education.tsx',  defaultWidth: 740, defaultHeight: 560, icon: '[]'  },
  { id: 'experience', title: 'experience.tsx', defaultWidth: 740, defaultHeight: 560, icon: '//'  },
  { id: 'projects',   title: 'projects.tsx',   defaultWidth: 920, defaultHeight: 620, icon: '<>'  },
  { id: 'contact',    title: 'contact.tsx',    defaultWidth: 680, defaultHeight: 520, icon: '@'   },
  { id: 'resume',     title: 'resume.pdf',     defaultWidth: 800, defaultHeight: 640, icon: 'PDF' },
];
