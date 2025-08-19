import amqp from 'amqplib'

let channel: amqp.Channel | null = null

export async function getAmqpChannel() {
  if(channel) return channel
  const conn = await amqp.connect(process.env.AMQP_URL!)

  const ch = await conn.createChannel()
  await ch.assertQueue("email.reminder", { durable: true });
  await ch.assertQueue("notifications.broadcast", { durable: true });

  channel = ch
  return channel
}

export async function publishEmailReminder(msg: {
  to: string,
  subject: string,
  text: string
}) {
  const ch = await getAmqpChannel()
  ch.sendToQueue('email.reminder', Buffer.from(JSON.stringify(msg)), { persistent: false })
}

export async function publishBroadcastNotification(msg: any) {
  const ch = await getAmqpChannel()
  ch.sendToQueue('notifications.broadcast', Buffer.from(JSON.stringify(msg)), { persistent: false})
}