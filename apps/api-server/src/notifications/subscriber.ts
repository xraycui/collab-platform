import { redis } from '../utils/redis'
import { getIO } from '../realtime/io'

const sub = redis.duplicate()

export async function startNotificationSubscriber() {
  if (sub.status === 'close') {
    await sub.connect()
  }

  await sub.subscribe('notify:all', (msg: any) => {
    if(!msg) return
    const io = getIO()
    io.emit('notify:all', JSON.parse(msg))
  })
  
  await sub.psubscribe('notify:user:*', (message: any, channel: any) => {
    if (!message) return
    const parts = channel.splite(':')
    const userId = parts[2]
    const io = getIO()
    io.to(`user:${userId}`).emit('notify:user', JSON.parse(message))
  })

  await sub.psubscribe('notify:board:*', (message: any, channel: any) => {
    if (!message) return
    const boarId = channel.splite(':')[2]
    const io = getIO()
    io.to(`board;${boarId}`).emit('notify:board', JSON.parse(message))
  })
}



