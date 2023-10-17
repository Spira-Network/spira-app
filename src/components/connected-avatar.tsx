import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function ConnectedAvatar({ onDisconnect }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='w-8 h-8 -mr-6'>
                    <AvatarImage src='https://github.com/memo.png' alt='@shadcn' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='center' asChild>
                <ul className='w-32 flex flex-col p-4 mt-4 border-t-4 rounded-none backdrop-filter bg-slate-800 bg-opacity-40 backdrop-blur-md shadow-md border-slate-600'>
                    <DropdownMenuItem asChild>
                        <li onClick={onDisconnect} className='text-white text-base font-montserrat font-semibold'>
                            Disconnect
                        </li>
                    </DropdownMenuItem>
                </ul>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
