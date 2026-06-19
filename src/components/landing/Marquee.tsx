import { GlitchEnter } from "@/components/landing/GlitchScroll";
import { BloodLight } from "@/components/landing/ui-primitives";

const ITEMS = [
  "GAMES SHOULDN'T FEEL RIGGED",
  "PROVABLY FAIR AI",
  "COMMIT BEFORE YOU MOVE",
  "VERIFY AFTER DUEL",
  "REAL STAKES",
  "NO RETROACTIVE CHEAT",
  "SEALED INFERENCE",
  "ON-CHAIN PROOF",
  "0G USE CASE",
];

export function Marquee() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <GlitchEnter>
      <div className="relative overflow-hidden border-y border-accent/20 bg-ash/80 py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 blood-streak opacity-25" />
        <div className="animate-marquee flex w-max gap-0">
          {track.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex shrink-0 items-center font-code text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span className="px-6">{item}</span>
              <BloodLight className="text-accent" flickerDelay={(i % 5) * 1.1}>
                ◆
              </BloodLight>
            </span>
          ))}
        </div>
      </div>
    </GlitchEnter>
  );
}
