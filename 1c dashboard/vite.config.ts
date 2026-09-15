import path from "path"
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: parseInt(env.VITE_PORT || '3000'),
      proxy: {
        '/api-1c': {
          target: env.VITE_API_TARGET_URL || 'http://31.135.213.133:40090/RES/hs',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-1c/, ''),
        },
      },
    },
  }
})
