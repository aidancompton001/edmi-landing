import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
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
        'variant-b': resolve(__dirname, 'variant-b.html'),
        'variant-c': resolve(__dirname, 'variant-c.html'),
      },
    },
  },
});
