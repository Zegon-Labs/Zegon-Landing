import { useEffect, useState } from "react";
import { Check, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BloodLight, CyberPanel } from "@/components/landing/ui-primitives";

type Phase = "committed" | "your-turn" | "reveal";

const PHASES: { id: Phase; label: string; detail: string }[] = [
  {
    id: "committed",
    label: "ZEGON locked in",
    detail: "Move hash on-chain. Timestamp frozen.",
  },
  {
    id: "your-turn",
    label: "You choose",
    detail: "Your pick was not in the model input.",
  },
  {
    id: "reveal",
    label: "Reveal",
    detail: "Both moves open. Round resolves.",
  },
];

export function CommitFlowPreview() {
  const [phase, setPhase] = useState<Phase>("committed");

  useEffect(() => {
    const order: Phase[] = ["committed", "your-turn", "reveal"];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % order.length;
      setPhase(order[i]!);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <CyberPanel className="relative overflow-hidden p-0" hover="none" bloodLight>
      <div className="absolute inset-0 noise pointer-events-none opacity-60" />

      <div className="relative border-b border-border/60 px-4 py-3">
        <Badge variant="outline" className="font-code text-[9px] tracking-widest">
          ROUND FLOW
        </Badge>
      </div>

      <div className="relative space-y-6 p-5">
        <div className="space-y-3">
          {PHASES.map((item) => {
            const active = item.id === phase;
            const done =
              (phase === "your-turn" && item.id === "committed") ||
              (phase === "reveal" && item.id !== "reveal");

            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 border px-3 py-3 transition-all duration-500 ${
                  active
                    ? "border-primary/50 bg-primary/5 shadow-[0_0_20px_-8px_rgba(232,24,58,0.25)]"
                    : done
                      ? "border-border/40 bg-secondary/20 opacity-70"
                      : "border-border/30 opacity-40"
                }`}
              >
                <div
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center border ${
                    done
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : active
                        ? "border-accent/50 bg-accent/10 text-accent"
                        : "border-border/50 text-muted-foreground"
                  }`}
                >
                  {done ? <Check className="size-3.5" /> : <Lock className="size-3.5" />}
                </div>
                <div>
                  <p className="font-code text-[11px] uppercase tracking-widest">
                    {active ? (
                      <BloodLight className="text-accent" flickerDelay={0.4}>
                        {item.label}
                      </BloodLight>
                    ) : (
                      item.label
                    )}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border border-accent/30 bg-accent/5 px-3 py-3">
          <p className="font-code text-[10px] uppercase tracking-widest">
            <BloodLight className="text-accent" flickerDelay={1.6}>
              No retroactive changes
            </BloodLight>
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            ZEGON cannot wait for your input and swap its move. The chain timestamp proves it
            committed first.
          </p>
        </div>
      </div>
    </CyberPanel>
  );
}
