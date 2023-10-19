import { Indicator, Root } from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { type ElementRef, forwardRef } from 'react'

import { cn } from '@/lib/utils'

const Checkbox = forwardRef<ElementRef<typeof Root>, React.ComponentPropsWithoutRef<typeof Root>>(
    ({ className, ...props }, ref) => (
        <Root
            ref={ref}
            className={cn(
                'peer h-4 w-4 shrink-0 rounded-sm border-2 border-[#a0a0a0] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className,
            )}
            {...props}>
            <Indicator className={cn('flex items-center justify-center text-current')}>
                <Check className='h-full w-full' />
            </Indicator>
        </Root>
    ),
)
Checkbox.displayName = Root.displayName

export { Checkbox }
