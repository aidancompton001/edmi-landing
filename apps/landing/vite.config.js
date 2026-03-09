import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/edmi-landing/' : '/',
  plugins: [tailwindcss()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'variant-a': resolve(__dirname, 'variant-a.html'),
        'variant-a-light': resolve(__dirname, 'variant-a-light.html'),
        'variant-b': resolve(__dirname, 'variant-b.html'),
        'variant-c': resolve(__dirname, 'variant-c.html'),
        'variant-d': resolve(__dirname, 'variant-d.html'),
        'variant-e': resolve(__dirname, 'variant-e.html'),
        'variant-f': resolve(__dirname, 'variant-f.html'),
      },
    },
  },
});
