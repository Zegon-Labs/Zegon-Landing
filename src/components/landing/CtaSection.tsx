import { ArrowRight, Crosshair } from "lucide-react";
import { GlitchReveal, GlitchSection, GlitchTitle } from "@/components/landing/GlitchScroll";
import { LaunchButton } from "@/components/landing/LaunchButton";
import { BloodLight } from "@/components/landing/ui-primitives";

export function CtaSection() {
  return (
    <GlitchSection className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(179,18,43,0.35),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <GlitchTitle className="font-pixel text-xl leading-[1.6] sm:text-2xl lg:text-3xl">
          <span className="block text-muted-foreground">PLAY A DUEL</span>
          <span className="block text-foreground">THAT FEELS REAL.</span>
          <BloodLight className="block text-accent" flickerDelay={0.6}>
            VERIFY IT.
          </BloodLight>
        </GlitchTitle>
        <GlitchReveal className="mx-auto mt-6 max-w-lg text-xl text-muted-foreground" delay={150}>
          No trust-me fairness. Outdraw the blind AI, then open the proof that the round wasn&apos;t
          rigged.
        </GlitchReveal>
        <GlitchReveal delay={250} className="mt-10 flex justify-center">
          <LaunchButton variant="accent" size="lg" className="font-display text-xl tracking-widest">
            <Crosshair className="size-5" />
            LAUNCH ZEGON
            <ArrowRight className="size-5" />
          </LaunchButton>
        </GlitchReveal>
      </div>
    </GlitchSection>
  );
}
