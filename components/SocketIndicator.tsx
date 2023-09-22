'use client'

import { Badge } from "@/components/ui/badge"
import { useSocket } from "./providers/socket-provider"


export const SocketIndicator = () => {

    const { isConnected } = useSocket()

    if (!isConnected) {
        return (
            <Badge variant={'outline'} className="bg-yellow-500 text-black border-none">
                Fallback: Polling for updates
            </Badge>
        )

    }

    return (
        <Badge variant={'outline'} className="bg-emerald-500 text-black border-none">
            Live: Connected
        </Badge>
    )
}
