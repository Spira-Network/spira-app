import { createRequire } from 'module'
import path from 'node:path'
import type { ConfigEnv, UserConfig } from 'vite'

const require = createRequire(import.meta.url)
const BASE_URLS = {
    DEV: 'http://localhost:8000/?canisterId=',
    PROD: 'https://identity.ic0.app',
}
const CANISTER_IDS_PATH = path.join(process.cwd(), '.dfx/local/canister_ids.json')
const II_ENV_KEY = 'import.meta.env.PUBLIC_II_URL'

export default function iiConfig() {
    return {
        name: 'vite-ii-config',
        async config(cfg: UserConfig, env: ConfigEnv) {
            const isDev = env.mode === 'development'
            let internetIdentityUrl = BASE_URLS.PROD

            if (isDev) {
                try {
                    const canisterIds = require(CANISTER_IDS_PATH)
                    const iiCanisterId = canisterIds?.internet_identity?.local
                    if (iiCanisterId) {
                        internetIdentityUrl = `${BASE_URLS.DEV}${iiCanisterId}`
                    }
                } catch {
                    console.error('Failed to load canister_ids.json. Using production internet identity.')
                }
            }

            console.log(`🆔 Using internet identity at ${internetIdentityUrl}\n`)

            return {
                ...cfg,
                define: {
                    ...cfg.define,
                    [II_ENV_KEY]: JSON.stringify(internetIdentityUrl),
                },
            }
        },
    }
}
