import { BloodLight } from "@/components/landing/ui-primitives";

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
] as const;

interface StorySlideProps {
  index: 0 | 1 | 2 | 3;
}

export function StorySlide({ index }: StorySlideProps) {
  const p = PILLARS[index];

  return (
    <section
      className="relative flex h-screen flex-col justify-center overflow-hidden border-y border-border/60"
      aria-label={p.label}
    >
      {/* Big background number */}
      <span
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-display text-[28vw] leading-none text-foreground/[0.028]"
        aria-hidden
      >
        {p.num}
      </span>

      {/* Subtle top/bottom gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" aria-hidden />

      <div className="relative px-4 sm:px-6">
        <div className="mx-auto w-full max-w-4xl">
          {/* Progress bars across all 4 story slides */}
          <div className="mb-10 flex gap-2">
            {PILLARS.map((_, i) => (
              <div
                key={i}
                className="relative h-px flex-1 overflow-hidden rounded-full bg-border/40"
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all duration-500"
                  style={{ width: i <= index ? "100%" : "0%" }}
                />
              </div>
            ))}
          </div>

          {/* Label + sublabel */}
          <p className="font-code text-[11px] uppercase tracking-[0.3em] text-accent">
            <BloodLight className="text-accent" flickerDelay={0.6 + index * 0.3}>
              {p.label}
            </BloodLight>
            <span className="ml-2 text-muted-foreground/50">· {p.sublabel}</span>
          </p>

          {/* Headline */}
          <h2 className="mt-5 font-pixel text-2xl leading-tight sm:text-3xl md:text-4xl">
            {p.headlinePre}
            <span className="text-accent">{p.headlineAccent}</span>
          </h2>

          {/* Body */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {p.body}
          </p>

          {/* Counter */}
          <div className="mt-10 flex items-center gap-3">
            <span className="font-code text-xs text-muted-foreground/40">
              {p.num} · {String(PILLARS.length).padStart(2, "0")} · SCROLL ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
