'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: 'ryan-portfolio v1.0.0',           kind: 'plain'   },
  { text: 'Copyright (c) 2026 Ryan Zhou',    kind: 'plain'   },
  { text: 'Initializing kernel...',           kind: 'plain'   },
  { text: '[ OK ] Started filesystem.',       kind: 'ok'      },
  { text: '[ OK ] Starting desktop environment...', kind: 'ok' },
  { text: '[ OK ] Loading portfolio data.',   kind: 'ok'      },
  { text: 'Welcome, visitor.',                kind: 'plain'   },
];

export default function BootScreen({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    function showNext() {
      i++;
      setVisibleLines(i);
      if (i < BOOT_LINES.length) {
        setTimeout(showNext, 300);
      } else {
        // All lines shown — pause then complete
        setTimeout(() => setDone(true), 600);
      }
    }
    setTimeout(showNext, 300);
  }, []);

  useEffect(() => {
    if (done) onComplete();
  }, [done, onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      <div className="flex-1 p-8 sm:p-12 font-mono text-sm leading-6 overflow-hidden">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {line.kind === 'ok' ? (
              <span>
                <span className="text-green-400">{'[ OK ]'}</span>
                <span className="text-[#e5e5e5]">{line.text.replace('[ OK ]', '')}</span>
              </span>
            ) : (
              <span className="text-[#e5e5e5]">{line.text}</span>
            )}
          </motion.div>
        ))}
        {visibleLines < BOOT_LINES.length && (
          <span className="text-[#e5e5e5] animate-pulse">█</span>
        )}
      </div>

      {/* Skip button */}
      <div className="p-6 flex justify-end">
        <button
          onClick={onComplete}
          className="font-mono text-xs text-[#6b7280] hover:text-[#e5e5e5] transition-colors"
        >
          skip →
        </button>
      </div>
    </div>
  );
}
