import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: ["react-pdf"],
  },
  build: {
    commonjsOptions: {
      include: [/react-pdf/, /node_modules/],
    },
  },
  server: {
    // proxy: {
    //   "/auth": {
    //     target: "https://backend-foo-talent.onrender.com",
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/auth/, "/auth"),
    //   },
    //   "/api": {
    //     target: "https://firebasestorage.googleapis.com",
    //     changeOrigin: true,
    //     secure: false,
    //     configure: (proxy, _options) => {
    //       proxy.on("proxyReq", (proxyReq, _req, _res) => {
    //         proxyReq.removeHeader("cache-control");
    //       });
    //     },
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
});
