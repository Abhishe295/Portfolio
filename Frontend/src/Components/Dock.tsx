import React from 'react';
import { useNavigate } from 'react-router';
import { User, Rocket, Flower2, Milestone, TerminalSquare, AtSign } from 'lucide-react';
import { useSystemStore } from '../lib/useSystemStore';
import { WINDOW_DEFS } from '../constants/windows';
import type { WindowId } from '../lib/useSystemStore';

const ICONS: Record<WindowId, React.ComponentType<{ className?: string }>> = {
  identity: User,
  projects: Rocket,
  askme: Flower2,
  timeline: Milestone,
  terminal: TerminalSquare,
  contact: AtSign,
};

export default function Dock() {
  const navigate = useNavigate();
  const windows = useSystemStore((s) => s.windows);
  const openWindow = useSystemStore((s) => s.openWindow);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[500] flex items-end gap-2 px-3 py-2 rounded-2xl border border-primary/20 bg-[#0a0f16]/85 backdrop-blur-xl shadow-[0_0_30px_rgba(56,192,228,0.15)]">
      {WINDOW_DEFS.map((w) => {
        const Icon = ICONS[w.id];
        const isOpen = windows.some((win) => win.id === w.id && !win.minimized);
        return (
          <button
            key={w.id}
            id={`dock-icon-${w.id}`}
            onClick={() => {
              navigate(w.path);
              openWindow(w.id);
            }}
            className="group relative flex flex-col items-center gap-1 px-1"
            aria-label={w.tooltip}
          >
            {/* Tooltip */}
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-primary/20 bg-[#0a0f16]/95 px-2 py-1 text-[10px] text-white/80 font-mono opacity-0 scale-95 transition-all duration-150 group-hover:opacity-100 group-hover:scale-100">
              {w.tooltip}
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-white/[0.03] text-primary/80 transition-all duration-150 group-hover:scale-110 group-hover:text-primary group-hover:shadow-[0_0_18px_rgba(56,192,228,0.45)] group-hover:-translate-y-1.5">
              <Icon className="w-5 h-5" />
            </span>
            <span
              className={`h-1 w-1 rounded-full transition-opacity ${
                isOpen ? 'bg-primary opacity-100' : 'opacity-0'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
