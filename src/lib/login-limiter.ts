/**
 * Login attempt brute-force protection.
 * Tracks failed login attempts per email address.
 * Blocks after MAX_ATTEMPTS failures for LOCKOUT_MS duration.
 */

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

interface LoginAttemptEntry {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

const attempts = new Map<string, LoginAttemptEntry>();

// Cleanup stale entries every 30 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    Array.from(attempts.entries()).forEach(([key, entry]) => {
      const expired =
        entry.lockedUntil
          ? now > entry.lockedUntil
          : now - entry.firstAttempt > LOCKOUT_MS;
      if (expired) attempts.delete(key);
    });
  }, 30 * 60 * 1000);
}

/**
 * Check if a login key (email) is currently locked out.
 */
export function isLoginLocked(email: string): boolean {
  const entry = attempts.get(email.toLowerCase());
  if (!entry?.lockedUntil) return false;
  if (Date.now() > entry.lockedUntil) {
    attempts.delete(email.toLowerCase());
    return false;
  }
  return true;
}

/**
 * Record a failed login attempt. Returns true if the account is now locked.
 */
export function recordFailedLogin(email: string): boolean {
  const key = email.toLowerCase();
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry) {
    attempts.set(key, { count: 1, firstAttempt: now });
    return false;
  }

  // Reset window if it's expired
  if (now - entry.firstAttempt > LOCKOUT_MS && !entry.lockedUntil) {
    attempts.set(key, { count: 1, firstAttempt: now });
    return false;
  }

  entry.count += 1;

  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_MS;
    return true;
  }

  return false;
}

/**
 * Clear login attempts on successful login.
 */
export function clearLoginAttempts(email: string): void {
  attempts.delete(email.toLowerCase());
}
