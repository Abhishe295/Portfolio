import React from 'react';
import { motion } from 'framer-motion';

// A quiet decorative backdrop for ask-me.app - matches the "desktop in
// space" theme the rest of the site already has (DesktopBackground's
// starfield), but sits low-opacity and BEHIND the actual UI. It's not the
// centerpiece; it's just there, drifting, so the window doesn't feel empty
// behind the input and answer cards.
interface SpaceshipBackgroundProps {
  active?: boolean; // brighten slightly while a question is in flight
}

export default function SpaceshipBackground({ active = false }: SpaceshipBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute text-primary"
        style={{ top: '18%', right: '8%', width: 190, height: 190 }}
        initial={{ opacity: 0.1, y: 0, rotate: -8 }}
        animate={{
          opacity: active ? 0.22 : 0.1,
          y: [0, -10, 0],
          rotate: [-8, -5, -8],
        }}
        transition={{
          opacity: { duration: 0.6, ease: 'easeInOut' },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
          {/* Hull */}
          <path
            d="M60 8 C78 26 84 54 78 82 L60 96 L42 82 C36 54 42 26 60 8 Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          {/* Window */}
          <circle cx="60" cy="46" r="10" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="60" cy="46" r="4" fill="currentColor" opacity="0.5" />
          {/* Fins */}
          <path d="M42 70 L22 92 L42 86 Z" stroke="currentColor" strokeWidth="1.4" />
          <path d="M78 70 L98 92 L78 86 Z" stroke="currentColor" strokeWidth="1.4" />
          {/* Thruster flame */}
          <motion.path
            d="M52 96 L60 116 L68 96"
            stroke="currentColor"
            strokeWidth="1.4"
            animate={{ opacity: active ? [0.4, 1, 0.4] : [0.25, 0.5, 0.25] }}
            transition={{ duration: active ? 0.5 : 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      {/* A couple of stray stars near it, echoing the main starfield */}
      <span className="absolute rounded-full bg-primary/40" style={{ top: '14%', right: '26%', width: 3, height: 3 }} />
      <span className="absolute rounded-full bg-white/30" style={{ top: '38%', right: '4%', width: 2, height: 2 }} />
      <span className="absolute rounded-full bg-primary/30" style={{ top: '58%', right: '20%', width: 2, height: 2 }} />
    </div>
  );
}