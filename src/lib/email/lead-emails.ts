import { renderEmailTemplate } from "@/lib/email/templates";
import { sendResendEmail } from "@/lib/email/resend";

const CONTACT_METHOD_LABELS: Record<string, string> = {
  PHONE: "Telefon",
  EMAIL: "E-Mail",
  WHATSAPP: "WhatsApp",
};

function getBrandName(): string {
  return process.env.EMAIL_BRAND_NAME?.trim() || "Autoankauf Deutschland";
}

function getAdminEmailRecipient(): string {
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  if (!adminEmail) {
    throw new Error("Missing required environment variable: ADMIN_EMAIL");
  }
  return adminEmail;
}

function getAdminLeadUrl(leadId: string): string | null {
  const baseUrl = process.env.NEXT_PUBLIC_URL?.trim().replace(/\/+$/, "");
  if (!baseUrl) {
    return null;
  }
  return `${baseUrl}/admin/leads/${leadId}`;
}

function normalizePreferredContact(value: string): string {
  const normalized = value.trim().toUpperCase();
  return CONTACT_METHOD_LABELS[normalized] ?? value;
}

export interface LeadEmailPayload {
  leadId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;
  carMake: string;
  carModel: string;
  carYear: number;
  carMileage: number;
  offeredPrice: number;
  notes: string;
  submittedAt: Date;
}

export async function sendLeadCustomerConfirmationEmail(payload: LeadEmailPayload) {
  const brandName = getBrandName();

  const html = await renderEmailTemplate("customer-lead-confirmation", {
    brandName,
    firstName: payload.firstName,
    carMake: payload.carMake,
    carModel: payload.carModel,
    carYear: payload.carYear,
    carMileage: payload.carMileage,
    offeredPrice: payload.offeredPrice,
  });

  return sendResendEmail({
    to: payload.email,
    subject: "Vielen Dank fur Ihre Anfrage bei Autoankauf Deutschland",
    html,
  });
}

export async function sendLeadAdminNotificationEmail(payload: LeadEmailPayload) {
  const brandName = getBrandName();

  const html = await renderEmailTemplate("admin-lead-notification", {
    brandName,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    preferredContact: normalizePreferredContact(payload.preferredContact),
    carMake: payload.carMake,
    carModel: payload.carModel,
    carYear: payload.carYear,
    carMileage: payload.carMileage,
    offeredPrice: payload.offeredPrice,
    notes: payload.notes,
    submittedAt: payload.submittedAt,
    adminLeadUrl: getAdminLeadUrl(payload.leadId),
  });

  return sendResendEmail({
    to: getAdminEmailRecipient(),
    subject: `Neue Anfrage: ${payload.carMake} ${payload.carModel} (${payload.carYear})`,
    html,
  });
}
