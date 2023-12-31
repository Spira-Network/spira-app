import '@fontsource/roboto-slab/latin-400.css'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LabeledInput({ id, label, placeholder, type }) {
    return (
        <div className='flex w-full flex-col gap-4'>
            <Label htmlFor={id} className='text-left font-robotoslab text-[#555]'>
                {label}
            </Label>
            <Input
                id={id}
                placeholder={placeholder}
                type={type}
                className='rounded-sm p-6 placeholder:text-[#adadad]'
                autoComplete='off'
            />
        </div>
    )
}
