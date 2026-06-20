import { useEffect, useRef, useState } from "react";

const PILLARS = [
  {
    num: "01",
    label: "EVERY AI GAME LIES.",
    sublabel: "The problem",
    headlinePre: "The AI always knows",
    headlineAccent: " what you picked.",
    body: "Standard AI games decide their move after seeing yours. The model gets your input, adapts instantly, and calls it fair. It never was. You were playing against a system that cheated by design.",
  },
  {
    num: "02",
    label: "ZEGON COMMITS FIRST.",
    sublabel: "0G Chain",
    headlinePre: "Its move is locked",
    headlineAccent: " before you pick.",
    body: "ZEGON chooses a move, hashes it, and posts that hash on-chain. Your buttons don't unlock until the hash exists on the ledger. The AI cannot take it back. It cannot adapt. It's already decided.",
  },
  {
    num: "03",
    label: "YOU PLAY IN THE DARK.",
    sublabel: "The duel",
    headlinePre: "Real uncertainty.",
    headlineAccent: " Real stakes.",
    body: "Shoot, dodge, feint, or reload — without seeing ZEGON's choice. The asymmetry is the game. Outplay a pattern reader by becoming unpredictable. Every round, your history is its only weapon.",
  },
  {
    num: "04",
    label: "PROOF IS PERMANENT.",
    sublabel: "0G Storage",
    headlinePre: "The chain doesn't",
    headlineAccent: " forget.",
    body: "After the round, the hash opens. Both moves are public. The chain confirms what was committed when. Verifiable data stored on 0G — readable by anyone, auditable forever. No trust required.",
  },
];

export function ScrollStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReduced = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    if (prefersReduced.current) return;

    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = containerRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollable = el.offsetHeight - window.innerHeight;
          const scrolled = Math.max(0, -rect.top);
          const progress = Math.min(1, scrolled / scrollable);
          const idx = Math.min(
            PILLARS.length - 1,
            Math.floor(progress * PILLARS.length),
          );
          setActiveIndex(idx);
        }
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reduced motion: simple stacked list
  if (prefersReduced.current) {
    return (
      <section id="scroll-story" className="border-y border-border/60 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl space-y-16 px-4 sm:px-6">
          {PILLARS.map((p, i) => (
            <div key={i}>
              <p className="font-code text-[11px] uppercase tracking-[0.3em] text-accent">
                {p.label}{" "}
                <span className="text-muted-foreground/50">· {p.sublabel}</span>
              </p>
              <h3 className="mt-3 text-3xl font-bold leading-tight">
                {p.headlinePre}
                <span className="text-accent">{p.headlineAccent}</span>
              </h3>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="scroll-story" ref={containerRef} style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden border-y border-border/60">
        {/* Background big number */}
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-display text-[28vw] leading-none text-foreground/[0.03] transition-all duration-700"
          aria-hidden
        >
          {PILLARS[activeIndex].num}
        </span>

        <div className="relative flex h-full flex-col justify-center px-4 sm:px-6">
          <div className="mx-auto w-full max-w-4xl">
            {/* Progress bar */}
            <div className="mb-10 flex gap-2">
              {PILLARS.map((_, i) => (
                <div key={i} className="relative h-px flex-1 overflow-hidden rounded-full bg-border/40">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all duration-500"
                    style={{ width: i < activeIndex ? "100%" : i === activeIndex ? "100%" : "0%" }}
                  />
                </div>
              ))}
            </div>

            {/* Content slides */}
            <div className="relative" style={{ minHeight: "280px" }}>
              {PILLARS.map((pillar, i) => {
                const state =
                  i === activeIndex ? "active" : i < activeIndex ? "past" : "upcoming";
                return (
                  <div
                    key={i}
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                      opacity: state === "active" ? 1 : 0,
                      transform:
                        state === "active"
                          ? "translateY(0)"
                          : state === "past"
                          ? "translateY(-32px)"
                          : "translateY(32px)",
                      pointerEvents: state === "active" ? "auto" : "none",
                    }}
                  >
                    <p className="font-code text-[11px] uppercase tracking-[0.3em] text-accent">
                      {pillar.label}
                      <span className="ml-2 text-muted-foreground/50">· {pillar.sublabel}</span>
                    </p>
                    <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                      {pillar.headlinePre}
                      <span className="text-accent">{pillar.headlineAccent}</span>
                    </h2>
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {pillar.body}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Counter + scroll hint */}
            <div className="mt-10 flex items-center gap-4">
              <span className="font-code text-xs text-muted-foreground/40">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(PILLARS.length).padStart(2, "0")}
              </span>
              {activeIndex < PILLARS.length - 1 && (
                <span className="font-code text-[10px] uppercase tracking-widest text-muted-foreground/30 animate-pulse">
                  scroll ↓
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
