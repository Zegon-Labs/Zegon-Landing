import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { GlitchCard, GlitchReveal, GlitchSection } from "@/components/landing/GlitchScroll";
import { BloodLight, SectionLabel, SectionTitle } from "@/components/landing/ui-primitives";
import { cn } from "@/lib/utils";

const FAQ = [
  {
    q: "How is this different from other AI games?",
    a: "Most AI opponents run on opaque servers. ZEGON commits its move on-chain before you act and lets you verify the sealed model never received your current pick.",
  },
  {
    q: "Does ZEGON see my current move?",
    a: "No. Inference input is your action history and duel state only. Your live pick is excluded by design and checked via TEE attestation.",
  },
  {
    q: "Why commit before I play?",
    a: "So ZEGON cannot react to your button press. The on-chain timestamp proves its move was locked first. Reveal after you choose closes the loop.",
  },
  {
    q: "How do I win?",
    a: "It is a pattern duel. ZEGON gets better at reading repeated habits. Stay unpredictable, force wrong reads, and outlast the blind gunslinger.",
  },
  {
    q: "What does 0G add?",
    a: "Sealed inference on Compute, commit-reveal on Chain, persisted proof on Storage. Together they turn fair AI from a claim into something auditable.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <GlitchSection id="faq" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <GlitchReveal className="text-center">
          <SectionLabel className="text-center">FAQ</SectionLabel>
          <SectionTitle>
            <BloodLight className="text-accent" flickerDelay={0.5}>
              Fair duel.
            </BloodLight>{" "}
            Plain answers.
          </SectionTitle>
        </GlitchReveal>

        <div className="mt-12 space-y-2">
          {FAQ.map((item, index) => (
            <GlitchCard
              key={item.q}
              className="overflow-hidden border border-border/60 bg-card transition-colors hover:border-primary/30"
            >
              <button
                type="button"
                className="relative z-0 flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span className="font-medium">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform",
                    open === index && "rotate-180 text-primary",
                  )}
                />
              </button>
              <div
                className={cn(
                  "relative z-0 overflow-hidden transition-all duration-300",
                  open === index ? "max-h-52 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <p className="border-t border-border/40 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            </GlitchCard>
          ))}
        </div>
      </div>
    </GlitchSection>
  );
}
