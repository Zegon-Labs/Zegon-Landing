import { ArrowRight, Crosshair } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CommitFlowPreview } from "@/components/landing/CommitFlowPreview";
import { GlitchCard, GlitchEnter, GlitchReveal } from "@/components/landing/GlitchScroll";
import { LaunchButton } from "@/components/landing/LaunchButton";
import { BloodLight } from "@/components/landing/ui-primitives";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_0%,rgba(179,18,43,0.28),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_30%,rgba(232,24,58,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-px blood-streak opacity-70" />
      <div className="pointer-events-none absolute inset-0 scanlines opacity-25" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-8">
            <GlitchReveal>
              <Badge variant="blood" className="font-display text-base tracking-[0.2em]">
                USE CASE · PROVABLY FAIR AI GAMING
              </Badge>
            </GlitchReveal>

            <div className="space-y-4">
              <GlitchReveal delay={90}>
                <h1 className="font-pixel text-xl leading-[1.6] sm:text-2xl lg:text-3xl">
                  <span className="block text-foreground">AI GAMES</span>
                  <span className="block text-foreground">FEEL RIGGED.</span>
                  <BloodLight className="block text-accent" flickerDelay={0.3}>
                    THEY SHOULDN&apos;T.
                  </BloodLight>
                </h1>
              </GlitchReveal>
              <GlitchReveal delay={180}>
                <p className="max-w-xl text-xl leading-relaxed text-muted-foreground">
                  You fight a black box. When you lose, you wonder if the server cheated — and you
                  can never prove it. ZEGON is a live demo that games can feel{" "}
                  <span className="text-foreground">real</span>: the AI locks its move on-chain
                  before you act, and you verify the proof after every duel.
                </p>
              </GlitchReveal>
            </div>

            <GlitchReveal delay={270}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <LaunchButton variant="accent" size="lg" className="font-display text-xl tracking-widest">
                  <Crosshair className="size-4" />
                  LAUNCH ZEGON
                  <ArrowRight className="size-4" />
                </LaunchButton>
                <Button variant="outline" size="lg" className="font-display text-xl tracking-widest" asChild>
                  <a href="#why-zegon">THE PROBLEM</a>
                </Button>
              </div>
            </GlitchReveal>
          </div>

          <GlitchEnter>
            <GlitchCard className="overflow-hidden">
              <div className="relative z-0">
                <CommitFlowPreview />
              </div>
            </GlitchCard>
          </GlitchEnter>
        </div>
      </div>
    </section>
  );
}
