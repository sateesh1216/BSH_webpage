import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Generates dist/stats.html after build — opens automatically.
    // Remove or comment out once you're done analyzing bundle size.
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "dist/stats.html",
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    target: "esnext",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react-router-dom") ||
              id.includes("/react-dom/") ||
              id.includes("/react/")
            ) {
              return "react-vendor";
            }
            if (id.includes("lucide-react")) {
              return "icons-vendor";
            }
            if (id.includes("framer-motion")) {
              return "motion-vendor";
            }
            if (id.includes("leaflet")) {
              return "map-vendor";
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});