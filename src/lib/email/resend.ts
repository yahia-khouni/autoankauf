import { logger } from "@/lib/logger";

const RESEND_API_URL = "https://api.resend.com/emails";

interface SendResendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getResendFromAddress(): string {
  return process.env.RESEND_FROM?.trim() || getRequiredEnv("RESEND_FROM");
}

export async function sendResendEmail(options: SendResendEmailOptions) {
  const apiKey = getRequiredEnv("RESEND_API_KEY");

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: options.from ?? getResendFromAddress(),
      to: options.to,
      subject: options.subject,
      html: options.html,
      reply_to: options.replyTo,
    }),
  });

  const payload = (await response.json()) as {
    id?: string;
    error?: {
      message?: string;
      name?: string;
    };
  };

  if (!response.ok || payload.error) {
    const details = payload.error?.message || payload.error?.name || "Unknown Resend error";
    throw new Error(`Resend email send failed: ${details}`);
  }

  logger.info(`[Resend] Email sent (${payload.id ?? "unknown-id"})`);
  return payload;
}
