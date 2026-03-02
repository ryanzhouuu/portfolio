'use client';

import { useDesktop, WINDOW_CONFIGS } from '@/context/DesktopContext';
import { WindowConfig } from '@/context/windowTypes';

export default function DesktopBackground() {
  const { dispatch } = useDesktop();

  return (
    <div className="fixed inset-0 dot-grid" style={{ top: '40px', bottom: '64px' }}>
      {/* Name widget — top left */}
      <div className="absolute top-4 left-8 font-mono select-none pointer-events-none space-y-1">
        <p className="text-sm text-ink/40 font-semibold tracking-tight">Ryan Zhou</p>
        <p className="text-[11px] text-muted/40">CS &amp; Economics @ UT Austin</p>
      </div>

      {/* Desktop icons — top right, two columns */}
      <div className="absolute top-4 right-6 grid grid-cols-2 gap-3">
        {WINDOW_CONFIGS.map((config) => (
          <DesktopIcon
            key={config.id}
            config={config}
            onOpen={() => dispatch({ type: 'OPEN_WINDOW', id: config.id })}
          />
        ))}
      </div>
    </div>
  );
}

function DesktopIcon({ config, onOpen }: { config: WindowConfig; onOpen: () => void }) {
  return (
    <button
      onDoubleClick={onOpen}
      onClick={onOpen}
      className="group flex flex-col items-center gap-1.5 w-20 p-2 rounded hover:bg-ink/5 transition-colors focus:outline-none focus:bg-ink/5"
      title={`Open ${config.title}`}
    >
      <div className="w-12 h-12 border border-border bg-bg/80 flex items-center justify-center font-mono text-sm text-muted group-hover:border-ink/30 group-hover:text-ink transition-colors shadow-sm">
        {config.icon}
      </div>
      <span className="font-mono text-[10px] text-ink/50 group-hover:text-ink/80 transition-colors text-center leading-tight truncate w-full">
        {config.title}
      </span>
    </button>
  );
}
