import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "VITE_");
  const isProduction = mode === "production";

  return {
    base: isProduction ? env.VITE_APP_DEPLOY_BASE || "/child/react-web/" : "/",
    plugins: [react()],
    server: {
      port: 9001,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    envPrefix: "VITE_",
    test: {
      environment: "jsdom",
      setupFiles: "./src/tests/setup.ts",
    },
  };
});
