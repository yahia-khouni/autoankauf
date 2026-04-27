/**
 * Production-safe logger.
 * In production: only logs errors to stderr.
 * In development: full verbose logging.
 */

const isDev = process.env.NODE_ENV !== "production";

export const logger = {
  info: (...args: unknown[]) => {
    if (isDev) console.log("[INFO]", ...args);
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn("[WARN]", ...args);
  },
  error: (...args: unknown[]) => {
    // Always log errors, even in production (they go to server stderr/logs)
    console.error("[ERROR]", ...args);
  },
  debug: (...args: unknown[]) => {
    if (isDev) console.log("[DEBUG]", ...args);
  },
};
