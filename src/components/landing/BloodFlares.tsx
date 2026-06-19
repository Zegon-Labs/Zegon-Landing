import { cn } from "@/lib/utils";

const FLARES = [
  { className: "left-[8%] top-[18%] h-32 w-32", delay: "0s", duration: "4s" },
  { className: "right-[12%] top-[35%] h-24 w-24", delay: "1.2s", duration: "5s" },
  { className: "left-[45%] top-[55%] h-40 w-40", delay: "2.5s", duration: "6s" },
  { className: "right-[25%] bottom-[20%] h-28 w-28", delay: "0.8s", duration: "4.5s" },
  { className: "left-[20%] bottom-[30%] h-20 w-20", delay: "3s", duration: "5.5s" },
];

export function BloodFlares() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {FLARES.map((flare, i) => (
        <div
          key={i}
          className={cn("blood-flare absolute rounded-full", flare.className)}
          style={{
            animationDelay: flare.delay,
            animationDuration: flare.duration,
          }}
        />
      ))}
      <div className="blood-vignette absolute inset-0" />
      <div className="blood-flash-overlay absolute inset-0" />
    </div>
  );
}
