import { Router, Request, Response, NextFunction } from 'express'
import { requireAuth } from '../middlewares/auth'
import { publishEmailReminder, publishBroadcastNotification } from '../jobs/amqp'

const router = Router()
router.post('/email-reminder', requireAuth, async (req: Request, res: Response) => {
  const {to, subject, text } = req.body
  await publishEmailReminder({ to, subject, text})
  res.status(200).json({ queued: true })
})

router.post('/broadcast', requireAuth, async (req: Request, res: Response) => {
  await publishBroadcastNotification({by: req.user.id, ...req.body})
  res.status(200).json({ queued: true })
})

export default router
