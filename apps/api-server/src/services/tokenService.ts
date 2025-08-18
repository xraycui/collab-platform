import { redis } from "../utils/redis";

const REFRESH_NAMESPACE = "refresh:"; // key: refresh:<jti> -> userId

// TTL in seconds parsed from ENV (fallback 7d)
const refreshTtlSec = (() => {
  const v = process.env.JWT_REFRESH_TTL || "7d";
  if (v.endsWith("d")) return parseInt(v) * 24 * 60 * 60;
  if (v.endsWith("h")) return parseInt(v) * 60 * 60;
  if (v.endsWith("m")) return parseInt(v) * 60;
  return 7 * 24 * 60 * 60;
})();

export async function storeRefreshToken(jti: string, userId: number) {
  await redis.set(`${REFRESH_NAMESPACE}${jti}`, String(userId), "EX", refreshTtlSec);
}

export async function isRefreshTokenValid(jti: string, userId: number) {
  const val = await redis.get(`${REFRESH_NAMESPACE}${jti}`);
  return val === String(userId);
}

export async function revokeRefreshToken(jti: string) {
  await redis.del(`${REFRESH_NAMESPACE}${jti}`);
}
