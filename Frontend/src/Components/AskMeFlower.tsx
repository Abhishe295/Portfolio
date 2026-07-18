import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export type FlowerState = 'idle' | 'focused' | 'searching' | 'bloom';

// One petal, drawn once as a symmetric curve from the center out to a tip
// and back - a continuous line, no fill, in the spirit of modern line-art
// marks (Apple/Nothing OS/Linear style). Every other petal is just this
// same path rotated around the center.
const PETAL_PATH = 'M100,100 C 78,82 70,42 100,12 C 130,42 122,82 100,100 Z';
const PETAL_COUNT = 5;

const EASE = [0.4, 0, 0.2, 1] as const;

const flowerMotion: Record<FlowerState, any> = {
  idle: {
    scale: [1, 1.035, 1],
    rotate: 0,
    transition: {
      scale: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' },
      rotate: { duration: 0.5, ease: EASE },
    },
  },
  focused: {
    scale: 1.06,
    rotate: 6,
    transition: { duration: 0.45, ease: EASE },
  },
  searching: {
    scale: [1.04, 1.09, 1.04],
    rotate: [-3, 3, -3],
    transition: {
      scale: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' },
      rotate: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' },
    },
  },
  bloom: {
    scale: [1.09, 1.24, 1],
    rotate: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

const glowOpacity: Record<FlowerState, number> = {
  idle: 0.35,
  focused: 0.55,
  searching: 0.85,
  bloom: 1,
};

const particleDuration: Record<FlowerState, number> = {
  idle: 7,
  focused: 5,
  searching: 1.6,
  bloom: 1.1,
};

interface FlowerProps {
  state: FlowerState;
  size?: number;
}

export default function AskMeFlower({ state, size = 176 }: FlowerProps) {
  const petals = useMemo(() => Array.from({ length: PETAL_COUNT }, (_, i) => i), []);
  const dur = particleDuration[state];

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glow layer: a soft, blurred duplicate behind the crisp line art.
          Animating opacity/scale here (rather than a `filter` string) is
          what lets framer-motion interpolate it smoothly between states. */}
      <motion.div
        className="absolute inset-0 text-primary"
        style={{ filter: 'blur(18px)' }}
        animate={{ opacity: glowOpacity[state], scale: state === 'bloom' ? 1.15 : 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {petals.map((i) => (
            <path
              key={i}
              d={PETAL_PATH}
              fill="currentColor"
              opacity={0.5}
              transform={`rotate(${(360 / PETAL_COUNT) * i} 100 100)`}
            />
          ))}
        </svg>
      </motion.div>

      {/* Crisp line-art flower */}
      <motion.div className="relative text-primary" animate={flowerMotion[state]} style={{ width: size, height: size }}>
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          {petals.map((i) => {
            const delay = state === 'searching' ? i * 0.12 : 0;
            return (
              <g key={i} transform={`rotate(${(360 / PETAL_COUNT) * i} 100 100)`}>
                <path
                  id={`ask-me-petal-${i}`}
                  d={PETAL_PATH}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  opacity={state === 'searching' || state === 'bloom' ? 1 : 0.75}
                  style={
                    state === 'searching'
                      ? { animation: `ask-me-illuminate 1.1s ease-in-out ${delay}s infinite` }
                      : undefined
                  }
                />
                {/* A tiny particle traveling along this petal's own path. */}
                <circle r={1.6} fill="currentColor">
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#ask-me-petal-${i}`} />
                  </animateMotion>
                </circle>
              </g>
            );
          })}

          {/* Center */}
          <circle cx={100} cy={100} r={9} fill="none" stroke="currentColor" strokeWidth={1.2} opacity={0.6} />
          <circle cx={100} cy={100} r={3} fill="currentColor" opacity={0.9} />
        </svg>
      </motion.div>

      <style>{`
        @keyframes ask-me-illuminate {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
