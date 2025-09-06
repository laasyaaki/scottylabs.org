import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
// import Inspect from "vite-plugin-inspect";
import { reactRouter } from "@react-router/dev/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    reactRouter(),
    ViteImageOptimizer({
      jpg: {
        quality: 90,
      },
    }),
    // Inspect({
    //   build: true,
    //   outputDir: ".vite-inspect",
    // }),
  ],
  ssr: {
    noExternal: ["posthog-js", "posthog-js/react"], // https://posthog.com/docs/libraries/remix
  },
});
