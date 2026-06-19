import { Cpu, Database, Link2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlitchCard, GlitchReveal, GlitchSection } from "@/components/landing/GlitchScroll";
import { BloodLight, CyberPanel, SectionLabel, SectionTitle } from "@/components/landing/ui-primitives";

const PILLARS = [
  {
    icon: Cpu,
    name: "0G Compute",
    text: "Runs the blind model inside a TEE. Proves inference used history only, not your live input.",
  },
  {
    icon: Link2,
    name: "0G Chain",
    text: "Stores the commit before you act. Proves ZEGON could not change its move after seeing yours.",
  },
  {
    icon: Database,
    name: "0G Storage",
    text: "Keeps attestations and duel data for the VERIFY flow. Proof survives our servers.",
  },
];

export function OgSection() {
  return (
    <GlitchSection id="0g" className="relative border-y border-border/60 bg-ash/30 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <GlitchReveal>
          <div className="flex flex-wrap items-center gap-2">
            <SectionLabel className="mb-0">Built on 0G</SectionLabel>
            <Badge variant="cyan" className="font-code text-[9px] tracking-widest">
              ZERO CUP
            </Badge>
          </div>
          <SectionTitle className="mt-3 max-w-3xl">
            0G is what makes the{" "}
            <BloodLight className="text-accent" flickerDelay={1.2}>
              no-cheat claim
            </BloodLight>{" "}
            real.
          </SectionTitle>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            A fair AI duel is not a UI trick. It needs sealed inference plus a public commit before
            the player moves. That stack is what we ship in every real round.
          </p>
        </GlitchReveal>

        <GlitchCard className="mt-10 overflow-hidden">
          <CyberPanel className="relative z-0 border-primary/20 bg-primary/5" hover="none" bloodLight>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Without 0G, &quot;the AI picked first&quot; is marketing copy. With 0G, it is a
                timestamp on-chain and an attestation you can open after the duel.
              </p>
            </div>
          </CyberPanel>
        </GlitchCard>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <GlitchCard key={pillar.name} className="overflow-hidden">
              <CyberPanel className="group relative z-0 h-full" bloodLight flickerDelay={index * 0.9}>
                <div className="mb-4 flex size-11 items-center justify-center border border-primary/30 bg-primary/5 text-primary">
                  <pillar.icon className="size-5" />
                </div>
                <h3 className="text-lg font-bold">
                  <BloodLight className="text-foreground" flickerDelay={index * 1.1 + 0.4}>
                    {pillar.name}
                  </BloodLight>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{pillar.text}</p>
              </CyberPanel>
            </GlitchCard>
          ))}
        </div>
      </div>
    </GlitchSection>
  );
}
