import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        product: resolve(__dirname, 'product.html'),
        support: resolve(__dirname, 'support.html'),
      },
    },
  },
});
