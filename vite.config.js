import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    outDir: "dist",
    rollupOptions: {
      input: "./src/main.jsx"
    }
  },
  define: {
    'process.env': process.env
  },
  server: {
    proxy: {
      
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()],
  base:"/"
})
