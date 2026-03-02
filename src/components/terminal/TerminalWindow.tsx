'use client';

import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useDesktop } from '@/context/DesktopContext';
import { TerminalLine, parseCommand } from './CommandParser';

const WELCOME_LINES: TerminalLine[] = [
  { id: 'welcome-0', kind: 'system', text: 'Welcome to ryan@portfolio:~' },
  { id: 'welcome-1', kind: 'system', text: "Type 'help' for available commands." },
];

export default function TerminalWindow() {
  const { dispatch } = useDesktop();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Show welcome lines with delays on mount
  useEffect(() => {
    let cancelled = false;
    let i = 0;
    let timerId: ReturnType<typeof setTimeout>;

    function showNext() {
      if (cancelled || i >= WELCOME_LINES.length) return;
      const line = WELCOME_LINES[i];
      setLines((prev) => [...prev, line]);
      i++;
      if (i < WELCOME_LINES.length) {
        timerId = setTimeout(showNext, 200);
      }
    }
    timerId = setTimeout(showNext, 200);

    return () => {
      cancelled = true;
      clearTimeout(timerId);
      setLines([]);
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // Focus input when clicking anywhere in terminal
  function handleTerminalClick() {
    inputRef.current?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[history.length - 1 - newIndex] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput('');
        return;
      }
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(history[history.length - 1 - newIndex] ?? '');
    }
  }

  function handleSubmit() {
    const cmd = input.trim();
    const inputLine: TerminalLine = {
      id: `input-${Date.now()}`,
      kind: 'input',
      text: cmd,
    };

    const result = parseCommand(cmd);

    if (result.sideEffect && 'type' in result.sideEffect && result.sideEffect.type === 'CLEAR_TERMINAL') {
      setLines([]);
      setInput('');
      setHistoryIndex(-1);
      return;
    }

    setLines((prev) => [...prev, inputLine, ...result.lines]);

    if (result.sideEffect && 'action' in result.sideEffect) {
      dispatch(result.sideEffect.action);
    }

    if (cmd) {
      setHistory((prev) => [...prev, cmd]);
    }
    setInput('');
    setHistoryIndex(-1);
  }

  return (
    <div
      className="h-full flex flex-col text-sm"
      style={{ backgroundColor: '#0d0d0d', color: '#e5e5e5', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      onClick={handleTerminalClick}
    >
      {/* Output area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-0.5 terminal-window">
        {lines.map((line) => (
          <div key={line.id} className="leading-5">
            {line.kind === 'input' ? (
              <span>
                <span style={{ color: '#4ade80' }}>ryan@portfolio:~$</span>
                <span style={{ color: '#e5e5e5' }}> {line.text}</span>
              </span>
            ) : line.kind === 'error' ? (
              <span style={{ color: '#f87171' }}>{line.text}</span>
            ) : line.kind === 'success' ? (
              <span style={{ color: '#4ade80' }}>{line.text}</span>
            ) : line.kind === 'system' ? (
              <span style={{ color: '#6b7280' }}>{line.text}</span>
            ) : (
              <span style={{ color: '#e5e5e5' }}>{line.text}</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div
        className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
        style={{ borderTop: '1px solid #333' }}
      >
        <span style={{ color: '#4ade80', whiteSpace: 'nowrap', fontSize: '13px' }}>
          ryan@portfolio:~$
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            handleKeyDown(e);
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          className="flex-1 bg-transparent outline-none border-none text-sm"
          style={{ color: '#e5e5e5', fontFamily: 'inherit', caretColor: '#e5e5e5' }}
          aria-label="Terminal input"
        />
      </div>
    </div>
  );
}
