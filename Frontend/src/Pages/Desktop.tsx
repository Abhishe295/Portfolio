import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSystemStore } from '../lib/useSystemStore';
import type { WindowId } from '../lib/useSystemStore';
import { WINDOW_MAP } from '../constants/windows';
import DesktopBackground from '../Components/DesktopBackground';
import TopBar from '../Components/TopBar';
import Dock from '../Components/Dock';
import Window from '../Components/Window';
import IdentityWindow from '../Components/windows/IdentityWindow';
import ProjectsWindow from '../Components/windows/ProjectsWindow';
import LabWindow from '../Components/windows/LabWindow';
import TimelineWindow from '../Components/windows/TimelineWindow';
import TerminalWindow from '../Components/windows/TerminalWindow';
import ContactWindow from '../Components/windows/ContactWindow';

const CONTENT: Record<WindowId, React.ComponentType> = {
  identity: IdentityWindow,
  projects: ProjectsWindow,
  lab: LabWindow,
  timeline: TimelineWindow,
  terminal: TerminalWindow,
  contact: ContactWindow,
};

const TOP_SAFE = 76; // clears the top bar
const BOTTOM_SAFE = 112; // clears the dock

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

// Deterministic cascade so newly opened windows don't stack exactly on top
// of one another.
const CASCADE_STEP = 30;
const ORDER: Record<WindowId, number> = {
  identity: 0,
  projects: 1,
  lab: 2,
  timeline: 3,
  terminal: 4,
  contact: 5,
};

export default function Desktop() {
  const boundsRef = useRef<HTMLDivElement>(null);
  const windows = useSystemStore((s) => s.windows);
  const visible = windows.filter((w) => !w.minimized);

  return (
    <div ref={boundsRef} className="relative h-full w-full overflow-hidden">
      <DesktopBackground />
      <TopBar />

      {visible.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center select-none px-4">
            <div
              className="text-4xl md:text-7xl font-bold tracking-[0.06em] text-white/90"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ABHISHEK KUMAR PUNDIR
            </div>
            <div className="mt-3 text-xs md:text-sm tracking-[0.3em] text-primary/70 font-mono uppercase">
              Software Engineer
            </div>
            <div className="mt-1.5 text-[11px] md:text-xs text-white/40 font-mono max-w-xs mx-auto leading-relaxed">
              Building AI-powered applications and production-ready web systems.
            </div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-8 text-[11px] tracking-[0.15em] text-white/40 font-mono"
            >
              ↓ click an icon below to get started
            </motion.div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {visible
          .slice()
          // Rank by store z ascending, then map to a z-index that's always
          // between the TopBar (400) and the Dock (500), no matter how big
          // the store's internal counter grows over a long session.
          .sort((a, b) => a.z - b.z)
          .map((w, rank) => {
            const def = WINDOW_MAP[w.id];
            const Content = CONTENT[w.id];
            // Plain, synchronous arithmetic using the live viewport size -
            // computed fresh on every render, right here, so there's no
            // separate state/effect layer that can ever fall out of sync
            // with what's actually on screen.
            const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
            const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
            const baseX = clamp((vw - def.width) / 2, 16, vw - def.width - 16);
            const baseY = clamp((vh - def.height) / 2, TOP_SAFE, vh - def.height - BOTTOM_SAFE);
            const i = ORDER[w.id];
            const x = clamp(baseX + i * CASCADE_STEP - CASCADE_STEP * 2, 16, vw - def.width - 16);
            const y = clamp(
              baseY + i * CASCADE_STEP - CASCADE_STEP,
              TOP_SAFE,
              vh - def.height - BOTTOM_SAFE
            );
            return (
              <Window
                key={w.id}
                id={w.id}
                title={def.title}
                width={def.width}
                height={def.height}
                z={401 + rank}
                offset={{ x, y }}
                boundsRef={boundsRef}
              >
                <Content />
              </Window>
            );
          })}
      </AnimatePresence>

      <Dock />
    </div>
  );
}