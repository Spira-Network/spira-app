import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

const isDev = process.env.NODE_ENV === 'development'

const canisterIds =
    isDev &&
    (() => {
        try {
            return import('./.dfx/local/canister_ids.json')
        } catch {
            throw 'Failed to load canisterIds.'
        }
    })()

const baseUrls = {
    dev: 'http://127.0.0.1:8000/?canisterId=',
    prod: 'https://identity.ic0.app',
}

const iiCanisterId = canisterIds?.internet_identity?.local
const finalIdentityUrl = isDev && iiCanisterId ? `${baseUrls.dev}${iiCanisterId}` : baseUrls.prod

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
