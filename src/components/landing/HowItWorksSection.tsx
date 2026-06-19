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
          <SectionLabel>How it works</SectionLabel>
          <SectionTitle className="max-w-3xl">
            The AI moves first.
            <BloodLight className="text-accent" flickerDelay={1.1}>
              {" "}You move second.
            </BloodLight>
          </SectionTitle>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            ZEGON is a simultaneous gunslinger duel built around one rule: the AI cannot react to
            what you just clicked. It predicts from history, commits on-chain, then you respond.
            Win by breaking the patterns it learns.
          </p>
        </GlitchReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, index) => (
            <GlitchCard
              key={item.step}
              delay={0}
              className="group overflow-hidden border border-border/60 bg-card p-6 transition-all hover:border-accent/40 hover:shadow-[0_0_24px_-8px_rgba(179,18,43,0.25)]"
            >
              <BloodLight
                className="relative z-0 font-display text-4xl text-accent/40 group-hover:text-accent/70"
                flickerDelay={index * 1.4}
              >
                {item.step}
              </BloodLight>
              <h3 className="relative z-0 mt-4 text-base font-bold leading-snug">{item.title}</h3>
              <p className="relative z-0 mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </GlitchCard>
          ))}
        </div>
      </div>
    </GlitchSection>
  );
}
