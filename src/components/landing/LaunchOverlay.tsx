import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { LaunchPhase } from "@/hooks/useLaunchZegon";

const HOLD_LINES = [
  "ENTER THE DUEL",
  "ZEGON IS WAITING",
  "NO CHEAT. NO MERCY.",
  "OUTDRAW THE BLIND",
];

function ShotPhase() {
  return (
    <>
      <div className="shot-red-flash absolute inset-0" />
      <div className="shot-white-core absolute inset-0" />

      <div className="absolute inset-0 flex items-end justify-center pb-[18vh] sm:pb-[22vh]">
        <div className="shot-muzzle relative flex items-center justify-center">
          <div className="shot-muzzle-core" />
          <div className="shot-muzzle-bloom" />
          <div className="shot-muzzle-ring" />
        </div>
      </div>

      <div className="shot-shockwave absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2" />

      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="shot-spark absolute left-1/2 top-[62%]"
          style={
            {
              "--spark-angle": `${i * 30}deg`,
              "--spark-delay": `${i * 0.015}s`,
            } as CSSProperties
          }
        />
      ))}

      <div className="shot-casing absolute left-[52%] top-[58%]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="shot-bang font-pixel text-4xl text-bone sm:text-6xl">BANG</p>
      </div>

      <div className="shot-vignette-burst absolute inset-0" />
      <div className="shot-scanlines absolute inset-0 opacity-40" />
    </>
  );
}

function BloodHoldPhase({ holdMs }: { holdMs: number }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const lineId = window.setInterval(() => {
      setLineIdx((i) => (i + 1) % HOLD_LINES.length);
    }, 900);
    const progId = window.setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / holdMs) * 100));
    }, 50);
    return () => {
      window.clearInterval(lineId);
      window.clearInterval(progId);
    };
  }, [holdMs]);

  return (
    <>
      <div className="blood-hold-bg absolute inset-0" />
      <div className="blood-hold-pulse absolute inset-0" />
      <div className="blood-hold-noise absolute inset-0" />
      <div className="blood-hold-scanlines absolute inset-0" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6">
        <p className="font-display text-2xl tracking-[0.35em] text-bone/80 sm:text-3xl">ZEGON</p>

        <p className="blood-hold-text font-pixel text-center text-lg leading-relaxed text-bone text-glow-blood sm:text-2xl">
          {HOLD_LINES[lineIdx]}
        </p>

        <div className="w-full max-w-md">
          <div className="flex items-center justify-between font-display text-xl text-accent">
            <span>LOADING</span>
            <span>{Math.min(Math.round(progress), 100)}%</span>
          </div>
          <div className="mt-3 flex gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 flex-1 border border-blood/40 transition-all duration-150 ${
                  i * 5 < progress
                    ? "bg-accent shadow-[0_0_10px_rgba(179,18,43,0.8)]"
                    : "bg-blood/10"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="font-display text-center text-lg tracking-widest text-bone/60">
          Duel opens in a new tab when the sequence completes...
        </p>
      </div>
    </>
  );
}

export function LaunchOverlay({ phase, holdMs }: { phase: LaunchPhase; holdMs: number }) {
  return (
    <div
      className="launch-overlay fixed inset-0 z-[200] overflow-hidden bg-[#1a0308]"
      aria-hidden
      role="presentation"
    >
      {phase === "shot" && <ShotPhase />}
      {phase === "hold" && <BloodHoldPhase holdMs={holdMs} />}
    </div>
  );
}
