import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@core/styles/variables': path.resolve(__dirname, './src/core/styles/variables.scss'),
      '@core': `${path.resolve(__dirname, './src/core/')}`,
      '@assets': `${path.resolve(__dirname, './src/assets/')}`,
      '@public': `${path.resolve(__dirname, './public/')}`,
      '@shared': `${path.resolve(__dirname, './src/shared/')}`,
      '@modules': `${path.resolve(__dirname, './src/modules/')}`,
      '@pages': `${path.resolve(__dirname, './src/pages/')}`
    }
  },
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        useFlatConfig: true,
      }
    })
  ],
  css: {
    devSourcemap: true
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return;
          }

          if (id.includes('ag-grid-community') || id.includes('ag-grid-react')) {
            return 'ag-grid';
          }

          if (id.includes('@mui') || id.includes('@emotion')) {
            return 'mui';
          }

          if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
            return 'redux';
          }

          if (id.includes('react-toastify')) {
            return 'toastify';
          }

          if (id.includes('axios')) {
            return 'http';
          }

          return 'vendor';
        },
      },
    },
  },
});
