import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // fixed dev server port
    port: 9999,
    // if port is busy, fail rather than pick another port
    strictPort: true,
    // allow network access (useful for testing on devices)
    host: true,
  },
})

