import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function UserAvatar({ className = '' }) {
    return (
        <Avatar className={cn('w-32 h-32 drop-shadow-lg', className)}>
            <AvatarImage src='/profile_avatar.jpg' alt='avatar' />
            <AvatarFallback>AV</AvatarFallback>
        </Avatar>
    )
}
