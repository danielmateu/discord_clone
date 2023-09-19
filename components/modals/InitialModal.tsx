'use client'

import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"

import axios from 'axios'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle }
    from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'


import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FileUpload } from '../FileUpload'
import { useRouter } from 'next/navigation'


const formSchema = z.object({
    name: z.string().min(1, { message: 'Se requiere un nombre para el servidor ' }),
    imageurl: z.string().min(1, { message: 'Se requiere una imagen para el servidor ' })
})



export const InitialModal = () => {

    const [isMounted, setIsMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            imageurl: ''
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // console.log(data)
        try {
            await axios.post('/api/servers', data)

            form.reset()
            router.refresh()
            window.location.reload()

        } catch (error) {
            console.log(error)
        }
    }

    if (!isMounted) return null

    return (
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-semibold">
                        Crea tu propio servidor
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Personaliza tu servidor con un nombre y un icono. Puedes cambiarlos más tarde.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name='imageurl'
                                    render={({ field, formState }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint='serverImage'
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field, formState }) => (
                                    <FormItem>
                                        <FormLabel
                                            className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'
                                        >
                                            Nombre del servidor
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                                                placeholder='Introduce el nombre de tu servidor'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={isLoading} variant='primary'>
                                Crear
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
