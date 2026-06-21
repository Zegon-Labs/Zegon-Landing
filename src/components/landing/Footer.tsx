import { ExternalLink } from "lucide-react";
import { BloodLight } from "@/components/landing/ui-primitives";
import { GAME_URL } from "@/lib/utils";

const LINKS = {
  product: [
    { label: "The problem", href: "#why-zegon" },
    { label: "Use case", href: "#how-it-works" },
    { label: "0G", href: "#0g" },
    { label: "FAQ", href: "#faq" },
  ],
  resources: [
    { label: "0G Network", href: "https://0g.ai", external: true },
    { label: "Launch Game", href: GAME_URL, external: true },
    { label: "Verify", href: `${GAME_URL}/verify.html`, external: true },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-ash/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img
              src="/logo_text.png"
              alt="ZEGON"
              className="h-12 w-auto object-contain mix-blend-screen sm:h-14"
            />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              A use case for provably fair AI gaming. Play the duel, then verify it wasn&apos;t
              rigged.
            </p>
          </div>

          <div>
            <p className="font-code text-[10px] uppercase tracking-widest text-dust">Links</p>
            <ul className="mt-4 space-y-2">
              {LINKS.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-code text-[10px] uppercase tracking-widest text-dust">Resources</p>
            <ul className="mt-4 space-y-2">
              {LINKS.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    {link.external && (
                      <ExternalLink className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
          <p className="font-code text-[10px] uppercase tracking-[0.2em] text-dust">
            © {new Date().getFullYear()} ZEGON
          </p>
          <p className="font-code text-[10px] uppercase tracking-[0.15em] text-dust">
            IT CAN&apos;T SEE YOU ·{" "}
            <BloodLight className="text-accent" flickerDelay={2.1}>
              FEEL THE STAKES
            </BloodLight>
          </p>
        </div>
      </div>
    </footer>
  );
}
