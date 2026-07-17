import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useSystemStore } from './lib/useSystemStore';
import BootSequence from './Components/BootSequence';
import Desktop from './Pages/Desktop';

const PATH_TO_WINDOW = {
  '/identity': 'identity',
  '/projects': 'projects',
  '/lab': 'lab',
  '/timeline': 'timeline',
  '/terminal': 'terminal',
  '/contact': 'contact',
};

export default function App() {
  const bootState = useSystemStore((s) => s.bootState);
  const openWindow = useSystemStore((s) => s.openWindow);
  const setFocusedProjectSlug = useSystemStore((s) => s.setFocusedProjectSlug);

  const location = useLocation();

  // Deep-link support only: visiting a URL directly (or using browser
  // back/forward) opens the matching window. This effect only ever
  // *opens* — it never navigates or closes — so it can't loop with the
  // imperative navigate() calls the Dock/window controls use elsewhere.
  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/projects/')) {
      openWindow('projects');
      setFocusedProjectSlug(decodeURIComponent(path.slice('/projects/'.length)));
      return;
    }

    const windowId = PATH_TO_WINDOW[path];
    if (windowId) openWindow(windowId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className="relative h-full w-full select-none">
      {bootState !== 'active' && <BootSequence />}
      {bootState === 'active' && <Desktop />}
    </div>
  );
}
