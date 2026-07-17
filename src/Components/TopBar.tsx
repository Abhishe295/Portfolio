import React, { useEffect, useState } from 'react';

export default function TopBar() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    // Updates once a minute — no need for per-second churn on a portfolio clock.
    const id = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[400] flex items-center justify-between px-5 py-2.5 border-b border-primary/10 bg-[#05080c]/70 backdrop-blur-md text-xs font-mono text-white/70 select-none">
      <span className="tracking-[0.2em] text-primary font-semibold">ABHISHEK</span>
      <span className="tracking-wider">
        {time.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
        {'  '}
        {time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
}
