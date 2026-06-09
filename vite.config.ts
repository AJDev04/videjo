import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    // lenis raakt window/document aan; bundelen voor de SSR-build
    noExternal: ["lenis"],
  },
});
