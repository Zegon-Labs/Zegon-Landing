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

export type LaunchPhase = "idle" | "shot" | "hold";

interface LaunchContextValue {
  launch: () => void;
  isLaunching: boolean;
  phase: LaunchPhase;
}

const LaunchContext = createContext<LaunchContextValue | null>(null);

export const LAUNCH_SHOT_MS = 1500;
export const LAUNCH_HOLD_MS = 3800;
const LAUNCH_TOTAL_MS = LAUNCH_SHOT_MS + LAUNCH_HOLD_MS;

export function LaunchProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<LaunchPhase>("idle");

  const launch = useCallback(() => {
    if (phase !== "idle") return;

    setPhase("shot");
    document.body.classList.add("launch-active", "shot-shaking");

    window.setTimeout(() => {
      document.body.classList.remove("shot-shaking");
      setPhase("hold");
    }, LAUNCH_SHOT_MS);

    window.setTimeout(() => {
      const gameTab = window.open(GAME_URL, "_blank", "noopener,noreferrer");

      setPhase("idle");
      document.body.classList.remove("launch-active");

      if (!gameTab) {
        window.location.assign(GAME_URL);
      }
    }, LAUNCH_TOTAL_MS);
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
      {phase !== "idle" && <LaunchOverlay phase={phase} holdMs={LAUNCH_HOLD_MS} />}
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
