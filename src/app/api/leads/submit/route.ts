import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { stripTags, sanitizeString, isValidEmail, isValidPhone } from "@/lib/sanitize";
import { logger } from "@/lib/logger";
import {
  sendLeadAdminNotificationEmail,
  sendLeadCustomerConfirmationEmail,
} from "@/lib/email/lead-emails";

function normalizeOrigin(input?: string | null): string | null {
  const value = input?.trim();
  if (!value) return null;

  const withProtocol = /^https?:\/\//i.test(value)
    ? value
    : /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(value)
      ? `http://${value}`
      : `https://${value}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

function getRequestOrigin(request: NextRequest): string | null {
  const origin = request.headers.get("origin");
  if (origin) {
    const normalized = normalizeOrigin(origin);
    if (normalized) return normalized;
  }

  const referer = request.headers.get("referer");
  if (referer) {
    const normalized = normalizeOrigin(referer);
    if (normalized) return normalized;
  }

  return null;
}

const ALLOWED_ORIGINS = new Set(
  [
    process.env.NEXT_PUBLIC_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
    "http://localhost:3000",
    "http://localhost:3001",
  ]
    .map(normalizeOrigin)
    .filter((origin): origin is string => Boolean(origin))
);

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  // ── CSRF: Origin check ────────────────────────────────────────────────────
  const requestOrigin = getRequestOrigin(request);
  const hostOrigin = request.nextUrl.origin;
  const isAllowedOrigin =
    requestOrigin !== null &&
    (requestOrigin === hostOrigin || ALLOWED_ORIGINS.has(requestOrigin));

  if (!isAllowedOrigin) {
    logger.warn(
      `[Submit] CSRF blocked — origin: ${requestOrigin ?? "missing"}, host: ${hostOrigin}`
    );
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // ── Rate limit: 5 submissions per IP per 10 minutes ───────────────────────
  const ip = getClientIp(request);
  const limit = rateLimit(ip, 5, 10 * 60 * 1000);
  if (limit.limited) {
    const retryAfter = Math.ceil(limit.resetIn / 1000);
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const body = await request.json();

    const {
      make,
      model,
      makeId,
      modelId,
      year,
      mileage,
      offeredPrice,
      firstName,
      lastName,
      email,
      phone,
      contactMethod,
      notes,
      privacyAccepted,
    } = body;

    let resolvedMake = sanitizeString(make, 100);
    let resolvedModel = sanitizeString(model, 100);

    if (typeof makeId === "string" && makeId && typeof modelId === "string" && modelId) {
      const makeRecord = await prisma.carMake.findUnique({
        where: { id: makeId },
        select: { id: true, name: true },
      });

      if (!makeRecord) {
        return NextResponse.json(
          { error: "Bitte wählen Sie eine gültige Marke" },
          { status: 400 }
        );
      }

      const modelRecord = await prisma.carModel.findFirst({
        where: { id: modelId, makeId: makeRecord.id },
        select: { id: true, name: true },
      });

      if (!modelRecord) {
        return NextResponse.json(
          { error: "Bitte wählen Sie ein gültiges Modell" },
          { status: 400 }
        );
      }

      resolvedMake = makeRecord.name;
      resolvedModel = modelRecord.name;
    }

    if (!resolvedMake || !resolvedModel || !year || !mileage || !offeredPrice) {
      return NextResponse.json(
        { error: "Bitte füllen Sie alle Fahrzeugdaten aus" },
        { status: 400 }
      );
    }

    const parsedYear = parseInt(String(year), 10);
    if (!Number.isFinite(parsedYear) || parsedYear < 1900 || parsedYear > new Date().getFullYear() + 1) {
      return NextResponse.json(
        { error: "Bitte geben Sie ein gültiges Baujahr ein" },
        { status: 400 }
      );
    }

    const parsedMileage = parseInt(String(mileage), 10);
    if (!Number.isFinite(parsedMileage) || parsedMileage < 0 || parsedMileage > 2_000_000) {
      return NextResponse.json(
        { error: "Bitte geben Sie einen gültigen Kilometerstand ein" },
        { status: 400 }
      );
    }

    const parsedOfferedPrice = parseInt(String(offeredPrice).replace(/\D/g, ""), 10);
    if (!Number.isFinite(parsedOfferedPrice) || parsedOfferedPrice <= 0 || parsedOfferedPrice > 10_000_000) {
      return NextResponse.json(
        { error: "Bitte geben Sie einen gültigen Preisvorschlag ein" },
        { status: 400 }
      );
    }

    const cleanFirstName = sanitizeString(firstName, 100);
    const cleanLastName  = sanitizeString(lastName, 100);
    const cleanEmail     = sanitizeString(email, 254);
    const cleanPhone     = sanitizeString(phone, 30);

    if (!cleanFirstName || !cleanLastName || !cleanEmail || !cleanPhone) {
      return NextResponse.json(
        { error: "Bitte füllen Sie alle Kontaktdaten aus" },
        { status: 400 }
      );
    }

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gültige E-Mail-Adresse ein" },
        { status: 400 }
      );
    }

    if (!isValidPhone(cleanPhone)) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gültige Telefonnummer ein" },
        { status: 400 }
      );
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        { error: "Bitte akzeptieren Sie die Datenschutzerklärung" },
        { status: 400 }
      );
    }

    // Strip HTML tags from notes (free-text field)
    const cleanNotes       = stripTags(sanitizeString(notes, 2000));
    const customerOfferNote = `Kundenangebot: ${parsedOfferedPrice.toLocaleString("de-DE")} EUR`;
    const combinedNotes     = cleanNotes
      ? `${customerOfferNote}\n\n${cleanNotes}`
      : customerOfferNote;

    const lead = await prisma.lead.create({
      data: {
        carMake:          resolvedMake,
        carModel:         resolvedModel,
        carYear:          parsedYear,
        carMileage:       parsedMileage,
        carCondition:     "GOOD",
        firstName:        cleanFirstName,
        lastName:         cleanLastName,
        email:            cleanEmail,
        phone:            cleanPhone,
        preferredContact: typeof contactMethod === "string"
          ? contactMethod.toUpperCase().slice(0, 20)
          : "PHONE",
        notes:  combinedNotes,
        source: "website",
        status: "NEW",
      },
    });

    try {
      const emailPayload = {
        leadId: lead.id,
        firstName: cleanFirstName,
        lastName: cleanLastName,
        email: cleanEmail,
        phone: cleanPhone,
        preferredContact:
          typeof contactMethod === "string" && contactMethod.trim()
            ? contactMethod
            : "PHONE",
        carMake: resolvedMake,
        carModel: resolvedModel,
        carYear: parsedYear,
        carMileage: parsedMileage,
        offeredPrice: parsedOfferedPrice,
        notes: cleanNotes,
        submittedAt: lead.createdAt,
      };

      await sendLeadCustomerConfirmationEmail(emailPayload);
      await sendLeadAdminNotificationEmail(emailPayload);
    } catch (emailError) {
      logger.error("Email sending failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Ihre Anfrage wurde erfolgreich übermittelt",
      leadId:  lead.id,
    });
  } catch (error) {
    logger.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." },
      { status: 500 }
    );
  }
}
