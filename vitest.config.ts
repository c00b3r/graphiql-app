import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { config } from 'dotenv';

config({ path: '.env.test' });

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/config/config.ts'],
    exclude: ['.next', 'node_modules', './next.config.mjs', './jest-setup.js'],
    // include: ['src/**/*.ts', 'src/**/*.tsx'], // Включаем только файлы .ts и .tsx из папки src
    // exclude: ['**/*.spec.ts', '**/*.test.ts'], // Исключаем тестовые файлы (если необходимо)
  },
});
