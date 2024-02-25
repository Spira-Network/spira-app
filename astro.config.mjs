import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

import internetIdentity from './tools/astro-ii-integration'

export default defineConfig({
    vite: {
        server: {
            watch: { ignored: ['**/.dfx/**', '**/dist/**'] },
            proxy: {
                '/api': {
                    target: 'http://localhost:8000',
                    changeOrigin: true,
                },
            },
        },
        define: {
            global: 'globalThis',
        },
    },
    integrations: [
        internetIdentity(),
        react(),
        tailwind({
            applyBaseStyles: false,
        }),
    ],
})
