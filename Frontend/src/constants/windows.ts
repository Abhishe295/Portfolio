import type { WindowId } from '../lib/useSystemStore';

export interface WindowDef {
  id: WindowId;
  title: string;
  tooltip: string;
  path: string;
  width: number;
  height: number;
}

// Single registry: add a window here and it automatically shows up in the
// Dock and gets a real, shareable route. No duplicated wiring elsewhere.
export const WINDOW_DEFS: WindowDef[] = [
  { id: 'identity', title: 'about-me.app', tooltip: 'About Me', path: '/identity', width: 750, height: 600 },
  { id: 'projects', title: 'projects.app', tooltip: 'Projects', path: '/projects', width: 860, height: 560 },
  { id: 'askme', title: 'ask-me.app', tooltip: 'Ask Me', path: '/askme', width: 560, height: 620 },
  { id: 'timeline', title: 'focus.app', tooltip: 'Focus', path: '/timeline', width: 620, height: 480 },
  { id: 'terminal', title: 'terminal', tooltip: 'Terminal', path: '/terminal', width: 680, height: 460 },
  { id: 'contact', title: 'contact.app', tooltip: 'Contact', path: '/contact', width: 520, height: 440 },
];

export const WINDOW_MAP: Record<WindowId, WindowDef> = WINDOW_DEFS.reduce(
  (acc, w) => ({ ...acc, [w.id]: w }),
  {} as Record<WindowId, WindowDef>
);
