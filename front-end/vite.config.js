import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { themeColors } from './src/styles/theme';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': themeColors.accent,
          'layout-body-background': themeColors.light,
          'layout-header-background': themeColors.default,
          'body-background': themeColors.light,
          'component-background': themeColors.default,
          'background-color-light': themeColors.defaultLight,
          'menu-item-active-bg': themeColors.defaultLight,
        },
        javascriptEnabled: true,
      },
    },
  },
});
