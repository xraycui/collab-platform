import { redis } from "../utils/redis";

const ZSET_KEY = "schedule:jobs";

export async function scheduleJob(runAtMs: number, job: any) {
  // score is when it should run
  await redis.zadd(ZSET_KEY, String(runAtMs), JSON.stringify(job));
}

export async function cancelJob(jobId: string) {
  // scan small batches; jobs are small strings → cheap linear match
  const members = await redis.zrange(ZSET_KEY, 0, -1);
  const toRemove: string[] = [];
  for (const m of members) {
    try {
      const parsed = JSON.parse(m);
      if (parsed?.id === jobId) toRemove.push(m);
    } catch {}
  }
  if (toRemove.length) {
    await redis.zrem(ZSET_KEY, ...toRemove);
  }
}
