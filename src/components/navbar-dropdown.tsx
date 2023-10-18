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
                <ul className='w-96 flex flex-col p-4 mt-4 border-t-4  rounded-none   backdrop-filter bg-slate-800 bg-opacity-40 backdrop-blur-md shadow-md border-slate-600'>
                    {items.map((item, i) => {
                        return (
                            <DropdownMenuItem key={i} asChild>
                                <li className='text-white text-base font-montserrat font-semibold'>{item}</li>
                            </DropdownMenuItem>
                        )
                    })}
                </ul>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
