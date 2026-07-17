import React from 'react';
import { motion } from 'framer-motion';
import { Target, Route, Compass } from 'lucide-react';

const CURRENT_FOCUS = [
  'Building production software at Spot-n-Play',
  'Strengthening backend architecture and security',
  'Learning advanced Machine Learning',
  'Preparing for Software Engineering & AI roles',
  'Continuously solving DSA problems',
];

const LEARNING_ROADMAP = ['System Design', 'Docker', 'CI/CD', 'AWS', 'LLMs', 'Distributed Systems'];

const PRINCIPLES = [
  'Build before you optimize.',
  'Measure before you assume.',
  'Simple solutions beat clever ones.',
  'Users matter more than frameworks.',
  'Every project should solve a real problem.',
];

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-primary/60 mb-3">
        <Icon className="w-3.5 h-3.5" /> {title}
      </div>
      {children}
    </div>
  );
}

export default function TimelineWindow() {
  return (
    <div className="p-6 font-mono text-sm space-y-7">
      <div>
        <div className="text-white font-bold text-base">Engineering Focus</div>
        <p className="text-white/40 text-xs mt-1 leading-relaxed">
          Not a list of steps I've walked — where the energy is going right now.
        </p>
      </div>

      <Section icon={Target} title="Current Focus">
        <ul className="space-y-2.5">
          {CURRENT_FOCUS.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-2.5 text-white/70 text-xs leading-relaxed"
            >
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(56,192,228,0.7)]" />
              {f}
            </motion.li>
          ))}
        </ul>
      </Section>

      <Section icon={Route} title="Currently Learning">
        <div className="flex flex-wrap gap-2">
          {LEARNING_ROADMAP.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="px-2.5 py-1 rounded-md border border-white/10 text-xs text-white/70 bg-white/[0.02] hover:border-primary/40 transition-colors"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </Section>

      <Section icon={Compass} title="Engineering Principles">
        <ul className="space-y-2 border-l-2 border-primary/20 pl-3.5">
          {PRINCIPLES.map((p) => (
            <li key={p} className="text-white/60 text-xs italic leading-relaxed">
              {p}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
