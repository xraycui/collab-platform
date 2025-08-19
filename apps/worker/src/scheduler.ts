import { redis } from "./redis";
import amqp from "amqplib";

const ZSET_KEY = "schedule:jobs";
const CLAIM_PREFIX = "schedule:claimed:";
const CLAIM_TTL_SEC = 24 * 60 * 60; // 24h
const BATCH = 100;     // max jobs per tick
const INTERVAL_MS = 2000; // poll every 2s

type Job = {
  id: string;
  type: "email.reminder" | "notifications.broadcast";
  runAt: number; // epoch ms
  data: any;
};

async function claimAndFetchDue(now: number): Promise<Job[]> {
  // 1) fetch due members
  const raw = await redis.zrangebyscore(ZSET_KEY, 0, now, "LIMIT", 0, BATCH);
  if (!raw.length) return [];

  const pipeline = redis.multi();
  const jobs: Job[] = [];

  for (const m of raw) {
    try {
      const j: Job = JSON.parse(m);
      // 2) atomically remove from zset; then set a claim key to avoid duplicates
      pipeline.zrem(ZSET_KEY, m);
      pipeline.setex(CLAIM_PREFIX + j.id, CLAIM_TTL_SEC, "1");
      jobs.push(j);
    } catch {}
  }
  await pipeline.exec();
  return jobs;
}

export async function startSchedulerLoop(ch: amqp.Channel) {
  console.log("[scheduler] loop started");
  async function tick() {
    try {
      const now = Date.now();
      const jobs = await claimAndFetchDue(now);
      for (const job of jobs) {
        // idempotency: if already claimed in another runner, skip
        const already = await redis.get(CLAIM_PREFIX + job.id);
        if (!already) continue;

        switch (job.type) {
          case "email.reminder": {
            ch.sendToQueue("email.reminder", Buffer.from(JSON.stringify(job.data)), {
              persistent: true
            });
            break;
          }
          case "notifications.broadcast": {
            ch.sendToQueue("notifications.broadcast", Buffer.from(JSON.stringify(job.data)), {
              persistent: false
            });
            break;
          }
          default:
            console.warn("[scheduler] unknown job type:", job.type);
        }
      }
    } catch (e) {
      console.error("[scheduler] tick error", e);
    } finally {
      setTimeout(tick, INTERVAL_MS);
    }
  }
  tick();
}
