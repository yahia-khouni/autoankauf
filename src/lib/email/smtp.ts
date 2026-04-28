import nodemailer, { type SendMailOptions, type Transporter } from "nodemailer";
import { logger } from "@/lib/logger";

let transporterPromise: Promise<Transporter> | null = null;

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseSmtpPort(value: string): number {
  const port = Number.parseInt(value, 10);
  if (!Number.isFinite(port) || port <= 0 || port > 65535) {
    throw new Error(`Invalid SMTP_PORT value: ${value}`);
  }
  return port;
}

function parseSmtpSecure(value: string | undefined, port: number): boolean {
  if (typeof value === "string") {
    return value.trim().toLowerCase() === "true";
  }
  return port === 465;
}

async function createTransporter(): Promise<Transporter> {
  const host = getRequiredEnv("SMTP_HOST");
  const port = parseSmtpPort(getRequiredEnv("SMTP_PORT"));
  const secure = parseSmtpSecure(process.env.SMTP_SECURE, port);
  const user = getRequiredEnv("SMTP_USER");
  const pass = getRequiredEnv("SMTP_PASS");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.verify();
  logger.info(`[SMTP] Transport verified (${host}:${port})`);
  return transporter;
}

export async function getSmtpTransporter(): Promise<Transporter> {
  if (!transporterPromise) {
    transporterPromise = createTransporter().catch((error) => {
      transporterPromise = null;
      throw error;
    });
  }

  return transporterPromise;
}

export function getSmtpFromAddress(): string {
  return process.env.SMTP_FROM?.trim() || getRequiredEnv("SMTP_USER");
}

export async function sendSmtpEmail(options: SendMailOptions) {
  const transporter = await getSmtpTransporter();
  return transporter.sendMail({
    ...options,
    from: options.from ?? getSmtpFromAddress(),
  });
}
