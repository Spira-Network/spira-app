import '@fontsource/roboto-slab/latin-300.css'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle , DialogTrigger } from '@/components/ui/dialog'
import { loginFields , signUpFields } from '@/data/auth-form-fields.json'
import { cn } from '@/lib/utils'

import { LabeledInput } from './labeled-input'
import { Checkbox } from './ui/checkbox'

function Modal({
    title,
    fieldsData,
    primaryButtonText,
    secondaryButtonText,
    onSecondaryButtonClick,
    isSingleColumn = false,
    footerLinkText,
    footerLinkAction,
}: any) {
    return (
        <DialogContent className={cn('p-8', isSingleColumn ? 'max-w-xs' : 'max-w-2xl')}>
            <DialogHeader>
                <DialogTitle className='mb-4 font-robotoslab text-4xl font-light text-[#346284]'>{title}</DialogTitle>
            </DialogHeader>
            <form className={cn('gap-6', isSingleColumn ? 'flex flex-col' : 'grid grid-cols-2')}>
                {fieldsData.map((field: any) => (
                    <LabeledInput
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        type={field.type}
                    />
                ))}
            </form>

            {isSingleColumn && (
                <div className='mt-6 flex items-center space-x-2'>
                    <Checkbox id='keepMeLoggedIn' />
                    <label
                        htmlFor='keepMeLoggedIn'
                        className='text-sm font-medium leading-none text-[#a0a0a0] peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                        Mantenerme conectado
                    </label>
                </div>
            )}

            <DialogFooter className={cn('gap-6', isSingleColumn ? 'flex flex-col' : 'grid grid-cols-2')}>
                <Button
                    type='submit'
                    className='w-full bg-[#10a2df] p-6 text-white hover:bg-[#10a2df] hover:brightness-90'>
                    {primaryButtonText}
                </Button>
                <Button
                    type='button'
                    onClick={onSecondaryButtonClick}
                    className='w-full bg-[#eee] p-6 text-[#6e6e6e] shadow-md hover:bg-[#eee] hover:brightness-90'>
                    {secondaryButtonText}
                </Button>
                {footerLinkText && (
                    <button type='button' onClick={footerLinkAction} className='text-sm font-medium text-[#999]'>
                        {footerLinkText}
                    </button>
                )}
            </DialogFooter>
        </DialogContent>
    )
}

export default function Auth() {
    const [isOpen, setIsOpen] = useState(false)
    const [modalType, setModalType] = useState('login')

    const toggleModalType = () => {
        setModalType(prevType => (prevType === 'login' ? 'register' : 'login'))
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
                asChild
                onClick={() => {
                    setModalType('login')
                    setIsOpen(true)
                }}>
                <li className='cursor-pointer'>Iniciar sesión</li>
            </DialogTrigger>

            <DialogTrigger
                asChild
                onClick={() => {
                    setModalType('register')
                    setIsOpen(true)
                }}>
                <li className='cursor-pointer'>Unirse</li>
            </DialogTrigger>

            {/* Modal */}

            {modalType === 'login' ? (
                <Modal
                    open={open}
                    isSingleColumn
                    title='Iniciar sesión'
                    fieldsData={loginFields}
                    primaryButtonText='Iniciar sesión'
                    secondaryButtonText='Registro'
                    onSecondaryButtonClick={toggleModalType}
                    footerLinkText='¿Has olvidado la contraseña?'
                    footerLinkAction={() => {
                        /* Aquí el código para gestionar la recuperación de contraseña */
                    }}
                />
            ) : (
                <Modal
                    title='Unirse'
                    fieldsData={signUpFields}
                    primaryButtonText='Registro'
                    secondaryButtonText='Iniciar sesión'
                    onSecondaryButtonClick={toggleModalType}
                />
            )}
        </Dialog>
    )
}
