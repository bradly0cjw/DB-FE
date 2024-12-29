import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  define: {
    'process.env': {
      VUE_APP_API_URL: process.env.VUE_APP_API_URL || 'http://localhost:3000'
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    minify: false,
    terserOptions: {
      compress: false,
      mangle: false,
    }
  },
  manifest: false,
})