import { writeFile } from "node:fs/promises";
import { renderEmailTemplate } from "../src/lib/email/templates";

async function main() {
  const customerHtml = await renderEmailTemplate("customer-lead-confirmation", {
    brandName: "Autoankauf Deutschland",
    firstName: "Max",
    carMake: "BMW",
    carModel: "3er",
    carYear: 2019,
    carMileage: 85000,
    offeredPrice: 17500,
  });

  const adminHtml = await renderEmailTemplate("admin-lead-notification", {
    brandName: "Autoankauf Deutschland",
    firstName: "Max",
    lastName: "Mustermann",
    email: "customer@example.com",
    phone: "+491701234567",
    preferredContact: "E-Mail",
    carMake: "BMW",
    carModel: "3er",
    carYear: 2019,
    carMileage: 85000,
    offeredPrice: 17500,
    notes: "Unfallfrei, Scheckheft gepflegt",
    submittedAt: new Date(),
    adminLeadUrl: "http://localhost:3000/admin/leads/test-lead-id",
  });

  await writeFile("customer-preview.html", customerHtml, "utf8");
  await writeFile("admin-preview.html", adminHtml, "utf8");
  console.log("Generated customer-preview.html and admin-preview.html");
}

main().catch((error) => {
  console.error("Failed to generate email previews:", error);
  process.exit(1);
});
