import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true, // allows us to use vitest library methods in unit test without explicit imports
    environment: "jsdom",
    setupFiles: "./setup-test.ts", // path to setup file
  },
});
