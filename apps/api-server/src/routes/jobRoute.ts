import { Router, Request, Response, NextFunction } from 'express'
import { v4 as uuid } from "uuid";
import { scheduleJob, cancelJob } from "../jobs/scheduler";
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

router.post("/schedule/task-reminder", requireAuth, async (req, res) => {
  const { to, subject, text, runAtISO, boardId, userId } = req.body;
  if (!runAtISO || !to) return res.status(400).json({ error: "Missing runAtISO or to" });

  const runAt = new Date(runAtISO).getTime();
  if (isNaN(runAt)) return res.status(400).json({ error: "Invalid runAtISO" });
  if (runAt <= Date.now()) return res.status(400).json({ error: "Time must be in the future" });

  const id = uuid();
  const job = {
    id,
    type: "email.reminder",
    runAt,
    data: { to, subject, text, boardId, userId: userId ?? req.user!.id }
  };
  await scheduleJob(runAt, job);
  res.json({ scheduled: true, jobId: id, runAt });
});

// Cancel by jobId
router.post("/schedule/cancel", requireAuth, async (req, res) => {
  const { jobId } = req.body;
  if (!jobId) return res.status(400).json({ error: "Missing jobId" });
  await cancelJob(jobId);
  res.json({ canceled: true, jobId });
});
export default router
