import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { LaunchProvider } from "./hooks/useLaunchZegon";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LaunchProvider>
      <App />
    </LaunchProvider>
  </StrictMode>,
);
