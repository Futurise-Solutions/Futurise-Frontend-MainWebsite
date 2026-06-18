/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split always-loaded vendor libs into stable, long-cacheable chunks so
        // app-code deploys don't bust the (large) framework bundle in browsers.
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "chakra-vendor": ["@chakra-ui/react", "@emotion/react", "@emotion/styled"],
          "motion-vendor": ["framer-motion"],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: false,
    exclude: ['node_modules', 'dist'],
  },
})
