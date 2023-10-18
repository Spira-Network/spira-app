import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import iiConfig from './tools/vite-ii-plugin/vite-ii-plugin'

export default defineConfig({
    vite: {
        server: { watch: { ignored: ['**/.dfx/**', '**/dist/**'] } },
        plugins: [iiConfig()],
    },
    integrations: [
        react(),
        tailwind({
            applyBaseStyles: false,
        }),
    ],
})
