/**
 * Simple in-memory sliding-window rate limiter.
 * Suitable for single-instance deployments (Hetzner VPS).
 * No external dependencies required.
 */

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    Array.from(store.entries()).forEach(([key, entry]) => {
      if (now - entry.windowStart > 10 * 60 * 1000) {
        store.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

/**
 * Check and increment rate limit for a given key (usually IP address).
 * @param key        Unique identifier (IP address)
 * @param maxRequests Maximum allowed requests in the window
 * @param windowMs   Window duration in milliseconds
 * @returns `{ limited: true }` if rate limit exceeded, `{ limited: false, remaining }` otherwise
 */
export function rateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { limited: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.windowStart > windowMs) {
    // New window
    store.set(key, { count: 1, windowStart: now });
    return { limited: false, remaining: maxRequests - 1, resetIn: windowMs };
  }

  if (entry.count >= maxRequests) {
    const resetIn = windowMs - (now - entry.windowStart);
    return { limited: true, remaining: 0, resetIn };
  }

  entry.count += 1;
  const remaining = maxRequests - entry.count;
  const resetIn = windowMs - (now - entry.windowStart);
  return { limited: false, remaining, resetIn };
}
