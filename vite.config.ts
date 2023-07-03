import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'docs'
  },
  base: '/loan-calculator/',
  resolve: {
    alias: {
      '@styles': '/src/common/styles',
      '@assets': '/src/assets'
    }
  },
  plugins: [react()],
})
