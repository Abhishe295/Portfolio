import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Rocket, Flower2, Milestone, TerminalSquare, AtSign } from 'lucide-react';
import { useSystemStore } from '../lib/useSystemStore';
import DesktopBackground from './DesktopBackground';

// ---------------------------------------------------------------------------
// Real data, not placeholders. These numbers are pulled from the same facts
// shown elsewhere in the app (IdentityWindow's SKILL_GROUPS/STATS/EXPERIENCE
// and ContactWindow's LINKS), so the boot sequence previews the actual
// desktop instead of inventing a fictional "github.app" data-fetch skit.
// ---------------------------------------------------------------------------
const APPS = [
  { id: 'identity', icon: User, label: 'about-me.app', loading: 'Reading profile', stat: '6 Skill Groups', sub: 'Loaded' },
  { id: 'projects', icon: Rocket, label: 'projects.app', loading: 'Scanning repos', stat: '25+ Projects', sub: 'Indexed' },
  { id: 'askme', icon: Flower2, label: 'ask-me.app', loading: 'Waking assistant', stat: 'Portfolio RAG', sub: 'Online' },
  { id: 'timeline', icon: Milestone, label: 'focus.app', loading: 'Reading log', stat: '3 Hackathons', sub: 'Logged' },
  { id: 'terminal', icon: TerminalSquare, label: 'startup.log', loading: 'Connecting', stat: 'Spot-n-Play', sub: 'Connected' },
  { id: 'contact', icon: AtSign, label: 'contact.app', loading: 'Opening channels', stat: '5 Channels', sub: 'Ready' },
] as const;

// Scattered but deterministic positions (percent of viewport) so windows
// don't stack on top of each other. Cards are bigger now, so these sit a
// touch further from the edges/each other than before. No Math.random()
// here on purpose - keeps the layout stable across renders/SSR.
const POSITIONS = [
  { top: '16%', left: '5%' },
  { top: '12%', left: '58%' },
  { top: '48%', left: '3%' },
  { top: '40%', left: '61%' },
  { top: '73%', left: '16%' },
  { top: '64%', left: '52%' },
];

// Precomputed shard burst directions (angle-based, deterministic) for the
// vibrant "shatter" beat at the very end. Mixed sizes/colors/timings so the
// burst reads as debris rather than a single uniform ring.
const SHARD_COLORS = ['#38C0E4', '#7FE3FF', '#ffffff'];
const SHARDS = Array.from({ length: 30 }, (_, i) => {
  const angle = (i / 30) * Math.PI * 2 + (i % 3) * 0.15;
  const dist = 160 + ((i * 53) % 220);
  return {
    dx: Math.cos(angle) * dist,
    dy: Math.sin(angle) * dist,
    rot: (i % 2 === 0 ? 1 : -1) * (140 + i * 16),
    size: 6 + (i % 5) * 5,
    delay: (i % 8) * 0.018,
    color: SHARD_COLORS[i % SHARD_COLORS.length],
  };
});

// Pac-Man shape as a clip-path polygon rather than an SVG arc. Arc commands
// need large-arc/sweep flags that are easy to get backwards (that's what
// produced the stray-triangle glitch); plain trig points on a circle can't
// go wrong the same way. Mouth points right (0deg), the direction of travel.
const pacPoint = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return `${(50 + 50 * Math.cos(rad)).toFixed(2)}% ${(50 + 50 * Math.sin(rad)).toFixed(2)}%`;
};
const PAC_SEGMENTS = 28;
const PAC_MOUTH_HALF_DEG = 32;
const PAC_CLOSED = `polygon(${Array.from({ length: PAC_SEGMENTS }, (_, i) => pacPoint((360 / PAC_SEGMENTS) * i)).join(', ')})`;
const PAC_OPEN = (() => {
  const step = 360 / PAC_SEGMENTS;
  const pts = ['50% 50%'];
  for (let deg = PAC_MOUTH_HALF_DEG; deg <= 360 - PAC_MOUTH_HALF_DEG; deg += step) pts.push(pacPoint(deg));
  pts.push(pacPoint(360 - PAC_MOUTH_HALF_DEG));
  return `polygon(${pts.join(', ')})`;
})();


