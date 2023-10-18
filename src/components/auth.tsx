import '@fontsource/roboto-slab/latin-300.css'

import { useState } from 'react'
import { Dialog, DialogTrigger } from './ui/dialog'

import { loginFields } from '@/data/auth-form-fields.json'

import { signUpFields } from '@/data/auth-form-fields.json'

import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
        <DialogContent className={`${isSingleColumn ? 'max-w-xs' : 'max-w-2xl'} p-8`}>
            <DialogHeader>
                <DialogTitle className='text-[#346284] text-4xl font-light font-robotoslab mb-4'>{title}</DialogTitle>
            </DialogHeader>
            <form className={`${isSingleColumn ? 'flex flex-col' : 'grid grid-cols-2'} gap-6`}>
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
                <div className='flex items-center space-x-2 mt-6'>
                    <Checkbox id='keepMeLoggedIn' />
                    <label
                        htmlFor='keepMeLoggedIn'
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#a0a0a0]'>
                        Mantenerme conectado
                    </label>
                </div>
            )}

            <DialogFooter className={`${isSingleColumn ? 'flex flex-col' : 'grid grid-cols-2'} gap-6`}>
                <Button
                    type='submit'
                    className='bg-[#10a2df] text-white w-full p-6 hover:bg-[#10a2df] hover:brightness-90'>
                    {primaryButtonText}
                </Button>
                <Button
                    type='button'
                    onClick={onSecondaryButtonClick}
                    className='bg-[#eee] text-[#6e6e6e] w-full p-6 shadow-md hover:bg-[#eee] hover:brightness-9'>
                    {secondaryButtonText}
                </Button>
                {footerLinkText && (
                    <button type='button' onClick={footerLinkAction} className='text-[#999] font-medium text-sm'>
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
