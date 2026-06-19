import type { CSSProperties } from "react";

export function LaunchOverlay() {
  return (
    <div
      className="launch-overlay pointer-events-none fixed inset-0 z-[200] overflow-hidden"
      aria-hidden
      role="presentation"
    >
      <div className="shot-red-flash absolute inset-0" />
      <div className="shot-white-core absolute inset-0" />

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="shot-bang font-pixel text-3xl text-bone sm:text-5xl">BANG</p>
      </div>

      <div className="shot-vignette-burst absolute inset-0" />

      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="shot-spark absolute left-1/2 top-1/2"
          style={
            {
              "--spark-angle": `${i * 45}deg`,
              "--spark-delay": `${i * 0.01}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
