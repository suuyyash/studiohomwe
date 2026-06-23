import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        faucets: resolve(__dirname, 'faucets.html'),
        sanitaryware: resolve(__dirname, 'sanitaryware.html'),
        showers: resolve(__dirname, 'showers.html'),
        wellness: resolve(__dirname, 'wellness.html'),
        vanity: resolve(__dirname, 'vanity.html'),
        tiles: resolve(__dirname, 'tiles.html'),
        smart: resolve(__dirname, 'smart.html'),
        accessories: resolve(__dirname, 'accessories.html'),
        pdp_toilet: resolve(__dirname, 'product-smart-toilet.html'),
        pdp_tub: resolve(__dirname, 'product-freestanding-tub.html'),
        pdp_mixer: resolve(__dirname, 'product-architectural-mixer.html')
      }
    }
  }
})
