import { useEffect, useState } from "react";

export function VsSection() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative h-screen overflow-hidden bg-background"
      aria-label="VS — You vs ZEGON"
    >
      {/* Atmospheric center glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/[0.06] blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-3/4 bg-accent/20 blur-[2px]" />
      </div>

      {/* ── Left: ZEGON (mira a la derecha → hacia el centro) ── */}
      <div
        className={`absolute bottom-0 left-0 flex items-end transition-all duration-1000 ease-out
          ${ready ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
      >
        <img
          src="/vs/vs_zegon.png"
          alt="ZEGON"
          className="vs-figure-glow w-auto"
          style={{ height: "92vh", maxWidth: "none", transform: "translateX(-18%) translateY(28%)" }}
        />
      </div>

      {/* ── Right: Humanoid (mira a la izquierda → hacia el centro) ── */}
      <div
        className={`absolute bottom-0 right-0 flex items-end transition-all duration-1000 ease-out
          ${ready ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
      >
        <img
          src="/vs/vs_humanoid.png"
          alt=""
          aria-hidden
          className="vs-figure-glow w-auto"
          style={{ height: "100vh", maxWidth: "none", transform: "translateX(18%) translateY(20%)" }}
        />
      </div>

      {/* ── Center: VS ── */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 delay-300
          ${ready ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
      >
        <p className="vs-text-glow vs-flicker font-pixel leading-none tracking-[0.15em] text-foreground"
          style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
        >
          VS
        </p>
        <div className="mt-3 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>

      {/* Top fade (blends with header) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent"
        aria-hidden
      />
      {/* Bottom fade (blends into Hero) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <p className="font-code animate-pulse text-[10px] uppercase tracking-[0.35em] text-muted-foreground/40">
          scroll ↓
        </p>
      </div>
    </section>
  );
}
