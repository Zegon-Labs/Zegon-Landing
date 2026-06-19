import { Check, X } from "lucide-react";
import { GlitchCard, GlitchReveal, GlitchSection } from "@/components/landing/GlitchScroll";
import { BloodLight, CyberPanel, SectionLabel, SectionTitle } from "@/components/landing/ui-primitives";

const COMPARE = [
  { label: "Sees your current move?", others: "Unknown", zegon: "Never" },
  { label: "Locked before you act?", others: "No", zegon: "On-chain" },
  { label: "Fairness proof?", others: "Trust us", zegon: "You verify" },
  { label: "Core skill?", others: "Reflex", zegon: "Outread patterns" },
];

export function WhyZegonSection() {
  return (
    <GlitchSection id="why-zegon" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <GlitchReveal>
          <SectionLabel>Why ZEGON</SectionLabel>
          <SectionTitle className="max-w-3xl">
            Same duel.
            <br />
            <BloodLight className="text-accent" flickerDelay={0.9}>
              Different proof.
            </BloodLight>
          </SectionTitle>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Most AI games ask you to trust the server. ZEGON lets you check it.
          </p>
        </GlitchReveal>

        <div className="relative mt-12 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <GlitchCard className="overflow-hidden">
            <CyberPanel hover="none" className="relative z-0 h-full bg-card/80">
              <p className="font-code text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Typical AI duel
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
                  ZEGON
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
              { tag: "COMMIT", line: "AI move on-chain first" },
              { tag: "BLIND", line: "Your pick never enters the model" },
              { tag: "VERIFY", line: "Open the proof after the duel" },
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
