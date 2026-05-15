type Key = string;

const map = new Map<Key, { count: number; resetAt: number }>();

export function rateLimit(key: Key, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const rec = map.get(key) || { count: 0, resetAt: now + windowMs };
  if (now > rec.resetAt) {
    rec.count = 0;
    rec.resetAt = now + windowMs;
  }
  rec.count += 1;
  map.set(key, rec);
  const remaining = Math.max(0, limit - rec.count);
  const reset = rec.resetAt;
  const limited = rec.count > limit;
  return { limited, remaining, reset };
}
