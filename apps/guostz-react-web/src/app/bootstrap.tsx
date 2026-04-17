import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";

import { App } from "@/app/App";
import { AppProviders } from "@/app/providers";
import "@/styles/index.css";

type MountOptions = {
  basename?: string;
};

type MountedApp = {
  root: Root;
  unmount: () => void;
};

export function mountApp(container: Element, options: MountOptions = {}): MountedApp {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <AppProviders>
        <App basename={options.basename ?? "/"} />
      </AppProviders>
    </StrictMode>,
  );

  return {
    root,
    unmount: () => {
      root.unmount();
    },
  };
}
