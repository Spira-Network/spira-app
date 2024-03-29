import '@fontsource/montserrat/latin-600.css'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

export default function ConnectedAvatar({ onDisconnect }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='-mr-6 size-8 border-2 border-black' role='img' aria-labelledby='avatar-username'>
                    <AvatarImage src='/profile_avatar.jpg' alt='avatar' />
                    <AvatarFallback aria-hidden='true' delayMs={0}>
                        <Skeleton className='size-full bg-slate-500'></Skeleton>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='center' asChild>
                <ul className='mt-4 box-border flex w-32 flex-col rounded-none border-t-4 border-slate-600/40 bg-slate-800 p-4 shadow-md backdrop-blur-md'>
                    <DropdownMenuItem asChild>
                        <li onClick={onDisconnect} className='font-montserrat text-base font-semibold text-white'>
                            Disconnect
                        </li>
                    </DropdownMenuItem>
                </ul>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
