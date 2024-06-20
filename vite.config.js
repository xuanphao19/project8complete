import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3009,
    open: true,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      routes: `${path.resolve(__dirname, "./src/routes/")}`,
      "@component": `${path.resolve(__dirname, "./src/component/")}`,
      "@common": `${path.resolve(__dirname, "./src/component/common/")}`,
    },
  },
});
