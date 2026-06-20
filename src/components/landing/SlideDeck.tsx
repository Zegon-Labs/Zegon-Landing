import { useCallback, useEffect, useRef, useState } from "react";

const TRANSITION_MS = 700;
const DEBOUNCE_MS = 850;

export interface SlideSpec {
  id: string;
  label: string;
  node: React.ReactNode;
}

interface SlideDeckProps {
  slides: SlideSpec[];
}

export function SlideDeck({ slides }: SlideDeckProps) {
  const [current, setCurrent] = useState(0);
  const [glitchFlash, setGlitchFlash] = useState(false);
  const currentRef = useRef(0);
  const lockedRef = useRef(false);
  const lastScrollRef = useRef(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [degraded] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });

  // Lock body scroll in slide mode
  useEffect(() => {
    if (degraded) return;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [degraded]);

  const goTo = useCallback(
    (next: number) => {
      if (lockedRef.current) return;
      if (next === currentRef.current) return;
      if (next < 0 || next >= slides.length) return;

      const prev = currentRef.current;
      lockedRef.current = true;
      currentRef.current = next;
      setCurrent(next);
      setGlitchFlash(true);

      setTimeout(() => setGlitchFlash(false), 160);
      setTimeout(() => {
        lockedRef.current = false;
        // Reset scroll position of the slide we just left
        const outgoing = slideRefs.current[prev];
        if (outgoing) outgoing.scrollTop = 0;
      }, TRANSITION_MS + 80);
    },
    [slides.length],
  );

  // Wheel handler
  useEffect(() => {
    if (degraded) return;

    const onWheel = (e: WheelEvent) => {
      const active = slideRefs.current[currentRef.current];

      // If the slide has overflowing content, let the browser scroll it
      // naturally until the user reaches the boundary — only then intercept.
      if (active && active.scrollHeight > active.clientHeight + 4) {
        if (e.deltaY > 0 && active.scrollTop + active.clientHeight < active.scrollHeight - 4) {
          return; // let browser scroll the slide div
        }
        if (e.deltaY < 0 && active.scrollTop > 4) {
          return; // let browser scroll the slide div
        }
      }

      // At boundary (or no overflow) — take over and advance the slide.
      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollRef.current < DEBOUNCE_MS) return;

      lastScrollRef.current = now;
      if (e.deltaY > 0) goTo(currentRef.current + 1);
      else goTo(currentRef.current - 1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [degraded, goTo]);

  // Keyboard handler
  useEffect(() => {
    if (degraded) return;

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(currentRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(currentRef.current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(slides.length - 1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [degraded, goTo, slides.length]);

  // Intercept anchor-link nav (#id clicks → slide navigation)
  useEffect(() => {
    if (degraded) return;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href")?.slice(1);
      if (!hash) return;
      const idx = slides.findIndex((s) => s.id === hash);
      if (idx !== -1) {
        e.preventDefault();
        goTo(idx);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [degraded, goTo, slides]);

  // ── Degraded mode: normal scroll ──────────────────────────────────────
  if (degraded) {
    return (
      <div className="relative min-h-screen">
        {slides.map((s) => (
          <div key={s.id} id={s.id}>
            {s.node}
          </div>
        ))}
      </div>
    );
  }

  // ── Slide-jacking mode ────────────────────────────────────────────────
  return (
    <>
      {/* Slide container */}
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {slides.map((slide, i) => {
          const offset = i - current;
          const isActive = offset === 0;

          return (
            <div
              key={slide.id}
              id={slide.id}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              aria-hidden={!isActive || undefined}
              className="absolute inset-0 overflow-y-auto"
              style={{
                transform: `translateY(${offset * 100}%)`,
                opacity: isActive ? 1 : 0,
                transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.76,0,0.24,1), opacity ${Math.round(TRANSITION_MS * 0.7)}ms ease`,
                willChange: Math.abs(offset) <= 1 ? "transform, opacity" : "auto",
                pointerEvents: isActive ? "auto" : "none",
                scrollBehavior: "auto", // instant scrollTop so boundary check is accurate
              }}
            >
              {slide.node}
            </div>
          );
        })}
      </div>

      {/* Glitch flash on slide change */}
      {glitchFlash && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 slide-glitch-flash"
          style={{ zIndex: 9 }}
        />
      )}

      {/* Progress indicator */}
      <nav
        aria-label="Slide navigation"
        className="fixed right-3 top-1/2 z-[48] -translate-y-1/2 flex flex-col items-center gap-[5px]"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            title={slide.label}
            aria-label={`${slide.label} — slide ${i + 1} of ${slides.length}`}
            aria-current={i === current ? "step" : undefined}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "h-4 w-[3px] bg-accent"
                : "h-[5px] w-[3px] bg-foreground/15 hover:bg-accent/45"
            }`}
            style={
              i === current
                ? { boxShadow: "0 0 8px rgba(179,18,43,0.9), 0 0 16px rgba(232,24,58,0.4)" }
                : undefined
            }
          />
        ))}

        {/* XX / YY counter */}
        <div className="mt-3 flex flex-col items-center gap-[3px]">
          <span className="font-code text-[8px] tracking-widest text-accent/70">
            {String(current + 1).padStart(2, "0")}
          </span>
          <div className="h-px w-2.5 bg-border/50" />
          <span className="font-code text-[8px] tracking-widest text-muted-foreground/30">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </nav>
    </>
  );
}
