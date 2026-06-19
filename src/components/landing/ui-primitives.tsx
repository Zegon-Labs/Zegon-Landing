import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BloodLightProps {
  children: ReactNode;
  className?: string;
  /** Offset in seconds so lights don't flicker in sync */
  flickerDelay?: number;
}

export function BloodLight({ children, className }: BloodLightProps) {
  return <span className={cn("text-glow-blood", className)}>{children}</span>;
}

interface BloodLightDotProps {
  className?: string;
  flickerDelay?: number;
}

export function BloodLightDot({ className }: BloodLightDotProps) {
  return (
    <span
      className={cn("blood-light-dot inline-block size-1.5 rounded-full bg-accent", className)}
      aria-hidden
    />
  );
}

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
  flickerDelay?: number;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "font-display mb-3 text-base uppercase tracking-[0.25em] text-accent text-glow-blood",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "font-pixel text-xl leading-[1.5] sm:text-2xl lg:text-3xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

interface CyberPanelProps {
  children: ReactNode;
  className?: string;
  hover?: "cyan" | "ember" | "none";
  bloodLight?: boolean;
  flickerDelay?: number;
}

export function CyberPanel({
  children,
  className,
  hover = "ember",
  bloodLight = false,
  flickerDelay = 0,
}: CyberPanelProps) {
  return (
    <div
      className={cn(
        "cyber-panel p-6",
        bloodLight && "cyber-panel-blood-light",
        hover === "cyan" && "cyber-hover",
        hover === "ember" && "cyber-hover-ember",
        className,
      )}
      style={
        bloodLight
          ? ({ "--blood-flicker-delay": `${flickerDelay}s` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
