import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  build: { format: "directory" },
  vite: { cacheDir: fileURLToPath(new URL("./.astro/vite", import.meta.url)) },
});
