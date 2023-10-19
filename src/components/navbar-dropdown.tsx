import '@fontsource/montserrat/latin-600.css'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'

const items = [
    '¿Qué es? ¿Cómo funciona?',
    'Las 12 áreas',
    'Guía de ecualización y convivencia',
    'Regeneratividad',
    'Somos',
    'Términos y condiciones',
    'FAQ',
]

export default function NavbarDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Menu className='cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' asChild>
                <ul className='mt-4 flex w-96 flex-col rounded-none border-t-4  border-slate-600   bg-slate-800/40 p-4 shadow-md backdrop-blur-md'>
                    {items.map((item, i) => {
                        return (
                            <DropdownMenuItem key={i} asChild>
                                <li className='font-montserrat text-base font-semibold text-white'>{item}</li>
                            </DropdownMenuItem>
                        )
                    })}
                </ul>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
