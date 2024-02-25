import { AuthClient } from '@dfinity/auth-client'
import { Bell, Mail } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import Avatar from '@/components/connected-avatar' // Asegúrate de que ConnectedAvatar esté exportado adecuadamente

import { Skeleton } from './skeleton' // Asegúrate de que Skeleton esté exportado adecuadamente

const IDENTITY_URL = import.meta.env.PUBLIC_II_URL

const AuthButton: React.FC = () => {
    const [authClient, setAuthClient] = useState<AuthClient | null>(null)
    const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading')

    useEffect(() => {
        const initAuthClient = async () => {
            if (!authClient) {
                try {
                    const newAuthClient = await AuthClient.create()
                    setAuthClient(newAuthClient)
                } catch (error) {
                    console.error('Error creating AuthClient:', error)
                }
            }
        }

        initAuthClient()
    }, [authClient])

    useEffect(() => {
        const updateUI = async () => {
            if (!authClient) return

            const isAuthenticated =
                (await authClient.isAuthenticated()) && !authClient.getIdentity().getPrincipal().isAnonymous()
            setAuthState(isAuthenticated ? 'authenticated' : 'unauthenticated')
        }

        updateUI()
    }, [authClient])

    const handleLogin = async () => {
        if (!authClient) return

        if (!(await authClient.isAuthenticated())) {
            try {
                authClient.login({
                    identityProvider: IDENTITY_URL ?? '',
                    maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
                    onSuccess: () => setAuthState('authenticated'),
                })
            } catch (error) {
                console.error('Error during login:', error)
            }
        } else {
            setAuthState('authenticated')
        }
    }

    const handleLogout = async () => {
        if (!authClient) return

        await authClient.logout()
        setAuthClient(null)
        setAuthState('unauthenticated')
    }

    return (
        <div
            className='flex size-full flex-1 cursor-pointer flex-row items-center gap-4'
            onClick={authState === 'unauthenticated' ? handleLogin : undefined}>
            {authState === 'loading' && <Skeleton className='size-full bg-slate-500' />}
            {authState === 'authenticated' && (
                <>
                    <a href='/profile' aria-label='navigate to profile'>
                        <Mail />
                    </a>
                    <a href='/notifications' aria-label='navigate to notifications'>
                        <Bell />
                    </a>
                    <Avatar onDisconnect={handleLogout} />
                </>
            )}
            {authState === 'unauthenticated' && <span>Conectar</span>}
        </div>
    )
}

export default AuthButton
