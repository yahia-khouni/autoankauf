import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      make,
      model,
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

    if (!make || !model || !year || !mileage || !offeredPrice) {
      return NextResponse.json(
        { error: "Bitte fullen Sie alle Fahrzeugdaten aus" },
        { status: 400 }
      );
    }

    const parsedOfferedPrice = parseInt(String(offeredPrice).replace(/\D/g, ""), 10);
    if (!Number.isFinite(parsedOfferedPrice) || parsedOfferedPrice <= 0) {
      return NextResponse.json(
        { error: "Bitte geben Sie einen gultigen Preisvorschlag ein" },
        { status: 400 }
      );
    }

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "Bitte fullen Sie alle Kontaktdaten aus" },
        { status: 400 }
      );
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        { error: "Bitte akzeptieren Sie die Datenschutzerklarung" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gultige E-Mail-Adresse ein" },
        { status: 400 }
      );
    }

    const cleanNotes = typeof notes === "string" ? notes.trim() : "";
    const customerOfferNote = `Kundenangebot: ${parsedOfferedPrice.toLocaleString("de-DE")} EUR`;
    const combinedNotes = cleanNotes ? `${customerOfferNote}\n\n${cleanNotes}` : customerOfferNote;

    const lead = await prisma.lead.create({
      data: {
        carMake: make,
        carModel: model,
        carYear: parseInt(year),
        carMileage: parseInt(mileage),
        carCondition: "GOOD",
        firstName,
        lastName,
        email,
        phone,
        preferredContact: contactMethod?.toUpperCase() || "PHONE",
        notes: combinedNotes,
        source: "website",
        status: "NEW",
      },
    });

    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || "noreply@autoankauf.de",
        to: email,
        subject: "Ihre Anfrage bei Autoankauf Deutschland",
        html: `
          <h1>Vielen Dank fur Ihre Anfrage!</h1>
          <p>Hallo ${firstName},</p>
          <p>wir haben Ihre Anfrage fur Ihr Fahrzeug erhalten:</p>
          <ul>
            <li><strong>Marke:</strong> ${make}</li>
            <li><strong>Modell:</strong> ${model}</li>
            <li><strong>Baujahr:</strong> ${year}</li>
            <li><strong>Kilometerstand:</strong> ${parseInt(mileage).toLocaleString("de-DE")} km</li>
            <li><strong>Ihr Preisvorschlag:</strong> ${parsedOfferedPrice.toLocaleString("de-DE")} EUR</li>
          </ul>
          <p>Wir werden uns innerhalb von 24 Stunden mit einem Angebot bei Ihnen melden.</p>
          <p>Mit freundlichen Grussen,<br>Ihr Autoankauf Deutschland Team</p>
        `,
      });

      await resend.emails.send({
        from: process.env.EMAIL_FROM || "noreply@autoankauf.de",
        to: process.env.ADMIN_EMAIL || "admin@autoankauf.de",
        subject: `Neue Anfrage: ${make} ${model} (${year})`,
        html: `
          <h1>Neue Lead-Anfrage</h1>
          <h2>Fahrzeugdaten:</h2>
          <ul>
            <li><strong>Marke:</strong> ${make}</li>
            <li><strong>Modell:</strong> ${model}</li>
            <li><strong>Baujahr:</strong> ${year}</li>
            <li><strong>Kilometerstand:</strong> ${parseInt(mileage).toLocaleString("de-DE")} km</li>
            <li><strong>Preisvorschlag Kunde:</strong> ${parsedOfferedPrice.toLocaleString("de-DE")} EUR</li>
          </ul>
          <h2>Kontaktdaten:</h2>
          <ul>
            <li><strong>Name:</strong> ${firstName} ${lastName}</li>
            <li><strong>E-Mail:</strong> ${email}</li>
            <li><strong>Telefon:</strong> ${phone}</li>
            <li><strong>Bevorzugter Kontakt:</strong> ${contactMethod}</li>
          </ul>
          ${cleanNotes ? `<h2>Anmerkungen:</h2><p>${cleanNotes}</p>` : ""}
          <p><a href="${process.env.NEXT_PUBLIC_URL}/admin/leads/${lead.id}">Lead im Admin-Bereich ansehen</a></p>
        `,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Ihre Anfrage wurde erfolgreich ubermittelt",
      leadId: lead.id,
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es spater erneut." },
      { status: 500 }
    );
  }
}
