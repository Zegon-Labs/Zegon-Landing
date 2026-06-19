import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { LaunchButton } from "@/components/landing/LaunchButton";
import { BloodLightDot } from "@/components/landing/ui-primitives";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#why-zegon", label: "The problem" },
  { href: "#how-it-works", label: "Use case" },
  { href: "#0g", label: "0G" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="group flex items-center gap-2">
          <span className="font-display text-2xl tracking-[0.2em] text-foreground transition-colors group-hover:text-primary">
            ZEGON
          </span>
          <BloodLightDot className="hidden sm:block" flickerDelay={0.2} />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-code text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <LaunchButton variant="accent" size="sm" className="font-code text-[11px] tracking-widest">
            Launch ZEGON
            <ArrowRight className="size-3.5" />
          </LaunchButton>
        </div>

        <button
          type="button"
          className="p-2 text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/50 bg-background transition-all md:hidden",
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-code px-3 py-2 text-sm uppercase tracking-widest text-muted-foreground hover:bg-secondary hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <LaunchButton
            variant="accent"
            className="mt-2 font-code tracking-widest"
            onClick={() => setOpen(false)}
          >
            Launch ZEGON
          </LaunchButton>
        </nav>
      </div>
    </header>
  );
}
