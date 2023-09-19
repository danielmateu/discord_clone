'use client'

// import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle }
    from "../ui/dialog"

import { useModal } from "@/hooks/use-modal-store"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Copy, RefreshCcw } from "lucide-react"
import { useOrigin } from "@/hooks/use-origin"


export const InviteModal = () => {

    const { isOpen, onClose, type, data } = useModal()
    const origin = useOrigin()

    const isModalOpen = isOpen && type === 'invite'
    const { server } = data

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

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
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                            value={inviteUrl}
                            onChange={() => { }}
                        />
                        <Button size='icon'>
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button size={'sm'} variant={'link'} className="text-xs text-zinc-500 mt-4">
                        Genera un nuevo enlace
                        <RefreshCcw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
