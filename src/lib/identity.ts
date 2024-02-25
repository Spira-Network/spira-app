import { Ed25519KeyIdentity } from '@dfinity/identity'
import {
    IILoginButton as LoginButton,
    // defineComponent,
} from '@dfinity/ii-login-button'

import { canisterId, createActor } from '@/declarations/access_control'

/**
 * @type {LoginButton | null}
 */
const loginButton: LoginButton | null = document.querySelector('ii-login-button')
const output = document.querySelector('#output')

if (!loginButton) throw new Error('Login button not found')
if (!output) throw new Error('Output element not found')

/**
 * Sets up the custom element for the login button.
 * @returns {Promise<void>}
 */
export const prepareLoginButton = async (renderCb): Promise<void> => {
    if (!customElements.get('ii-login-button')) {
        customElements.define('ii-login-button', LoginButton)
    }

    // Once the login button is ready, we can configure it to use Internet Identity
    loginButton?.addEventListener('ready', async _event => {
        if (window.location.host.includes('localhost') || window.location.host.includes('127.0.0.1')) {
            ;(loginButton as any).configure({
                loginOptions: {
                    identityProvider: import.meta.env.PUBLIC_II_URL,
                },
            })
        }
    })

    loginButton?.addEventListener('login', async _event => {
        const identity = (loginButton as any)?.identity
        ;(window as any).identity = identity
        renderCb()
    })

    // ...
}

export function seedToIdentity(seed) {
    const seedBuf = new Uint8Array(new ArrayBuffer(32))
    if (seed.length && seed.length > 0 && seed.length <= 32) {
        seedBuf.set(new TextEncoder().encode(seed))
        return Ed25519KeyIdentity.generate(seedBuf)
    }
    return null
}

export function getActor(identity) {
    return createActor(canisterId, {
        agentOptions: {
            identity,
        },
    })
}
