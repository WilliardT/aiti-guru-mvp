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
  }
});
