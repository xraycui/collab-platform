import { redis } from '../utils/redis'

export async function notifyUser(userId: string, paylaod: any) {
  await redis.publish(`notify:user:${userId}`, JSON.stringify(paylaod))
}

export async function notifyBoard(boardId: string, payload: any) {
  await redis.publish(`notify:board:${boardId}`, JSON.stringify(payload))
}

export async function notifyAll(payload: any) {
  await redis.publish(`notify:all`,JSON.stringify(payload))
}