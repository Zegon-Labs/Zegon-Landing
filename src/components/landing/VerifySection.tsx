import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlitchCard, GlitchReveal, GlitchSection } from "@/components/landing/GlitchScroll";
import { BloodLight, CyberPanel, SectionLabel, SectionTitle } from "@/components/landing/ui-primitives";
import { GAME_URL } from "@/lib/utils";

const VERIFY_RESPONSE = `{
  "commit": {
    "hash": "0x7f3a…c91e",
    "beforePlayerMove": true
  },
  "attestation": {
    "inputScope": "history_only",
    "verified": true
  }
}`;

export function VerifySection() {
  return (
    <GlitchSection className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <GlitchReveal>
            <SectionLabel>After the duel</SectionLabel>
            <SectionTitle>
              Don&apos;t trust us.
              <br />
              <BloodLight className="text-accent" flickerDelay={0.7}>
                Check the proof.
              </BloodLight>
            </SectionTitle>
            <p className="mt-4 text-muted-foreground">
              When the fight ends, VERIFY shows whether ZEGON committed before you moved and
              whether the sealed model only saw your history. That is the product difference
              players and judges can actually test.
            </p>
            <Button variant="outline" className="mt-8 font-code tracking-widest" asChild>
              <a href={`${GAME_URL}/verify.html`} target="_blank" rel="noopener noreferrer">
                OPEN VERIFY
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </GlitchReveal>

          <GlitchCard className="overflow-hidden">
            <CyberPanel
              className="relative z-0 overflow-hidden p-0 font-code text-[12px] leading-relaxed"
              hover="none"
              bloodLight
            >
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5 text-[10px] text-dust">
                <span>GET /api/duel/&#123;id&#125;/verify</span>
                <BloodLight className="text-primary" flickerDelay={1.8}>
                  200 OK
                </BloodLight>
              </div>
              <pre className="overflow-x-auto p-4 text-primary/90">
                <code>{VERIFY_RESPONSE}</code>
              </pre>
            </CyberPanel>
          </GlitchCard>
        </div>
      </div>
    </GlitchSection>
  );
}
