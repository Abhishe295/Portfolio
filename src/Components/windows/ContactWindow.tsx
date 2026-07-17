import React from 'react';
import { Mail, Phone, Github, Linkedin, Code2 } from 'lucide-react';

const OPEN_TO = [
  'Software Engineering Internships',
  'AI/ML Roles',
  'Backend Development',
  'Freelance Opportunities',
];

const LINKS = [
  { icon: Mail, label: 'Email', value: 'abhishekgigaiw@gmail.com', href: 'mailto:abhishekgigaiw@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 7982001670', href: 'tel:+917982001670' },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'abhishek-kumar-pundir',
    href: 'https://linkedin.com/in/abhishek-kumar-pundir-ba4110326/',
  },
  { icon: Github, label: 'GitHub', value: 'Abhishe295', href: 'https://github.com/Abhishe295' },
  { icon: Code2, label: 'LeetCode', value: 'Abhishek_Kumar9999', href: 'https://leetcode.com/u/Abhishek_Kumar9999/' },
];

export default function ContactWindow() {
  return (
    <div className="p-6 font-mono text-sm space-y-2">
      <div className="text-white font-bold text-base mb-1">Let's build something.</div>

      <div className="mb-5">
        <div className="text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-2">Open to</div>
        <div className="flex flex-wrap gap-2">
          {OPEN_TO.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 rounded-md border border-primary/20 text-[11px] text-primary/80 bg-primary/5"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {LINKS.map(({ icon: Icon, label, value, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-primary/10 hover:border-primary/40 bg-white/[0.02] hover:bg-primary/5 transition-colors group"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:shadow-[0_0_12px_rgba(56,192,228,0.4)] transition-shadow">
            <Icon className="w-4 h-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] uppercase tracking-wider text-white/40">{label}</span>
            <span className="block text-xs text-white/80 truncate">{value}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
