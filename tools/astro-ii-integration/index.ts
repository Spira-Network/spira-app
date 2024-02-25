import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

import type { AstroIntegration, AstroIntegrationLogger } from 'astro'
import { globSync } from 'glob'

// import { bgMagenta, black, dim, magenta, yellow } from 'kleur'

const require = createRequire(import.meta.url)
const BASE_URLS = {
    DEV: 'http://br5f7-7uaaa-aaaaa-qaaca-cai.localhost:8000',
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

            replaceEnvVariables(logger)
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
                url = `${BASE_URLS.DEV}`
                // url = `${BASE_URLS.DEV}${iiCanisterId}`
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

function replaceEnvVariables(logger: AstroIntegrationLogger) {
    // Load and parse .env file
    const envPath = path.join(process.cwd(), '.env')
    const envFileContent = fs.readFileSync(envPath, { encoding: 'utf-8' })
    const envVariables = parseEnvFile(envFileContent)

    // Define the pattern for files to process
    const filesPattern = './src/declarations/*/index.js'

    const files = globSync(filesPattern)

    if (files.length === 0) {
        logger.error(`No declarations found with pattern ${filesPattern}`)
        throw new Error('No declarations found, please run `dfx generate` first.')
    }

    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8')

        // Replace each environment variable in the file content
        Object.entries(envVariables).forEach(([key, value]) => {
            const regex = new RegExp(`process.env.${key}\\b`, 'g')
            content = content.replace(regex, `${value}`)
        })

        fs.writeFileSync(file, content, 'utf8')
        logger.info(`Updated environment variables in ${file}`)
    })
}

function parseEnvFile(content: string) {
    const lines = content.split('\n')
    const envVariables = {}
    let isEnvSection = false

    lines.forEach(line => {
        if (line.trim() === '# DFX CANISTER ENVIRONMENT VARIABLES') {
            isEnvSection = true
            return
        }

        if (line.trim() === '# END DFX CANISTER ENVIRONMENT VARIABLES') {
            isEnvSection = false
        }

        // Match only non-comment lines and lines between the environment variable section
        if (isEnvSection && line.trim() && !line.startsWith('#')) {
            const [key, value] = line.split('=')
            envVariables[key.trim()] = value.trim()
        }
    })

    return envVariables
}
