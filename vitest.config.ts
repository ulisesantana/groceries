import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    includeSource: ["src/**/*.{ts,tsx}"],
    setupFiles: "src/test.setup.ts",
  },
});
