import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "${path.resolve(import.meta.dirname, './src/app/styles/variables').replace(/\\/g, '/')}" as *;
          @use "${path.resolve(import.meta.dirname, './src/app/styles/breakpoints').replace(/\\/g, '/')}" as *;
        `,
      },
    },
  },
})
