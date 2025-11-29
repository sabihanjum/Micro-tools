import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative base for GitHub Pages compatibility
  base: './',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    pool: 'forks',
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
