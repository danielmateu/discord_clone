'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Plus, Smile } from 'lucide-react'
import axios from 'axios'
import qs from 'query-string'


interface ChatInputProps {
    apiUrl: string
    query: Record<string, any>
    name: string
    type: 'conversation' | 'channel'
}

const formSchema = z.object({
    content: z.string().nonempty()
})

export const ChatInput = ({
    apiUrl,
    query,
    name,
    type
}: ChatInputProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: '',
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query
            })

            await axios.post(url, data)

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Username</FormLabel> */}
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button
                                        type="button"
                                        onClick={() => form.handleSubmit(onSubmit)()}
                                        className='absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 hover:bg-zinc-600 dark:bg-zinc-400 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center'
                                    >
                                        <Plus className='text-white dark:text-[#313338]' />
                                    </button>
                                    <Input disabled={isLoading}
                                        placeholder={`Mensaje ${type === 'conversation' ? name : '#' + name}`}
                                        className='px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200'
                                        {...field}
                                    />
                                    <div className="absolute top-7 right-8">
                                        <Smile />
                                    </div>
                                </div>
                            </FormControl>
                            {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
                            {/* <FormMessage /> */}
                        </FormItem>
                    )}
                />
                {/* <Button type="submit">Submit</Button> */}
            </form>
        </Form>
    )
}
