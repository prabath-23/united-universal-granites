import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/united-universal-granites/',
  plugins: [vue()],
  build: {
    outDir: 'docs',
  },
  server: {
    port: 5190,
    strictPort: true,
  },
})
