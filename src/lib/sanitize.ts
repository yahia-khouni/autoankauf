/**
 * Input sanitization utilities.
 * Use before injecting user data into HTML email templates or storing to DB.
 */

/**
 * Escapes HTML special characters to prevent XSS in email templates.
 */
export function escapeHtml(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Strips all HTML tags from a string. Use for plain-text fields like notes.
 */
export function stripTags(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>/g, "").trim();
}

/**
 * Trims whitespace and enforces a max length. Prevents overly long inputs.
 */
export function sanitizeString(str: unknown, maxLength = 500): string {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, maxLength);
}

/**
 * Validates that a string is a safe email address.
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

/**
 * Validates a German-style phone number (very permissive — allows international).
 */
export function isValidPhone(phone: unknown): boolean {
  if (typeof phone !== "string") return false;
  return /^[\d\s\+\-\(\)]{6,20}$/.test(phone.trim());
}
