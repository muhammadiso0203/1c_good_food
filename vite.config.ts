import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://94.158.53.85:40318',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/Good_Food/hs'),
      },
    },
  },
})
