import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { Server as ServerIO } from 'socket.io'

import { NextApiResponseServerIo } from '@/types'

export const config = {
    api: {
        bodyParser: false
    }
}

/**
 * Handles the incoming requests and responses for the Socket.IO server.
 * 
 * @param {NextApiRequest} req - The incoming HTTP request.
 * @param {NextApiResponseServerIo} res - The outgoing HTTP response.
 * 
 * If the Socket.IO server is not already attached to the response's server, 
 * a new Socket.IO server is created and attached to it.
 */
const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        const path = '/api/socket/io'
        const httpServer: NetServer = res.socket.server as any
        const io = new ServerIO(httpServer, {
            path,
            //@ts-ignore
            addTrailingSlash: false
        })
        res.socket.server.io = io
    }
    res.end()
}

export default ioHandler