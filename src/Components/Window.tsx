import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useDragControls, useMotionValue, useAnimate } from 'framer-motion';
import { useSystemStore } from '../lib/useSystemStore';
import type { WindowId } from '../lib/useSystemStore';

interface WindowProps {
  id: WindowId;
  title: string;
  width: number;
  height: number;
  z: number;
  offset: { x: number; y: number };
  boundsRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

const EASE = [0.4, 0, 0.2, 1] as const;
const GENIE_DURATION = 0.32;

function TrafficLight({
  color,
  onClick,
  label,
  ariaLabel,
}: {
  color: string;
  onClick?: () => void;
  label: string;
  ariaLabel: string;
}) {
  return (
    <span className="group/dot relative">
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onClick}
        className={`block w-3 h-3 rounded-full ${color} transition-transform hover:scale-110`}
        aria-label={ariaLabel}
      />
        <span className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-primary/20 bg-[#0a0f16]/95 px-1.5 py-0.5 text-[9px] text-white/80 font-mono opacity-0 scale-95 transition-all duration-150 group-hover/dot:opacity-100 group-hover/dot:scale-100 z-10">
        {label}
      </span>
    </span>
  );
}

export default function Window({ id, title, width, height, z, offset, boundsRef, children }: WindowProps) {
  const closeWindow = useSystemStore((s) => s.closeWindow);
  const minimizeWindow = useSystemStore((s) => s.minimizeWindow);
  const focusWindow = useSystemStore((s) => s.focusWindow);
  const dragControls = useDragControls();

  const [scope, animate] = useAnimate();
  // `offset` is computed by Desktop synchronously in its render (plain
  // window.innerWidth/innerHeight arithmetic, no state/effect involved),
  // so by the time this component is constructed it's already correct -
  // no measuring, no mount-time animation-to-a-target needed. This used
  // to fly the window in from its Dock icon instead, which needed to
  // measure the dock icon's position in a useLayoutEffect and animate
  // toward a target - two moving parts for what's really a one-line fact
  // (where the window should end up). That was the actual source of the
  // "opens in the wrong place" bug: an extra layer that could get out of
  // sync. Just starting the motion values at the right place removes the
  // whole class of bug.
  const x = useMotionValue(offset.x);
  const y = useMotionValue(offset.y);
  const [minimizing, setMinimizing] = useState(false);

  // Set width/height imperatively, ONE time, directly on the DOM node -
  // NOT through React's style prop. If width/height were passed through
  // the reactive style object, every re-render (which happens often -
  // focusing a window, dock updates, etc.) would reset the size back to
  // its original value and silently undo the user's native resize-handle
  // drag.
  useLayoutEffect(() => {
    if (scope.current) {
      scope.current.style.width = `${width}px`;
      scope.current.style.height = `${height}px`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Native CSS `resize` is unreliable here: it fights with the transform-
  // based (x/y motion value) positioning and, worse, its little drag corner
  // was getting clipped by our own `overflow-hidden` + rounded corners, so
  // it was effectively unclickable. A manual pointer-driven handle sidesteps
  // both problems and writes straight to the DOM node, same as the
  // one-time width/height set above, so React re-renders never stomp it.
  const resizingRef = useRef(false);
  const handleResizePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const node = scope.current;
    if (!node) return;

    focusWindow(id);
    const startWidth = node.offsetWidth;
    const startHeight = node.offsetHeight;
    const startX = e.clientX;
    const startY = e.clientY;
    resizingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const maxW = boundsRef.current ? boundsRef.current.clientWidth * 0.92 : Infinity;
    const maxH = boundsRef.current ? boundsRef.current.clientHeight * 0.78 : Infinity;

    const onMove = (ev: PointerEvent) => {
      if (!resizingRef.current) return;
      const newW = Math.min(Math.max(startWidth + (ev.clientX - startX), 280), maxW);
      const newH = Math.min(Math.max(startHeight + (ev.clientY - startY), 200), maxH);
      node.style.width = `${newW}px`;
      node.style.height = `${newH}px`;
    };
    const onUp = () => {
      resizingRef.current = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const handleMinimize = async () => {
    const dockEl = document.getElementById(`dock-icon-${id}`);
    setMinimizing(true);

    if (dockEl && scope.current) {
      const dockRect = dockEl.getBoundingClientRect();
      const winRect = scope.current.getBoundingClientRect();
      const deltaX = dockRect.left + dockRect.width / 2 - (winRect.left + winRect.width / 2);
      const deltaY = dockRect.top + dockRect.height / 2 - (winRect.top + winRect.height / 2);

      await Promise.all([
        animate(x, x.get() + deltaX, { duration: GENIE_DURATION, ease: EASE }),
        animate(y, y.get() + deltaY, { duration: GENIE_DURATION, ease: EASE }),
        animate(scope.current, { scale: 0.05, opacity: 0 }, { duration: GENIE_DURATION, ease: EASE }),
      ]);
    }

    minimizeWindow(id);
  };

  return (
    <motion.div
      ref={scope}
      drag={!minimizing}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={boundsRef}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      onPointerDownCapture={() => focusWindow(id)}
      style={{
        x,
        y,
        position: 'absolute',
        top: 0,
        left: 0,
        maxWidth: '92vw',
        maxHeight: '78vh',
        minWidth: 280,
        minHeight: 200,
        zIndex: z,
      }}
      className="flex flex-col rounded-xl overflow-hidden border border-primary/25 bg-[#0a0f16]/92 backdrop-blur-xl shadow-[0_10px_50px_-10px_rgba(56,192,228,0.25)]"
    >
      {/* Title bar (drag handle) */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="flex items-center gap-2 px-3 py-2.5 border-b border-primary/15 bg-white/[0.03] cursor-grab active:cursor-grabbing select-none shrink-0"
      >
        <div className="flex items-center gap-1.5">
          <TrafficLight
            color="bg-red-500/80 hover:bg-red-500"
            onClick={() => closeWindow(id)}
            label="Close"
            ariaLabel={`Close ${title}`}
          />
          <TrafficLight
            color="bg-yellow-500/80 hover:bg-yellow-500"
            onClick={handleMinimize}
            label="Minimize"
            ariaLabel={`Minimize ${title}`}
          />
          <TrafficLight
            color="bg-primary/50 hover:bg-primary/70"
            label="Does nothing. Purely decorative."
            ariaLabel="This button is decorative"
          />
        </div>
        <span className="mx-auto text-[11px] tracking-wider text-white/50 font-mono truncate">{title}</span>
        <span className="w-[42px] shrink-0" />
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">{children}</div>

      {/* Resize handle */}
      <div
        onPointerDown={handleResizePointerDown}
        className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize touch-none flex items-end justify-end p-1 text-primary/30 hover:text-primary/70 transition-colors"
        aria-label={`Resize ${title}`}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M7 1L1 7M7 4.5L4.5 7M7 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  );
}