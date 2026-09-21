import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/tokens" as *;
          @use "@/styles/utilities" as *;
          @use "@/styles/animations" as *;
        `,
      },
    },
  },
})
