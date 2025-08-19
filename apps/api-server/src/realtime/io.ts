import { Server } from 'socket.io'
let io: Server | null = null
export function setIO(instance: Server) {
  io = instance
}
export function getIO(): Server {
  if(!io) throw new Error('Soket.IO not initialized')
  return io
}