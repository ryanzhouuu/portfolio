'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { WindowConfig, WindowState, useDesktop } from '@/context/DesktopContext';

interface Props {
  config: WindowConfig;
  state: WindowState;
  staggerIndex: number;
  children: React.ReactNode;
}

// Stagger offsets so windows don't all open at the exact same position
const STAGGER_OFFSETS = [
  { x: 0,   y: 0   },
  { x: -80, y: -40 },
  { x: 40,  y: 40  },
  { x: 60,  y: -60 },
  { x: -40, y: 60  },
  { x: 80,  y: 20  },
];

export default function Window({ config, state, staggerIndex, children }: Props) {
  const { dispatch } = useDesktop();
  const { id, defaultWidth, defaultHeight, title } = config;
  const { isOpen, isMinimized, zIndex } = state;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const constraintsRef = useRef({ left: 0, right: 0, top: 0, bottom: 0 });

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const stagger = STAGGER_OFFSETS[staggerIndex % STAGGER_OFFSETS.length];
    const defaultX = Math.round((vw - defaultWidth) / 2) + stagger.x;
    const defaultY = Math.round((vh - defaultHeight) / 2) + stagger.y;

    x.set(defaultX);
    y.set(defaultY);

    constraintsRef.current = {
      left:   -defaultX,
      right:  vw - defaultX - defaultWidth,
      top:    40 - defaultY,       // below menu bar
      bottom: vh - 64 - defaultY - defaultHeight, // above dock
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultWidth, defaultHeight, staggerIndex]);

  const variant = !isOpen
    ? 'closed'
    : isMinimized
    ? 'minimized'
    : 'open';

  const variants = {
    open:      { opacity: 1, scale: 1,    y: 0,   pointerEvents: 'auto'  as const },
    closed:    { opacity: 0, scale: 0.95, y: 0,   pointerEvents: 'none'  as const },
    minimized: { opacity: 0, scale: 0.4,  y: 200, pointerEvents: 'none'  as const },
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={constraintsRef.current}
      dragListener={true}
      style={{
        x,
        y,
        zIndex,
        width: defaultWidth,
        height: defaultHeight,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      animate={variant}
      variants={variants}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      onPointerDown={() => dispatch({ type: 'FOCUS_WINDOW', id })}
      className="flex flex-col window-shadow rounded-sm overflow-hidden border border-border bg-bg select-none"
    >
      {/* Title bar */}
      <WindowTitleBar
        title={title}
        onClose={() => dispatch({ type: 'CLOSE_WINDOW', id })}
        onMinimize={() => dispatch({ type: 'MINIMIZE_WINDOW', id })}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto" onPointerDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </motion.div>
  );
}

function WindowTitleBar({
  title,
  onClose,
  onMinimize,
}: {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
}) {
  return (
    <div
      className="h-10 flex items-center px-3 bg-subtle border-b border-border cursor-grab active:cursor-grabbing flex-shrink-0 relative"
    >
      {/* Traffic lights */}
      <div className="flex items-center gap-1.5 z-10" onPointerDown={(e) => e.stopPropagation()}>
        <TrafficDot color="#ff5f57" onClick={onClose} label="×" />
        <TrafficDot color="#febc2e" onClick={onMinimize} label="–" />
        <TrafficDot color="#28c840" onClick={() => {}} label="+" />
      </div>

      {/* Centered title */}
      <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted pointer-events-none">
        {title}
      </span>
    </div>
  );
}

function TrafficDot({
  color,
  onClick,
  label,
}: {
  color: string;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-3 h-3 rounded-full flex items-center justify-center group transition-opacity hover:opacity-80"
      style={{ backgroundColor: color }}
      aria-label={label}
    >
      <span className="opacity-0 group-hover:opacity-100 text-black/50 text-[8px] leading-none font-bold transition-opacity">
        {label}
      </span>
    </button>
  );
}
