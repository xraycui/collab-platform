import { redis } from '../utils/redis'
import { getIO } from '../realtime/io'
import { channel } from 'diagnostics_channel'

const sub = redis.duplicate()

export async function startNotificationSubscriber() {
  await sub.connect()
  await sub.subscribe('notify:all', (msg: any) => {
    const io = getIO()
    io.emit('notify:all', JSON.parse(msg))
  })
  await sub.psubscribe('notify:user:*', (message: any, channel: any) => {
    const parts = channel.splite(':')
    const userId = parts[2]
    const io = getIO()
    io.to(`user:${userId}`).emit('notify:user', JSON.parse(message))
  })

  await sub.psubscribe('notify:board:*', (message: any, channel: any) => {
    const boarId = channel.splite(':')[2]
    const io = getIO()
    io.to(`board;${boarId}`).emit('notify:board', JSON.parse(message))
  })
}



