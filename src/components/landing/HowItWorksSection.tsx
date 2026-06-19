import { GlitchCard, GlitchReveal, GlitchSection } from "@/components/landing/GlitchScroll";
import { BloodLight, SectionLabel, SectionTitle } from "@/components/landing/ui-primitives";

const STEPS = [
  {
    step: "01",
    title: "ZEGON reads your history",
    text: "Sealed inference on 0G Compute. Only past actions and duel state go in. Your current pick does not.",
  },
  {
    step: "02",
    title: "ZEGON picks and commits",
    text: "It chooses a move and posts the hash on-chain before your buttons unlock. The duel is fixed in advance.",
  },
  {
    step: "03",
    title: "You act blind",
    text: "Pick shoot, dodge, feint, or reload without seeing its choice. Outplay the pattern reader.",
  },
  {
    step: "04",
    title: "Reveal and repeat",
    text: "Both moves open. The round resolves. Survive by staying unpredictable across the duel.",
  },
];

export function HowItWorksSection() {
  return (
    <GlitchSection
      id="how-it-works"
      className="relative border-y border-border/60 bg-ash/30 py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <GlitchReveal>
          <SectionLabel>The use case</SectionLabel>
          <SectionTitle className="max-w-3xl">
            Proof the duel
            <BloodLight className="text-accent" flickerDelay={1.1}>
              {" "}wasn&apos;t rigged.
            </BloodLight>
          </SectionTitle>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            ZEGON is the playable use case: a gunslinger duel where the AI cannot rewrite its move
            after seeing yours. It commits on-chain first, you respond blind, then anyone can verify
            the round was fair.
          </p>
        </GlitchReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item) => (
            <GlitchCard
              key={item.step}
              delay={0}
              className="overflow-hidden border border-border/60 bg-card p-6"
            >
              <span className="glitch-card-step relative z-[2] font-display text-4xl text-accent/50 text-glow-blood" aria-hidden>
                {item.step}
              </span>
              <h3 className="glitch-card-title relative z-[2] mt-4 text-base font-bold leading-snug">
                {item.title}
              </h3>
              <p className="glitch-card-text relative z-[2] mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </GlitchCard>
          ))}
        </div>
      </div>
    </GlitchSection>
  );
}
