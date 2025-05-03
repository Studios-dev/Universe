import { defineConfig, Plugin, PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwind from "@tailwindcss/vite";
import routerBuilder from "./plugins/router.ts";
import { resolve } from "node:path";

// Vite doesn't auto chunk anymore so we need to manually update this based
// on the packages we add that should be omitted from the main app bundle - Bloxs
const chunkRemaps: Record<string, string[]> = {
  "react-vendor": [
    "react",
    "react-dom",
    "react-router",
    "react-router-dom",
    "scheduler",
    "zustand",
    "@tanstack",
  ],
  "utils-vendor": ["clsx", "tailwind-merge", "zod"],
};

const transformedChunkRemap: Record<string, string> = {};

for (const [key, value] of Object.entries(chunkRemaps)) {
  for (const val of value) {
    transformedChunkRemap[val] = key;
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwind(),
    routerBuilder({
      routesPath: "./src/app/",
      exportPath: "./src/router.tsx",
    }),
  ] as (Plugin | PluginOption)[],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const keys = Object.keys(transformedChunkRemap);
          const chunk =
            transformedChunkRemap[keys.find((key) => id.includes(key)) ?? ""];

          if (chunk !== undefined) {
            return chunk;
          }

          if (id.includes("node_modules")) {
            console.log(id);
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    hmr: {
      clientPort: 3000,
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@main": resolve(__dirname),
      "@components": resolve(__dirname, "src/app/components"),
    },
  },
});
