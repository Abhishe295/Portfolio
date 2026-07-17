import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Rocket, BrainCircuit, Milestone, TerminalSquare, AtSign } from 'lucide-react';
import { useSystemStore } from '../lib/useSystemStore';
import DesktopBackground from './DesktopBackground';

// Same icon set as the Dock, in the same order - loading this screen looks
// like a preview of the desktop it's about to hand off to, rather than an
// unrelated hacker-terminal skit.
const MODULES = [
  { icon: User, label: 'Identity' },
  { icon: Rocket, label: 'Projects' },
  { icon: BrainCircuit, label: 'AI Lab' },
  { icon: Milestone, label: 'Focus' },
  { icon: TerminalSquare, label: 'Terminal' },
  { icon: AtSign, label: 'Contact' },
];

export default function BootSequence() {
  const { setBootState } = useSystemStore();
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval );
          setShowButton(true);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 7) + 3, 100);
      });
    }, 130);

    return () => clearInterval(progressInterval);
  }, []);

  const handleLaunch = () => setBootState('active');
  const loadedModules = Math.round((progress / 100) * MODULES.length);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 font-mono select-none">
      {/* Same starfield the desktop uses, so the handoff feels continuous
          instead of jumping between two unrelated visual languages. */}
      <DesktopBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 w-full max-w-md rounded-xl overflow-hidden border border-primary/25 bg-[#0a0f16]/92 backdrop-blur-xl shadow-[0_10px_60px_-10px_rgba(56,192,228,0.3)]"
      >
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-primary/15 bg-white/[0.03]">
          <div className="flex items-center gap-1.5">
            <span className="block w-3 h-3 rounded-full bg-red-500/60" />
            <span className="block w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="block w-3 h-3 rounded-full bg-primary/40" />
          </div>
          <span className="mx-auto text-[11px] tracking-wider text-white/50 font-mono">system.boot</span>
          <span className="w-[42px] shrink-0" />
        </div>

        <div className="px-7 py-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center text-2xl font-bold text-primary bg-primary/5 shadow-[0_0_25px_rgba(56,192,228,0.3)]">
            AK
          </div>

          <div
            className="mt-4 text-2xl md:text-3xl font-bold tracking-[0.06em] text-white/90"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            ABHISHEK
          </div>
          <div className="mt-1.5 text-[11px] tracking-[0.25em] text-primary/70 font-mono uppercase">
            Software Engineer
          </div>
          <p className="mt-1 text-[11px] text-white/40 max-w-xs leading-relaxed">
            Building AI-powered applications and production-ready web systems.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            {MODULES.map((m, i) => {
              const active = i < loadedModules;
              const Icon = m.icon;
              return (
                <div key={m.label} className="flex flex-col items-center gap-1.5">
                  <motion.span
                    animate={{ scale: active ? 1 : 0.92, opacity: active ? 1 : 0.35 }}
                    transition={{ duration: 0.25 }}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-200 ${
                      active
                        ? 'border-primary/50 text-primary bg-primary/10 shadow-[0_0_14px_rgba(56,192,228,0.4)]'
                        : 'border-white/10 text-white/25 bg-white/[0.02]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.span>
                  <span className={`text-[8px] tracking-wide ${active ? 'text-primary/70' : 'text-white/20'}`}>
                    {m.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 w-full">
            <div className="flex justify-between text-[10px] mb-1.5">
              <span className="text-primary/60 tracking-wider">BOOTING WORKSPACE</span>
              <span className="text-primary">{Math.min(progress, 100)}%</span>
            </div>
            <div className="h-2 bg-primary/10 border border-primary/25 p-[2px] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary shadow-[0_0_8px_rgba(56,192,228,0.6)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>
          </div>

          <div className="h-14 flex items-center justify-center mt-5">
            <AnimatePresence>
              {showButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleLaunch}
                  className="px-7 py-2.5 bg-primary text-[#05080c] font-black tracking-widest text-xs rounded-lg border border-white/20 shadow-[0_0_20px_rgba(56,192,228,0.5)] cursor-pointer hover:shadow-[0_0_30px_rgba(56,192,228,0.8)] transition-all duration-300"
                >
                  ENTER DESKTOP
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
