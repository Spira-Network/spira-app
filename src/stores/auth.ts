// src/stores/auth.ts

import { AuthClient } from '@dfinity/auth-client'
import { atom } from 'nanostores'

export interface AuthState {
    status: 'idle' | 'connecting' | 'authenticated' | 'error'
    principal?: string
}

const initialState: AuthState = {
    status: 'idle',
}

export const authState = atom<AuthState>(initialState)
const authChannel = new BroadcastChannel('auth_channel')

let authClient: AuthClient // Almacenar la instancia del cliente de autenticación

async function initAuthClient() {
    if (!authClient) {
        authClient = await AuthClient.create()
    }
    const isAuthenticated = await authClient.isAuthenticated()
    updateState(isAuthenticated ? 'authenticated' : 'idle')
}

function updateState(status: AuthState['status']) {
    const principal =
        status === 'authenticated' && authClient ? authClient.getIdentity().getPrincipal().toString() : undefined
    const newState = { status, principal }
    authState.set(newState)
    authChannel.postMessage(newState)
}

// Escuchar mensajes en el canal de difusión y actualizar el estado según sea necesario
authChannel.onmessage = event => {
    // Asegúrate de que el mensaje sea del tipo esperado y contenga el estado de autenticación
    if (event.data && ['idle', 'connecting', 'authenticated', 'error'].includes(event.data.status)) {
        authState.set(event.data)
    }
}

export async function authenticate() {
    await initAuthClient() // Asegúrate de que el cliente de autenticación esté inicializado
    updateState('connecting')
    authClient.login({
        identityProvider: import.meta.env.PUBLIC_II_URL,
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
        windowOpenerFeatures: 'toolbar=0,location=0,menubar=0,width=1000,height=700,left=-500,top=-1200',
        // Configuración del login...
        onSuccess: () => updateState('authenticated'),
        onError: () => updateState('error'),
    })
}

export function logout() {
    if (authClient) {
        authClient.logout()
        updateState('idle')
    }
}
