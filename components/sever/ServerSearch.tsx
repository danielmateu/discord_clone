'use client'

import { Search } from "lucide-react";

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { useEffect, useState } from "react";


interface ServerSearchProps {
    data: {
        label: string;
        type: "channel" | "member",
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined
    }[]
}
export const ServerSearch = ({
    data
}: ServerSearchProps) => {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)

        return () => document.removeEventListener('keydown', down)
    }, [])


    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zing-700/10 dark:hover:bg-zinc-700/50"
            >
                <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">Buscar</p>

                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                    <span className="text-sx">ctrl</span>K
                </kbd>
            </button>
            <CommandDialog
                open={open}
                onOpenChange={setOpen}
            >
                <CommandInput
                    placeholder="Buscar todos los canales y miembros"
                />
                <CommandList>
                    <CommandEmpty>
                        <p className="text-sm text-muted-foreground">No se encontraron resultados</p>
                    </CommandEmpty>
                    {
                        data.map(({ label, type, data }) => {
                            if (!data?.length) return null

                            return (
                                <CommandGroup
                                    key={label}
                                    heading={label}
                                >
                                    {
                                        data.map(({ icon, name, id }) => (
                                            <CommandItem
                                                key={id}
                                            // icon={icon}
                                            >
                                                {icon}
                                                <span>{name}</span>
                                            </CommandItem>
                                        ))
                                    }
                                </CommandGroup>
                            )
                        })
                    }
                </CommandList>

            </CommandDialog>
        </>
    )
}
