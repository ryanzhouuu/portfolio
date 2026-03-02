'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { WindowId, WindowConfig, WindowState, DesktopAction, WINDOW_CONFIGS } from './windowTypes';

export type { WindowId, WindowConfig, WindowState, DesktopAction };
export { WINDOW_CONFIGS };

const BASE_Z = 10;

function focusWindowInState(windows: WindowState[], targetId: WindowId): WindowState[] {
  const others = windows.filter((w) => w.id !== targetId);
  const target = windows.find((w) => w.id === targetId)!;
  return [...others, target].map((w, i) => ({ ...w, zIndex: BASE_Z + i }));
}

function reducer(state: WindowState[], action: DesktopAction): WindowState[] {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const updated = state.map((w) =>
        w.id === action.id ? { ...w, isOpen: true, isMinimized: false } : w
      );
      return focusWindowInState(updated, action.id);
    }
    case 'CLOSE_WINDOW':
      return state.map((w) =>
        w.id === action.id ? { ...w, isOpen: false, isMinimized: false } : w
      );
    case 'MINIMIZE_WINDOW':
      return state.map((w) =>
        w.id === action.id ? { ...w, isMinimized: true } : w
      );
    case 'RESTORE_WINDOW': {
      const updated = state.map((w) =>
        w.id === action.id ? { ...w, isMinimized: false } : w
      );
      return focusWindowInState(updated, action.id);
    }
    case 'FOCUS_WINDOW':
      return focusWindowInState(state, action.id);
    case 'TOGGLE_WINDOW': {
      const win = state.find((w) => w.id === action.id)!;
      if (!win.isOpen) {
        const updated = state.map((w) =>
          w.id === action.id ? { ...w, isOpen: true, isMinimized: false } : w
        );
        return focusWindowInState(updated, action.id);
      }
      if (win.isMinimized) {
        const updated = state.map((w) =>
          w.id === action.id ? { ...w, isMinimized: false } : w
        );
        return focusWindowInState(updated, action.id);
      }
      return state.map((w) =>
        w.id === action.id ? { ...w, isMinimized: true } : w
      );
    }
    default:
      return state;
  }
}

const rawInitial: WindowState[] = WINDOW_CONFIGS.map((config, i) => ({
  id: config.id,
  isOpen: config.id === 'terminal',
  isMinimized: false,
  zIndex: BASE_Z + i,
}));
const initialState = focusWindowInState(rawInitial, 'terminal');

interface DesktopContextValue {
  windows: WindowState[];
  dispatch: React.Dispatch<DesktopAction>;
}

const DesktopContext = createContext<DesktopContextValue | null>(null);

export function DesktopProvider({ children }: { children: React.ReactNode }) {
  const [windows, dispatch] = useReducer(reducer, initialState);
  return (
    <DesktopContext.Provider value={{ windows, dispatch }}>
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error('useDesktop must be used inside DesktopProvider');
  return ctx;
}
