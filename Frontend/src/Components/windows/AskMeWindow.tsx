import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import SpaceshipBackground from '../SpaceshipBackground';
import { askQuestion, AskMeError, AskMeResponse } from '../../lib/askMeApi';

const SUGGESTIONS = [
  'Tell me about your startup experience.',
  'Which project best demonstrates backend development?',
  'What AI projects have you built?',
  'Why are you interested in AI?',
  'What technologies do you enjoy using?',
  'Which project was the most challenging?',
];

const SEARCH_STEPS = ['Searching portfolio...', 'Searching projects...', 'Searching experience...', 'Generating response...'];

interface Answer extends AskMeResponse {
  question: string;
}

export default function AskMeWindow() {
  const [input, setInput] = useState('');
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showSources, setShowSources] = useState<Record<number, boolean>>({});
  const [showPipeline, setShowPipeline] = useState<Record<number, boolean>>({});

  const stepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
    };
  }, []);

  const runQuestion = async (question: string) => {
    if (!question.trim() || loading) return;

    setError(null);
    setLoading(true);
    setStepIndex(0);

    // Purely cosmetic pacing through the retrieval steps while the real
    // request is in flight - the backend doesn't stream progress, but a
    // fast request finishing "mid-step" still reads as intentional rather
    // than broken, since we cut straight to the answer the moment it resolves.
    stepTimerRef.current = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, SEARCH_STEPS.length - 1));
    }, 550);

    try {
      const result = await askQuestion(question.trim());
      setAnswers((prev) => [{ question: question.trim(), ...result }, ...prev]);
    } catch (err) {
      const message = err instanceof AskMeError ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
      setLoading(false);
      setInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runQuestion(input);
  };

  return (
    <div className="relative p-6 font-mono text-sm flex flex-col items-center min-h-full">
      <SpaceshipBackground active={loading} />

      <div className="relative w-full max-w-md flex items-center gap-3 text-primary/40 mb-4">
        <span className="h-px flex-1 bg-primary/20" />
        <span className="text-[10px] tracking-[0.3em] uppercase">Ask Me Anything</span>
        <span className="h-px flex-1 bg-primary/20" />
      </div>

      <div className="relative h-5 mb-2 text-center">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-[11px] text-primary/60 tracking-wide"
            >
              {SEARCH_STEPS[stepIndex]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {answers.length === 0 && !loading && (
        <div className="w-full max-w-md mb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => runQuestion(s)}
                className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-[11px] text-white/60 hover:border-primary/40 hover:text-primary/90 transition-colors text-left"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-md mb-5">
        <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-white/[0.02] px-4 py-2.5 focus-within:border-primary/50 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-primary/50 shrink-0" />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask me anything about my projects, experience, or skills..."
            className="flex-1 bg-transparent border-none outline-none text-white/85 text-xs placeholder:text-white/30 disabled:opacity-50"
          />
        </div>
      </form>

      {error && (
        <div className="w-full max-w-md mb-5 text-[11px] text-red-400 border border-red-400/25 bg-red-400/5 rounded-lg px-3 py-2.5">
          {error}
        </div>
      )}

      <div className="w-full max-w-md space-y-4">
        {answers.map((a, idx) => (
          <motion.div
            key={`${a.question}-${idx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
          >
            <div className="px-4 pt-3.5 pb-1 text-[11px] text-primary/70">{a.question}</div>
            <div className="px-4 pb-3.5 text-[12px] text-white/80 leading-relaxed">{a.answer}</div>

            <div className="border-t border-white/5 divide-y divide-white/5">
              <button
                onClick={() => setShowSources((p) => ({ ...p, [idx]: !p[idx] }))}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] uppercase tracking-wider text-white/40 hover:text-white/60 transition-colors"
              >
                Sources
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${showSources[idx] ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {showSources[idx] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                      {a.sources.length === 0 ? (
                        <span className="text-[11px] text-white/35">No strongly relevant sections found.</span>
                      ) : (
                        a.sources.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] px-2 py-0.5 rounded-full border border-success/25 text-success bg-success/5"
                          >
                            ✓ {s}
                          </span>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setShowPipeline((p) => ({ ...p, [idx]: !p[idx] }))}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] uppercase tracking-wider text-white/40 hover:text-white/60 transition-colors"
              >
                Pipeline
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${showPipeline[idx] ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {showPipeline[idx] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 text-[10px] text-white/45 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span>Embedding Model</span>
                        <span className="text-white/65">{a.pipeline.embeddingModel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vector Database</span>
                        <span className="text-white/65">{a.pipeline.vectorDatabase}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>LLM</span>
                        <span className="text-white/65">{a.pipeline.llm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Retrieved Chunks</span>
                        <span className="text-white/65">{a.pipeline.retrievedChunks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response Time</span>
                        <span className="text-white/65">{a.pipeline.timings.totalMs}ms</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}