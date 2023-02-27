import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/]
    }),
    svgLoader({
      svgo: false
    })
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@@/': `${path.resolve(__dirname, 'src/components')}/`,
      '@common': `${path.resolve(__dirname, 'src/components/common')}/`,
      '@assets/': `${path.resolve(__dirname, 'src/assets')}/`,
      '@images/': `${path.resolve(__dirname, 'src/assets/images')}/`,
      '@compose/': `${path.resolve(__dirname, 'src/composables')}/`
    }
  }
})
