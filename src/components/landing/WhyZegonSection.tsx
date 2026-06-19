import { Check, X } from "lucide-react";
import { GlitchCard, GlitchReveal, GlitchSection } from "@/components/landing/GlitchScroll";
import { BloodLight, CyberPanel, SectionLabel, SectionTitle } from "@/components/landing/ui-primitives";

const COMPARE = [
  { label: "When you lose", others: "Was it rigged?", zegon: "You can check" },
  { label: "AI move timing", others: "Hidden server", zegon: "Locked first" },
  { label: "Can the house cheat?", others: "You'd never know", zegon: "Proof exposes it" },
  { label: "Does the duel feel real?", others: "Often hollow", zegon: "Stakes land" },
];

export function WhyZegonSection() {
  return (
    <GlitchSection id="why-zegon" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <GlitchReveal>
          <SectionLabel>The problem</SectionLabel>
          <SectionTitle className="max-w-3xl">
            Fun games.
            <br />
            <BloodLight className="text-accent" flickerDelay={0.9}>
              Fake fairness.
            </BloodLight>
          </SectionTitle>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Most AI opponents live on opaque servers. The moment you suspect a rigged read or a
            retroactive cheat, the tension breaks — even if the game is “just for fun.” The problem
            isn&apos;t AI in games. It&apos;s that players have no way to know the fight was real.
          </p>
        </GlitchReveal>

        <div className="relative mt-12 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <GlitchCard className="overflow-hidden">
            <CyberPanel hover="none" className="relative z-0 h-full bg-card/80">
              <p className="font-code text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Typical AI game
              </p>
              <ul className="mt-6 space-y-4">
                {COMPARE.map((row) => (
                  <li key={row.label} className="flex items-center justify-between gap-3 border-b border-border/40 pb-4 last:border-0 last:pb-0">
                    <span className="text-sm text-muted-foreground">{row.label}</span>
                    <span className="inline-flex shrink-0 items-center gap-2 font-code text-sm text-accent/80">
                      <X className="size-3.5" />
                      {row.others}
                    </span>
                  </li>
                ))}
              </ul>
            </CyberPanel>
          </GlitchCard>

          <div className="flex items-center justify-center py-2 lg:py-0">
            <span className="font-pixel text-lg text-muted-foreground lg:[writing-mode:vertical-rl]">
              <BloodLight className="text-accent" flickerDelay={1.2}>
                VS
              </BloodLight>
            </span>
          </div>

          <GlitchCard className="overflow-hidden">
            <CyberPanel hover="cyan" bloodLight className="relative z-0 h-full border-primary/25 bg-primary/5">
              <p className="font-code text-[10px] uppercase tracking-[0.2em]">
                <BloodLight className="text-accent" flickerDelay={1.5}>
                  ZEGON use case
                </BloodLight>
              </p>
              <ul className="mt-6 space-y-4">
                {COMPARE.map((row) => (
                  <li key={row.label} className="flex items-center justify-between gap-3 border-b border-primary/20 pb-4 last:border-0 last:pb-0">
                    <span className="text-sm text-muted-foreground">{row.label}</span>
                    <span className="inline-flex shrink-0 items-center gap-2 font-code text-sm text-primary">
                      <Check className="size-3.5" />
                      {row.zegon}
                    </span>
                  </li>
                ))}
              </ul>
            </CyberPanel>
          </GlitchCard>
        </div>

        <GlitchCard className="mt-6 overflow-hidden">
          <div className="relative z-0 grid gap-px bg-border/60 sm:grid-cols-3">
            {[
              {
                tag: "PROBLEM",
                line: "Blind trust kills immersion in AI games",
              },
              {
                tag: "USE CASE",
                line: "A duel you can audit after every round",
              },
              {
                tag: "OUTCOME",
                line: "Gameplay that feels real — not rigged",
              },
            ].map((item) => (
              <div key={item.tag} className="bg-card px-5 py-4 text-center sm:py-5">
                <BloodLight className="font-code text-[11px] tracking-[0.25em] text-accent" flickerDelay={0.6}>
                  {item.tag}
                </BloodLight>
                <p className="mt-2 text-sm text-muted-foreground">{item.line}</p>
              </div>
            ))}
          </div>
        </GlitchCard>
      </div>
    </GlitchSection>
  );
}
