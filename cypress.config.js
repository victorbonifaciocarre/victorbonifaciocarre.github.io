import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/commands.js",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
