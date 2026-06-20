import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { GlitchReveal } from "@/components/landing/GlitchScroll";
import { SectionLabel, SectionTitle } from "@/components/landing/ui-primitives";

const LOG_LINES = [
  { type: "sys",   text: "initializing ZEGON v1.0 — 0G Compute node active", step: -1, delay: 0 },
  { type: "sys",   text: "loading match history [24 rounds]...",               step: -1, delay: 700 },
  { type: "zegon", text: "pattern detected — SHOOT x3 · DODGE x2 · FEINT x1", step: 0,  delay: 1500 },
  { type: "zegon", text: "prediction locked → DODGE",                           step: 0,  delay: 2300 },
  { type: "zegon", text: "hash committed on-chain · #0x7f2a...b3c1",            step: 0,  delay: 3000 },
  { type: "you",   text: "...",                                                  step: 1,  delay: 3900 },
  { type: "you",   text: "SHOOT",                                                step: 1,  delay: 4700 },
  { type: "sys",   text: "round closed · both moves open",                       step: 2,  delay: 5500 },
  { type: "sys",   text: "ZEGON: DODGE · YOU: SHOOT → MISS",                    step: 2,  delay: 6100 },
  { type: "sys",   text: "no retroactive changes · proof verifiable on-chain",   step: 3,  delay: 7000 },
];

const TIMELINE = [
  { label: "ZEGON LOCKED IN",      desc: "Move hash committed on-chain before your buttons unlock." },
  { label: "YOU CHOOSE",           desc: "Your pick was not in the model input. Act blind." },
  { label: "REVEAL",               desc: "Both moves open. The round resolves. Hash matches." },
  { label: "NO RETROACTIVE CHANGES", desc: "No edits. Proof verifiable by anyone, forever." },
];

const LINE_COLOR: Record<string, string> = {
  sys:   "text-muted-foreground",
  zegon: "text-accent",
  you:   "text-foreground",
};

const LINE_PREFIX: Record<string, string> = {
  sys:   "sys  :",
  zegon: "zegon>",
  you:   "you  >",
};

const LOOP_PAUSE = 2500;
const LAST_DELAY  = LOG_LINES[LOG_LINES.length - 1].delay;

export function DuelLogSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25, once: false });
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const [activeStep, setActiveStep] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearAll() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function runSequence() {
    clearAll();
    setVisible(new Set());
    setActiveStep(-1);

    LOG_LINES.forEach((line, i) => {
      timers.current.push(
        setTimeout(() => {
          setVisible(prev => new Set([...prev, i]));
          if (line.step >= 0) setActiveStep(line.step);
        }, line.delay),
      );
    });

    // Loop
    timers.current.push(
      setTimeout(runSequence, LAST_DELAY + LOOP_PAUSE),
    );
  }

  useEffect(() => {
    if (inView) {
      runSequence();
    } else {
      clearAll();
      setVisible(new Set());
      setActiveStep(-1);
    }
    return clearAll;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section className="relative border-y border-border/60 py-20 sm:py-28" id="duel-log">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <GlitchReveal>
            <SectionLabel>Behind the duel</SectionLabel>
            <SectionTitle className="max-w-2xl">
              What happens{" "}
              <span className="text-accent">every round.</span>
            </SectionTitle>
          </GlitchReveal>
          <GlitchReveal delay={100}>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              The same sealed loop runs every duel. Watch it unfold in real time.
            </p>
          </GlitchReveal>
        </div>

        <div ref={ref} className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* ── Left: console log ── */}
          <div className="cyber-panel min-h-[340px] p-5 font-code text-[13px] leading-6">
            {/* Fake title bar */}
            <div className="mb-4 flex items-center gap-1.5 border-b border-border/40 pb-3">
              <span className="size-2.5 rounded-full bg-accent/70" />
              <span className="size-2.5 rounded-full bg-border/50" />
              <span className="size-2.5 rounded-full bg-border/50" />
              <span className="ml-2 text-[10px] uppercase tracking-widest text-muted-foreground/60">
                duel_log.zegon
              </span>
            </div>

            <div className="space-y-1">
              {LOG_LINES.map((line, i) => (
                <div
                  key={i}
                  className={`flex gap-3 transition-opacity duration-200 ${
                    visible.has(i) ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className={`shrink-0 ${LINE_COLOR[line.type]}`}>
                    {LINE_PREFIX[line.type]}
                  </span>
                  <span className={line.type === "you" ? "text-foreground" : "text-muted-foreground"}>
                    {line.text}
                  </span>
                </div>
              ))}

              {/* Blinking cursor while sequence is running */}
              {visible.size > 0 && visible.size < LOG_LINES.length && (
                <div className="flex gap-3">
                  <span className="shrink-0 text-muted-foreground/30">sys  :</span>
                  <span className="animate-pulse text-accent">▋</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: vertical timeline ── */}
          <div className="flex flex-col">
            {TIMELINE.map((item, i) => (
              <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                {/* Connector line */}
                {i < TIMELINE.length - 1 && (
                  <div
                    className={`absolute left-[8px] top-5 w-px transition-all duration-500 ${
                      activeStep > i ? "bg-accent/60" : "bg-border/40"
                    }`}
                    style={{ height: "calc(100% - 4px)" }}
                  />
                )}

                {/* Dot */}
                <div
                  className={`relative z-10 mt-1 size-[18px] shrink-0 rounded-full border-2 transition-all duration-500 ${
                    activeStep >= i
                      ? "border-accent bg-accent/20 shadow-[0_0_10px_var(--color-accent)]"
                      : "border-border/40 bg-background"
                  }`}
                />

                {/* Text */}
                <div>
                  <p
                    className={`font-code text-[11px] uppercase tracking-widest transition-colors duration-500 ${
                      activeStep >= i ? "text-accent" : "text-muted-foreground/40"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`mt-1 text-xs leading-relaxed transition-colors duration-500 ${
                      activeStep >= i ? "text-muted-foreground" : "text-muted-foreground/25"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
