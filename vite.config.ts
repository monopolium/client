import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [svelte()],

    server: {
      port: parseInt(process.env.PORT ?? '8000'),
    },
  }
})
