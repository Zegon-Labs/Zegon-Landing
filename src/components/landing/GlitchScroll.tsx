import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface GlitchSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function GlitchSection({ children, className, id }: GlitchSectionProps) {
  const { ref, inView } = useInView<HTMLElement>({
    threshold: 0.05,
    rootMargin: "0px 0px -2% 0px",
    once: true,
  });

  return (
    <section
      ref={ref}
      id={id}
      className={cn("glitch-section relative", inView && "is-visible", className)}
    >
      <div className="glitch-section-flash pointer-events-none absolute inset-0" aria-hidden />
      {children}
    </section>
  );
}

interface GlitchRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}

/** Each instance has its own IO — reveals independently as it enters the viewport. */
export function GlitchReveal({ children, className, delay = 0, style }: GlitchRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.08,
    rootMargin: "0px 0px -4% 0px",
    once: true,
  });

  return (
    <div
      ref={ref}
      className={cn("glitch-reveal", inView && "is-visible", className)}
      style={{ animationDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

interface GlitchStaggerProps {
  children: ReactNode;
  className?: string;
}

/** Children stagger in when this container enters the viewport. */
export function GlitchStagger({ children, className }: GlitchStaggerProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.08,
    rootMargin: "0px 0px -4% 0px",
    once: true,
  });

  return (
    <div ref={ref} className={cn("glitch-stagger", inView && "is-visible", className)}>
      {children}
    </div>
  );
}

interface GlitchTitleProps {
  children: ReactNode;
  className?: string;
}

/** Title with its own IO — glitch-types in when it enters the viewport. */
export function GlitchTitle({ children, className }: GlitchTitleProps) {
  const { ref, inView } = useInView<HTMLHeadingElement>({
    threshold: 0.08,
    rootMargin: "0px 0px -4% 0px",
    once: true,
  });

  return (
    <h2 ref={ref} className={cn("glitch-title", inView && "is-visible", className)}>
      {children}
    </h2>
  );
}

interface GlitchCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GlitchCard({ children, className, delay = 0 }: GlitchCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -5% 0px",
    once: true,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "glitch-card relative is-settled",
        inView && "is-visible",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="blood-light-strip"
        style={{ animationDelay: `${delay / 1000}s` }}
        aria-hidden
      />
      <div className="glitch-card-flash pointer-events-none absolute inset-0 z-10" aria-hidden />
      <div className="glitch-card-rgb pointer-events-none absolute inset-0 z-10" aria-hidden />
      {children}
    </div>
  );
}

/** Standalone block outside a GlitchSection (e.g. hero preview, marquee). */
interface GlitchEnterProps {
  children: ReactNode;
  className?: string;
}

export function GlitchEnter({ children, className }: GlitchEnterProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: "0px 0px -2% 0px",
    once: true,
  });

  return (
    <div ref={ref} className={cn("glitch-enter", inView && "is-visible", className)}>
      {children}
    </div>
  );
}
