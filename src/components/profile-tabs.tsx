import '@fontsource/montserrat/latin-400.css'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export default function ProfileTabs() {
    return (
        <Tabs defaultValue='media'>
            <TabsList className='gap-10 rounded-none bg-white'>
                <TabsTrigger value='media' className='font-montserrat uppercase'>
                    Fotos y vídeos
                </TabsTrigger>
                <TabsTrigger value='projects' className='font-montserrat uppercase'>
                    Proyectos
                </TabsTrigger>
                <TabsTrigger value='events' className='font-montserrat uppercase'>
                    Sucesos
                </TabsTrigger>
                <TabsTrigger value='collabs' className='font-montserrat uppercase'>
                    Colaboraciones
                </TabsTrigger>
            </TabsList>
            <TabsContent value='projects'>
                <div className='grid grid-cols-2 gap-4 py-4'>
                    {/* Primer cuadro */}
                    <div className='relative aspect-[4/3]'>
                        <div className='top-0 mb-2 h-full w-full bg-gray-500'></div>
                        <div className='bottom-0 w-full font-montserrat uppercase'>Título 1</div>
                    </div>

                    {/* Segundo cuadro */}
                    <div className='relative aspect-[4/3]'>
                        <div className='top-0 mb-2 h-full w-full bg-gray-500'></div>
                        <div className='bottom-0 w-full font-montserrat uppercase'>Título 2</div>
                    </div>

                    {/* Puedes repetir la estructura anterior para cada cuadro. */}

                    {/* Para el propósito de demostración, aquí están los cuadros del 3 al 8 */}
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className='relative aspect-[4/3]'>
                            <div className='top-0 mb-2 h-full w-full bg-gray-500'></div>
                            <div className='bottom-0 w-full font-montserrat uppercase'>Título {index + 3}</div>
                        </div>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value='media'>
                <div className='grid grid-cols-4 gap-4 py-4'>
                    {Array.from({ length: 24 }).map((_, index) => (
                        <div key={index} className='aspect-[4/3]'>
                            <div className='h-full w-full bg-stone-500'></div>
                        </div>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value='events'>
                <div className='grid grid-cols-2 gap-4 py-4'>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className='aspect-[4/3]'>
                            <div className='h-full w-full bg-stone-500'></div>
                            <div className='-mt-12 w-full p-4 font-montserrat text-white'>
                                Título / Fecha / Lugar / nubesita {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value='collabs'>
                <div className='grid grid-cols-4 justify-items-center gap-y-8 py-4 pl-12 pr-64'>
                    <div className='h-20 w-20 rounded-full bg-stone-500'></div>
                    <div className='h-20 w-20 rounded-full bg-stone-500'></div>
                    {Array.from({ length: 14 }).map((_, index) => (
                        <div key={index} className='h-20 w-20 rounded-full bg-stone-500'></div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    )
}
