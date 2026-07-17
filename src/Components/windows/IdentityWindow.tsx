import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Trophy, Radar, Sparkles, Users, BookOpen } from 'lucide-react';

const SKILL_GROUPS: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'C++'] },
  { label: 'Frontend', items: ['React', 'Three.js', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'Socket.io'] },
  { label: 'AI / ML', items: ['TensorFlow', 'OpenCV', 'Gemini API'] },
  { label: 'Databases', items: ['MongoDB'] },
  { label: 'Dev Tools', items: ['Git', 'Docker', 'Vercel'] },
];

const STATS = [
  { value: '25+', label: 'Projects Built' },
  { value: '300+', label: 'DSA Problems Solved' },
  { value: '3', label: 'Hackathons' },
  { value: '8', label: 'Full-Stack Apps' },
  { value: '5', label: 'AI/ML Projects' },
  { value: '1', label: 'Startup Shipped' },
];

const EXPERIENCE = [
  {
    role: 'Software Developer Intern',
    org: 'Spot-n-Play (LPU Incubated Startup)',
    current: true,
    points: [
      'Reduced unnecessary frontend re-renders and optimized API requests.',
      'Implemented production-ready features for a sports-tech platform connecting players and communities.',
      'Strengthened authentication workflows and application security.',
      'Collaborated with developers in a live startup environment.',
    ],
  },
  {
    role: 'Freelance Full Stack Developer',
    org: 'Factory Tool Management System (Client Project)',
    current: false,
    points: [
      'Developed a custom CRUD-based management system.',
      'Built an inventory system for tracking defective factory tools.',
      'Implemented secure, role-based data management.',
      'Delivered software aligned to the client\u2019s exact workflow requirements.',
    ],
  },
];

const CURRENTLY = [
  'Developing production software at Spot-n-Play.',
  'Building scalable backend systems.',
  'Preparing for Software Engineering and AI roles.',
];

const LEARNING = ['Docker', 'System Design', 'AWS'];

export default function IdentityWindow() {
  return (
    <div className="p-6 font-mono text-sm text-white/80 space-y-7">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 shrink-0 rounded-full border border-primary/40 flex items-center justify-center text-2xl font-bold text-primary bg-primary/5 shadow-[0_0_25px_rgba(56,192,228,0.25)]">
          AK
        </div>
        <div>
          <div className="text-lg font-bold text-white tracking-wide">Abhishek Kumar Pundir</div>
          <div className="text-primary/80 text-xs">B.Tech CSE (AI &amp; ML) — Lovely Professional University</div>
        </div>
      </div>

      {/* About */}
      <p className="text-white/60 leading-relaxed">
        I'm a Computer Science student focused on AI and Full-Stack Development. Over the
        past few years I've built projects ranging from healthcare AI systems to real-time
        web applications. I'm currently working on production software at an LPU-incubated
        startup, where I'm contributing to performance improvements, security, and new
        features while continuing to deepen my understanding of software engineering and
        machine learning.
      </p>

      {/* Quick stats */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-primary/60 mb-2.5">
          <Radar className="w-3.5 h-3.5" /> Quick Stats
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-2.5 text-center"
            >
              <div className="text-base font-bold text-primary">{s.value}</div>
              <div className="text-[9px] text-white/50 leading-tight mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-primary/60 mb-2.5">
          <Briefcase className="w-3.5 h-3.5" /> Experience
        </div>
        <div className="space-y-4">
          {EXPERIENCE.map((exp) => (
            <div key={exp.role} className="border-l-2 border-primary/25 pl-3.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-bold text-xs">{exp.role}</span>
                {exp.current && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] text-success border border-success/30 bg-success/10">
                    Current
                  </span>
                )}
              </div>
              <div className="text-primary/70 text-[11px] mb-1.5">{exp.org}</div>
              <ul className="text-[11px] text-white/55 list-disc list-inside space-y-0.5 leading-relaxed">
                {exp.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Hackathons */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-primary/60 mb-2.5">
          <Trophy className="w-3.5 h-3.5" /> Hackathons
        </div>
        <p className="text-white/55 text-[11px] leading-relaxed">
          Participated in hackathons, including the IIT Ropar Deep Learning Hackathon.
          No wins yet — building toward that.
        </p>
      </div>

      {/* Why I Build */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-primary/60 mb-2.5">
          <Sparkles className="w-3.5 h-3.5" /> Why I Build
        </div>
        <p className="text-white/55 text-[11px] leading-relaxed">
          I enjoy building software that solves real problems, whether it's an AI model, a
          web platform, or an internal business tool. Every project teaches me something new
          about writing reliable, scalable software.
        </p>
      </div>

      {/* Beyond Coding */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-primary/60 mb-2.5">
          <Users className="w-3.5 h-3.5" /> Beyond Coding
        </div>
        <ul className="text-[11px] text-white/55 space-y-1.5">
          {[
            'Worked directly with clients.',
            'Collaborated inside startup teams.',
            'Comfortable translating requirements into software.',
            'Believe good software comes from understanding users first.',
          ].map((c) => (
            <li key={c} className="flex items-start gap-2">
              <span className="mt-1 w-1 h-1 rounded-full bg-primary shrink-0" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Currently working on */}
      <div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-primary/60 mb-2.5">
          Currently Working On
        </div>
        <ul className="text-[11px] text-white/55 space-y-1.5">
          {CURRENTLY.map((c) => (
            <li key={c} className="flex items-start gap-2">
              <span className="mt-1 w-1 h-1 rounded-full bg-primary shrink-0" />
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-wrap gap-2">
          {LEARNING.map((l) => (
            <span
              key={l}
              className="px-2.5 py-1 rounded-md border border-white/10 text-[11px] text-white/70 bg-white/[0.02]"
            >
              {l}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-start gap-2 text-[11px] text-white/45">
          <BookOpen className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary/60" />
          <span>
            Currently reading <span className="text-white/65">Designing Data-Intensive Applications</span>.
          </span>
        </div>
      </div>

      {/* Stack */}
      <div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-primary/60 mb-3">Stack</div>
        <div className="space-y-3">
          {SKILL_GROUPS.map((group, gi) => (
            <div key={group.label}>
              <div className="text-[10px] uppercase tracking-wider text-white/35 mb-1.5">{group.label}</div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: gi * 0.08 + i * 0.03 }}
                    className="px-2.5 py-1 rounded-md border border-white/10 text-xs text-white/70 bg-white/[0.02]"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
