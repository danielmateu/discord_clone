'use client'

// import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle }
    from "../ui/dialog"

import { useModal } from "@/hooks/use-modal-store"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Check, Copy, RefreshCcw } from "lucide-react"
import { useOrigin } from "@/hooks/use-origin"
import { useState } from 'react';
import axios from "axios"


export const MembersModal = () => {

    const { onOpen, isOpen, onClose, type, data } = useModal()
    const origin = useOrigin()

    const isModalOpen = isOpen && type === 'members'
    const { server } = data

    const [copied, setCopied] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2000)

    }

    // Genrate a new invite code
    const onGenerate = async () => {
        try {
            setIsLoading(true)

            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

            onOpen('invite', { server: response.data })

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-semibold">
                        Invita a tus amigos
                    </DialogTitle>
                    {/* <DialogDescription className="text-center text-zinc-500">
                        Invita a un amigo a unirse a tu servidor
                    </DialogDescription> */}
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-semibold text-zinc-500 dark:text-secondary/70">
                        Enlace de invitación
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                            value={inviteUrl}
                            onChange={() => { }}
                        />
                        <Button
                            disabled={isLoading}
                            onClick={onCopy}
                            size='icon'>
                            {copied ? <Check className="w-4 h-4 text-green-600 font-bold" /> : <Copy className="w-4 h-4" />}

                        </Button>
                    </div>
                    <Button
                        onClick={onGenerate}
                        disabled={isLoading}
                        size={'sm'} variant={'link'} className="text-xs text-zinc-500 mt-4">
                        Genera un nuevo enlace
                        <RefreshCcw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}