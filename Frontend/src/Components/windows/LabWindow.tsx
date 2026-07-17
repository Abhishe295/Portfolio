import React from 'react';
import { motion } from 'framer-motion';

const METRICS = [
  { label: 'Facial sentiment CNN', value: 92 },
  { label: 'Vocal tone classifier (Librosa)', value: 87 },
  { label: 'OpenCV pipeline accuracy', value: 90 },
  { label: 'Gemini recommendation match rate', value: 84 },
];

export default function LabWindow() {
  return (
    <div className="p-6 font-mono text-sm text-white/80 space-y-6">
      <div>
        <div className="text-white font-bold text-base">AI / ML Lab</div>
        <p className="text-white/50 text-xs mt-1 leading-relaxed">
          Model performance from MindWell — a mental wellness platform combining facial
          expression analysis, vocal tone detection, and Gemini-driven recommendations.
        </p>
      </div>

      <div className="space-y-4">
        {METRICS.map((m, i) => (
          <div key={m.label}>
            <div className="flex justify-between text-xs text-white/60 mb-1">
              <span>{m.label}</span>
              <span className="text-primary">{m.value}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.value}%` }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                className="h-full rounded-full bg-primary shadow-[0_0_10px_rgba(56,192,228,0.6)]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
