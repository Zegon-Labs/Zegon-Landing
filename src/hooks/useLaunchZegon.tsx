import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LaunchOverlay } from "@/components/landing/LaunchOverlay";
import { GAME_URL } from "@/lib/utils";

export type LaunchPhase = "idle" | "shot";

interface LaunchContextValue {
  launch: () => void;
  isLaunching: boolean;
  phase: LaunchPhase;
}

const LaunchContext = createContext<LaunchContextValue | null>(null);

export const LAUNCH_SHOT_MS = 380;

export function LaunchProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<LaunchPhase>("idle");

  const launch = useCallback(() => {
    if (phase !== "idle") return;

    const gameTab = window.open(GAME_URL, "_blank");
    if (!gameTab) {
      window.location.assign(GAME_URL);
      return;
    }

    setPhase("shot");
    document.body.classList.add("shot-shaking");

    window.setTimeout(() => {
      try {
        gameTab.focus();
      } catch {
        /* ignore */
      }
      setPhase("idle");
      document.body.classList.remove("shot-shaking");
    }, LAUNCH_SHOT_MS);
  }, [phase]);

  const value = useMemo(
    () => ({
      launch,
      isLaunching: phase !== "idle",
      phase,
    }),
    [launch, phase],
  );

  return (
    <LaunchContext.Provider value={value}>
      {children}
      {phase === "shot" && <LaunchOverlay />}
    </LaunchContext.Provider>
  );
}

export function useLaunchZegon() {
  const ctx = useContext(LaunchContext);
  if (!ctx) {
    throw new Error("useLaunchZegon must be used within LaunchProvider");
  }
  return ctx;
}
