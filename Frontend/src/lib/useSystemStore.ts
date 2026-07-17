import { create } from 'zustand';

export type BootStateType = 'loading' | 'ready' | 'active';
export type WindowId = 'identity' | 'projects' | 'lab' | 'timeline' | 'terminal' | 'contact';

export interface OpenWindow {
  id: WindowId;
  z: number;
  minimized: boolean;
}

interface SystemState {
  // Boot sequence
  bootState: BootStateType;
  setBootState: (s: BootStateType) => void;

  // Window manager
  windows: OpenWindow[];
  topZ: number;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  isWindowOpen: (id: WindowId) => boolean;

  // Project detail focus (inside the Projects window)
  focusedProjectSlug: string | null;
  setFocusedProjectSlug: (slug: string | null) => void;

  // Terminal command history (persists across close/reopen)
  terminalHistory: string[];
  addTerminalHistory: (cmd: string) => void;
}

export const useSystemStore = create<SystemState>((set, get) => ({
  bootState: 'loading',
  setBootState: (bootState) => set({ bootState }),

  windows: [],
  // TopBar sits at z-[400] and the Dock at z-[500] (both fixed, outside the
  // normal window stacking). Windows should sit ABOVE the TopBar but BELOW
  // the Dock, so the Dock always stays clickable/on top like a real OS dock,
  // while windows still render above the chrome instead of underneath it.
  // Desktop.tsx clamps the actual rendered z-index into the 401-499 band by
  // rank, so this internal counter can grow indefinitely without ever
  // approaching the Dock's z-500.
  topZ: 401,

  openWindow: (id) =>
    set((state) => {
      const topZ = state.topZ + 1;
      const exists = state.windows.find((w) => w.id === id);
      if (exists) {
        return {
          topZ,
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, z: topZ, minimized: false } : w
          ),
        };
      }
      return { topZ, windows: [...state.windows, { id, z: topZ, minimized: false }] };
    }),

  closeWindow: (id) =>
    set((state) => ({ windows: state.windows.filter((w) => w.id !== id) })),

  focusWindow: (id) =>
    set((state) => {
      const topZ = state.topZ + 1;
      return { topZ, windows: state.windows.map((w) => (w.id === id ? { ...w, z: topZ } : w)) };
    }),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    })),

  isWindowOpen: (id) => get().windows.some((w) => w.id === id && !w.minimized),

  focusedProjectSlug: null,
  setFocusedProjectSlug: (focusedProjectSlug) => set({ focusedProjectSlug }),

  terminalHistory: [],
  addTerminalHistory: (cmd) =>
    set((state) => ({ terminalHistory: [...state.terminalHistory, cmd] })),
}));