// @ts-check
import { defineConfig } from 'astro/config'
import { webcore } from 'webcoreui/integration'

import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [webcore()],
  adapter: cloudflare(),
  output: 'server',

  vite: {
    plugins: [tailwindcss()],
  },
})