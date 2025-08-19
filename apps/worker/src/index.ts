import dotenv from 'dotenv'
dotenv.config()
import amqp from 'amqplib'
import { sendMail } from './mailer'
import { redis } from './redis'
import { startSchedulerLoop } from "./scheduler"

async function start() {
  const conn = await amqp.connect(process.env.AMQP_URL!)
  const ch = await conn.createChannel()

  await ch.assertQueue('email.reminder', { durable: true})
  await ch.assertQueue('notifications.broadcast', { durable: true })

  // Email reminders
  ch.consume('email.reminder', async (msg) => {
    if(!msg) return 
    try {
      const payload = JSON.parse(msg.content.toString())
      await sendMail(payload.to, payload.subject, payload.text)
      ch.ack(msg)
    } catch (err) {
      console.error('email.reminder failed: ', err)
      ch.nack(msg, false, false)
    }
  })

  // Broadcast notifications: fanout to Redis channels

  ch.consume('notifications.broadcast', async (msg) => {
    if(!msg) return
    try {
      const payload = JSON.parse(msg.content.toString())
      await redis.publish('notify:all', JSON.stringify({ type: 'broadcast', ...payload }))
      ch.ack(msg)
    } catch (err) {
      console.error('notification.broadcast failed: ', err)
      ch.nack(msg, false, false)
    }
  })

  await startSchedulerLoop(ch);
  console.log('Worker running. Queues: email.reminder, notifications.broadcast')
}

start().catch((err) => {
  console.log('Worker failed to start')
  process.exit(1)
})
