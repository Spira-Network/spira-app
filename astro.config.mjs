import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import internetIdentity from './tools/astro-ii-integration'

export default defineConfig({
    vite: {
        server: { watch: { ignored: ['**/.dfx/**', '**/dist/**'] } },
    },
    integrations: [
        internetIdentity(),
        react(),
        tailwind({
            applyBaseStyles: false,
        }),
    ],
})
