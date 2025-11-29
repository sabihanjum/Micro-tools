import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative base for GitHub Pages compatibility
  base: './',
  test: {
    globals: true,
    environment: 'node',
  },
  build: {
    minify: 'esbuild',
    cssMinify: true,
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
