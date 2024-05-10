import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from "path";
//import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5000',
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^api': ''
    //     }
    //   },
    // }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    //eslintPlugin({ include: ['src/**/*.vue', 'src/*.vue'] })
  ]
});