// top from PACMAN_START straight through to PACMAN_END, in parallel with
// the window/stat/minimize choreography underneath it - it doesn't get its
// own gated "phase". The shatter is given real time (~1s) so it reads as
// deliberate rather than rushed.
const T = {
  TERMINAL: 500,
  WINDOWS: 1200,
  STATS: 2500,
  MINIMIZE: 3200,
  PACMAN_START: 500,
  PACMAN_END: 4300,
  ASSEMBLE: 4300,
  SHATTER: 5200,
  ZOOM: 6250,
  FINISH: 6650,
};

const PELLET_COUNT = 22;

type Stage = 'cursor' | 'terminal' | 'windows' | 'stats' | 'minimize' | 'assemble' | 'shatter' | 'zoom';

const STATUS_LINE: Partial<Record<Stage, string>> = {
  terminal: 'Initializing workspace...',
  windows: 'Loading modules...',
  stats: 'Verifying modules...',
  minimize: 'Modules loaded',
  assemble: 'Restoring session...',
  shatter: 'Workspace ready',
};

export default function BootSequence() {
  const { setBootState } = useSystemStore();
  const [stage, setStage] = useState<Stage>('cursor');
  const [loadedCount, setLoadedCount] = useState(0);
  const [eatenCount, setEatenCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    timeouts.current.forEach(clearTimeout);
    setStage('zoom');
    setTimeout(() => setBootState('active'), 420);
  };

  useEffect(() => {
    const at = (ms: number, fn: () => void) => timeouts.current.push(setTimeout(fn, ms));

    at(T.TERMINAL, () => setStage('terminal'));
    at(T.WINDOWS, () => setStage('windows'));
    at(T.STATS, () => {
      setStage('stats');
      APPS.forEach((_, i) => at(i * 100, () => setLoadedCount((c) => c + 1)));
    });
    at(T.MINIMIZE, () => setStage('minimize'));

    // Pac-Man eats one pellet at a time, evenly across its whole run, so it
    // keeps chomping the entire time everything else is loading beneath it.
    const pacmanSpan = T.PACMAN_END - T.PACMAN_START;
    for (let i = 0; i < PELLET_COUNT; i++) {
      at(T.PACMAN_START + ((i + 1) / PELLET_COUNT) * pacmanSpan, () => setEatenCount((c) => c + 1));
    }

    at(T.ASSEMBLE, () => setStage('assemble'));
    at(T.SHATTER, () => setStage('shatter'));
    at(T.ZOOM, finish);
    at(1000, () => setShowHint(true));

    const skip = () => finish();
    window.addEventListener('keydown', skip);
    window.addEventListener('click', skip);

    return () => {
      timeouts.current.forEach(clearTimeout);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('click', skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stageOrder: Stage[] = ['cursor', 'terminal', 'windows', 'stats', 'minimize', 'assemble', 'shatter', 'zoom'];
  const stageIndex = stageOrder.indexOf(stage);
  const showWindows = stageIndex >= 2 && stageIndex <= 4; // windows..minimize
  const showPacman = stageIndex >= 1 && stage !== 'shatter' && stage !== 'zoom';
  const showLogo = stage === 'assemble' || stage === 'shatter';
  const showDock = stage === 'assemble' || stage === 'shatter';
  const showShards = stage === 'shatter' || stage === 'zoom';

  return (
    <motion.div
      animate={
        stage === 'zoom'
          ? { opacity: 0, scale: 1.06, x: 0, y: 0 }
          : stage === 'shatter'
            ? { opacity: 1, scale: 1, x: [0, -12, 10, -8, 6, -4, 2, 0], y: [0, 7, -7, 5, -4, 2, -1, 0] }
            : { opacity: 1, scale: 1, x: 0, y: 0 }
      }
      transition={
        stage === 'zoom'
          ? { duration: 0.45, ease: [0.4, 0, 0.2, 1] }
          : stage === 'shatter'
            ? { duration: 0.5, ease: 'easeOut' }
            : { duration: 0.3 }
      }
      className="fixed inset-0 z-[9999] overflow-hidden font-mono select-none cursor-pointer"
    >
      <DesktopBackground />

      {/* Impact flash - the beat where the screen "shakes then shatters" */}
      <AnimatePresence>
        {stage === 'shatter' && (
          <motion.div
            key="impact-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0] }}
            transition={{ duration: 0.35, times: [0, 0.25, 1], ease: 'easeOut' }}
            className="absolute inset-0 z-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(127,227,255,0.9), rgba(56,192,228,0.2) 45%, transparent 75%)' }}
          />
        )}
      </AnimatePresence>

      {/* Merge flash - the pieces converge into one bright pulse right before
          the real Desktop is revealed underneath. */}
      <AnimatePresence>
        {stage === 'zoom' && (
          <motion.div
            key="merge-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0] }}
            transition={{ duration: 0.4, times: [0, 0.35, 1], ease: 'easeInOut' }}
            className="absolute inset-0 z-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95), rgba(56,192,228,0.3) 40%, transparent 72%)' }}
          />
        )}
      </AnimatePresence>

      {/* Terminal prompt - top left, present through the whole sequence */}
      <div className="absolute top-8 left-6 md:top-10 md:left-10 text-[11px] md:text-xs text-primary/70 z-20">
        <div className="flex items-center gap-1.5">
          <span>guest@abhishek:~$</span>
          {stageIndex >= 1 && <span className="text-white/70">boot</span>}
          {stage === 'cursor' && (
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              className="inline-block w-[7px] h-[13px] bg-primary/80 translate-y-[1px]"
            />
          )}
        </div>
      </div>

      {/* Status line + module counter, bottom-anchored so it reads like a
          system log rather than a progress bar. */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-center px-4">
        <AnimatePresence mode="wait">
          {STATUS_LINE[stage] && (
            <motion.span
              key={stage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-[11px] tracking-[0.2em] uppercase text-primary/70"
            >
              {STATUS_LINE[stage]}
            </motion.span>
          )}
        </AnimatePresence>
        {(stage === 'stats' || stage === 'minimize') && (
          <span className="text-[10px] tracking-wider text-white/40">
            Modules Loaded &nbsp;{Math.min(loadedCount, APPS.length)} / {APPS.length}
          </span>
        )}
      </div>

      {/* Ambient strip: Pac-Man runs continuously left-to-right along the
          very top of the screen for the entire sequence, chomping pellets
          the whole time everything else is loading beneath it. */}
      <AnimatePresence>
        {showPacman && (
          <React.Fragment key="pacman-strip">
            {Array.from({ length: PELLET_COUNT }).map((_, i) => {
              const leftVw = 6 + i * (88 / (PELLET_COUNT - 1));
              const eaten = eatenCount > i;
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={eaten ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="absolute w-2 h-2 rounded-full bg-primary/60 z-10"
                  style={{ left: `${leftVw}vw`, top: '3.2vh' }}
                />
              );
            })}

            <motion.div
              className="absolute z-10 drop-shadow-[0_0_10px_rgba(56,192,228,0.5)]"
              style={{ width: 34, height: 34, marginTop: -17, marginLeft: -17 }}
              initial={{ left: '4vw', top: '3.2vh', opacity: 0 }}
              animate={{ left: '92vw', opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{
                left: { duration: (T.PACMAN_END - T.PACMAN_START) / 1000, ease: 'linear' },
                opacity: { duration: 0.2 },
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: '#38C0E4' }}
                animate={{ clipPath: [PAC_CLOSED, PAC_CLOSED, PAC_OPEN, PAC_OPEN] }}
                transition={{ duration: 0.42, repeat: Infinity, ease: 'linear', times: [0, 0.4, 0.5, 1] }}
              />
              <span
                className="absolute rounded-full bg-[#0a0f16]"
                style={{ width: 3, height: 3, top: '26%', left: '40%' }}
              />
            </motion.div>
          </React.Fragment>

        )}
      </AnimatePresence>

      {/* Phase 2-3: app windows popping in, reporting real stats, then
          minimizing into the dock like macOS. Bigger cards, generous padding. */}
      <AnimatePresence>
        {showWindows &&
          APPS.map((app, i) => {
            const Icon = app.icon;
            const verified = loadedCount > i;
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.82, y: 18 }}
                animate={
                  stage === 'minimize'
                    ? { opacity: 0, scale: 0.08, y: 260, transition: { delay: i * 0.07, duration: 0.4, ease: 'easeIn' } }
                    : { opacity: 1, scale: 1, y: 0, transition: { delay: i * 0.13, duration: 0.35, ease: [0.4, 0, 0.2, 1] } }
                }
                exit={{ opacity: 0 }}
                style={{ position: 'absolute', top: POSITIONS[i].top, left: POSITIONS[i].left }}
                className="w-[clamp(230px,25vw,300px)] rounded-xl border border-primary/25 bg-[#0a0f16]/90 backdrop-blur-md shadow-[0_8px_30px_-8px_rgba(56,192,228,0.35)] overflow-hidden"
              >
                <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-primary/15 bg-white/[0.03]">
                  <span className="block w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <span className="block w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <span className="block w-2.5 h-2.5 rounded-full bg-primary/40" />
                  <span className="ml-1.5 text-[11px] text-white/50 truncate">{app.label}</span>
                </div>
                <div className="px-4 py-4 flex items-center gap-3.5">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 ${
                      verified
                        ? 'border-primary/50 text-primary bg-primary/10'
                        : 'border-white/10 text-white/30 bg-white/[0.02]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <AnimatePresence mode="wait">
                      {verified ? (
                        <motion.div
                          key="stat"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="text-[15px] font-bold text-white/90 truncate leading-tight">{app.stat}</div>
                          <div className="text-[10px] text-primary/60 tracking-wide mt-0.5">✓ {app.sub}</div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[12px] text-white/35 truncate"
                        >
                          {app.loading}...
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Phase 5: dock + AKP badge assemble, sit for a beat, then everything
          shatters slowly and deliberately before the zoom-out handoff. */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {showLogo && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                stage === 'shatter'
                  ? { opacity: 0, scale: 1.35, rotate: 24, y: -18, transition: { duration: 0.55, ease: 'easeIn' } }
                  : { opacity: 1, scale: 1, rotate: 0, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
              }
              className="absolute w-20 h-20 rounded-full border border-primary/40 flex items-center justify-center text-xl font-bold text-primary bg-primary/5 shadow-[0_0_25px_rgba(56,192,228,0.4)]"
            >
              AKP
            </motion.div>
          )}
        </AnimatePresence>

        {/* shatter burst - punchy pop outward, then a slower vibrant scatter */}
        <AnimatePresence>
          {showShards &&
            SHARDS.map((s, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.6 }}
                animate={{
                  opacity: [1, 1, 0],
                  x: [0, s.dx * 0.35, s.dx],
                  y: [0, s.dy * 0.35, s.dy],
                  rotate: [0, s.rot * 0.4, s.rot],
                  scale: [0.6, 1.3, 0.3],
                }}
                transition={{ duration: 0.95, delay: s.delay, times: [0, 0.22, 1], ease: 'easeOut' }}
                className="absolute border"
                style={{
                  width: s.size,
                  height: s.size,
                  borderColor: s.color,
                  background: `${s.color}22`,
                  boxShadow: `0 0 10px ${s.color}88`,
                }}
              />
            ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showDock && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              stage === 'shatter'
                ? { opacity: 0, transition: { duration: 0.55, delay: 0.25 } }
                : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
            }
            className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-2xl border border-primary/20 bg-[#0a0f16]/85 backdrop-blur-xl shadow-[0_0_30px_rgba(56,192,228,0.15)]"
          >
            {APPS.map((app, i) => {
              const Icon = app.icon;
              const dockAngle = (i / APPS.length) * Math.PI + Math.PI; // fan upward/outward
              const dx = Math.cos(dockAngle) * (70 + i * 14);
              const dy = -Math.abs(Math.sin(dockAngle) * 90) - i * 6;
              return (
                <motion.span
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    stage === 'shatter'
                      ? { opacity: 0, x: dx, y: dy, rotate: (i % 2 === 0 ? 1 : -1) * 160, scale: 0.4, transition: { duration: 0.7, ease: 'easeIn' } }
                      : { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, transition: { delay: i * 0.06, duration: 0.25 } }
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-white/[0.03] text-primary/80"
                >
                  <Icon className="w-5 h-5" />
                </motion.span>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'assemble' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center"
          >
            <div
              className="text-lg md:text-xl font-bold tracking-[0.06em] text-white/90"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              WORKSPACE READY
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip hint - unobtrusive, fades in after a second, never blocks. */}
      <AnimatePresence>
        {showHint && stage !== 'zoom' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 right-5 text-[10px] tracking-wide text-white/25"
          >
            press any key to skip
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}