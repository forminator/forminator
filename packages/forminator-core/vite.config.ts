import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import packageJson from './package.json';

const external = [
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.peerDependencies ?? {}),
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ outputDir: path.resolve(__dirname, './.cache/dts') }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ForminatorCore',
      fileName: (format) => `forminator-core.${format}.js`,
    },
    rollupOptions: {
      external,
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
