import { GlitchEnter } from "@/components/landing/GlitchScroll";
import { BloodLight } from "@/components/landing/ui-primitives";

const ITEMS = [
  "COMMIT BEFORE YOU MOVE",
  "HISTORY ONLY INPUT",
  "SEALED INFERENCE",
  "ON-CHAIN PROOF",
  "NO RETROACTIVE CHEAT",
  "VERIFY AFTER DUEL",
  "PATTERN DUEL",
  "0G COMPUTE",
  "0G CHAIN",
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
