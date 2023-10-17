import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import canisterIds from './.dfx/local/canister_ids.json'

const isDev = process.env.NODE_ENV === 'development'

const baseIdentityUrlDev = 'http://127.0.0.1:8000/?canisterId='
const baseIdentityUrlProd = 'https://identity.ic0.app'

let finalIdentityUrl = baseIdentityUrlProd
if (isDev) {
    const iiCanisterId = canisterIds.internet_identity.local
    finalIdentityUrl = baseIdentityUrlDev + iiCanisterId
}

export default defineConfig({
    vite: {
        server: {
            watch: {
                ignored: ['**/.dfx/**', '**/dist/**'],
            },
        },
        define: {
            'import.meta.env.PUBLIC_II_URL': JSON.stringify(finalIdentityUrl),
        },
    },
    integrations: [
        react(),
        tailwind({
            applyBaseStyles: false,
        }),
    ],
})
