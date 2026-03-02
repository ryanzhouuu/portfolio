'use client';

import { useEffect, useRef, useState } from 'react';
import { useDesktop, WINDOW_CONFIGS } from '@/context/DesktopContext';

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

interface MenuItem {
  label: string;
  action: () => void;
  divider?: false;
}
interface Divider {
  divider: true;
}
type MenuEntry = MenuItem | Divider;

export default function MenuBar() {
  const time = useClock();
  const { windows, dispatch } = useDesktop();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  const openWindows = windows.filter((w) => w.isOpen);
  const minimizedWindows = windows.filter((w) => w.isOpen && w.isMinimized);

  const menus: Record<string, MenuEntry[]> = {
    File: [
      {
        label: 'New Terminal',
        action: () => {
          dispatch({ type: 'OPEN_WINDOW', id: 'terminal' });
          setOpenMenu(null);
        },
      },
      { divider: true },
      {
        label: 'Close All Windows',
        action: () => {
          WINDOW_CONFIGS.forEach((c) => dispatch({ type: 'CLOSE_WINDOW', id: c.id }));
          setOpenMenu(null);
        },
      },
    ],
    View: [
      {
        label: 'Minimize All',
        action: () => {
          openWindows.forEach((w) => dispatch({ type: 'MINIMIZE_WINDOW', id: w.id }));
          setOpenMenu(null);
        },
      },
      {
        label: 'Restore All',
        action: () => {
          minimizedWindows.forEach((w) => dispatch({ type: 'RESTORE_WINDOW', id: w.id }));
          setOpenMenu(null);
        },
      },
    ],
    Window: WINDOW_CONFIGS.map((c) => {
      const state = windows.find((w) => w.id === c.id)!;
      const suffix = !state.isOpen ? '' : state.isMinimized ? '  –' : '  ✓';
      return {
        label: `${c.title}${suffix}`,
        action: () => {
          dispatch({ type: 'TOGGLE_WINDOW', id: c.id });
          setOpenMenu(null);
        },
      };
    }),
  };

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-10 z-50 flex items-center justify-between px-4 bg-bg/80 backdrop-blur-sm border-b border-border"
    >
      {/* Left */}
      <div className="flex items-center gap-5">
        <span className="font-mono text-xs font-semibold text-ink select-none">
          ryan.portfolio
        </span>

        <div className="flex items-center gap-1 relative">
          {Object.entries(menus).map(([name, items]) => (
            <div key={name} className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === name ? null : name)}
                className={`font-mono text-xs px-2 py-1 rounded transition-colors ${
                  openMenu === name
                    ? 'bg-ink text-bg'
                    : 'text-muted/70 hover:text-ink hover:bg-ink/5'
                }`}
              >
                {name}
              </button>

              {openMenu === name && (
                <div className="absolute top-full left-0 mt-1 min-w-[180px] bg-bg border border-border shadow-lg py-1 z-50">
                  {items.map((entry, i) =>
                    'divider' in entry ? (
                      <div key={i} className="my-1 border-t border-border" />
                    ) : (
                      <button
                        key={i}
                        onClick={entry.action}
                        className="w-full text-left px-4 py-1.5 font-mono text-xs text-ink/80 hover:bg-subtle hover:text-ink transition-colors"
                      >
                        {entry.label}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right — clock only */}
      <span className="font-mono text-xs text-muted/70">{time}</span>
    </div>
  );
}
