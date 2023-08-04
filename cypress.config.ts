import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import * as path from "path";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on) {
      on(
        "file:preprocessor",
        vitePreprocessor({
          configFile: path.resolve("./vite.config.ts"),
        })
      );
    },
    viewportWidth: 375,
    viewportHeight: 812,
  },
});
