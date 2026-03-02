'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MenuBar from './MenuBar';
import DesktopBackground from './DesktopBackground';
import Dock from './Dock';
import WindowManager from '@/components/window/WindowManager';
import BootScreen from '@/components/boot/BootScreen';

export default function DesktopShell() {
  const [booted, setBooted] = useState(false);
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alreadyBooted = localStorage.getItem('portfolio-booted');
      if (alreadyBooted) {
        setShowBoot(false);
        setBooted(true);
      }
    }
  }, []);

  const handleBootComplete = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-booted', '1');
    }
    setBooted(true);
    setTimeout(() => setShowBoot(false), 400);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-bg">
      <AnimatePresence>
        {showBoot && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-[100]"
          >
            <BootScreen onComplete={handleBootComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {booted && (
        <>
          <MenuBar />
          <DesktopBackground />
          <div className="absolute inset-0 pointer-events-none" style={{ top: '40px', bottom: '64px' }}>
            <WindowManager />
          </div>
          <Dock />
        </>
      )}
    </div>
  );
}
