import { createRequire } from 'node:module'
import path from 'node:path'

import type { AstroIntegration, AstroIntegrationLogger } from 'astro'
// import { bgMagenta, black, dim, magenta, yellow } from 'kleur'

const require = createRequire(import.meta.url)
const BASE_URLS = {
    DEV: 'http://localhost:8000/?canisterId=',
    PROD: 'https://identity.ic0.app',
}

const CANISTER_IDS_PATH = path.join(process.cwd(), '.dfx/local/canister_ids.json')
const II_ENV_KEY = 'import.meta.env.PUBLIC_II_URL'

export default (): AstroIntegration => ({
    name: 'astro-ii',
    hooks: {
        'astro:config:setup': async ({ logger, updateConfig }) => {
            const isDev = process.env.NODE_ENV === 'development'
            const internetIdentityUrl = getInternetIdentityUrl(isDev, logger)

            logIdentityDetails(internetIdentityUrl, isDev ? 'development' : 'production')

            updateConfig({
                vite: {
                    define: {
                        [II_ENV_KEY]: JSON.stringify(internetIdentityUrl),
                    },
                },
            })
        },
    },
})

function getInternetIdentityUrl(isDev: boolean, logger: AstroIntegrationLogger): string {
    let url = BASE_URLS.PROD
    if (isDev) {
        try {
            const canisterIds = require(CANISTER_IDS_PATH)
            const iiCanisterId = canisterIds?.internet_identity?.local
            if (iiCanisterId) {
                url = `${BASE_URLS.DEV}${iiCanisterId}`
            }
        } catch {
            logger.error('File canister_ids.json not found, using production internet identity.')
        }
    }
    return url
}

function logIdentityDetails(url: string, env: string) {
    // const identityLabel = bgMagenta(black(' internet-identity '))
    // const environmentLabel = magenta(env)

    const logs = [
        '',
        // `  🆔 ${identityLabel} ${environmentLabel}`,
        `  🆔 internet-identity ${env}`,
        '',
        // `  ${dim('┃')} Service  ${yellow(url)}`,
        `  ┃ Service  ${url}`,
        '',
    ].join('\n')

    console.log(logs)
}
