import { readFile } from "node:fs/promises";
import path from "node:path";
import Handlebars, { type TemplateDelegate } from "handlebars";

const templateCache = new Map<string, TemplateDelegate>();
let helpersRegistered = false;

function registerHelpers() {
  if (helpersRegistered) {
    return;
  }

  Handlebars.registerHelper("formatNumber", (value: unknown) => {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return "";
    }
    return value.toLocaleString("de-DE");
  });

  Handlebars.registerHelper("formatCurrency", (value: unknown) => {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return "";
    }
    return `${value.toLocaleString("de-DE")} EUR`;
  });

  Handlebars.registerHelper("formatDateTime", (value: unknown) => {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      return "";
    }
    return new Intl.DateTimeFormat("de-DE", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/Berlin",
    }).format(value);
  });

  helpersRegistered = true;
}

async function getCompiledTemplate(templateName: string): Promise<TemplateDelegate> {
  const cached = templateCache.get(templateName);
  if (cached) {
    return cached;
  }

  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    "emails",
    `${templateName}.hbs`
  );
  const content = await readFile(templatePath, "utf8");
  const compiled = Handlebars.compile(content, { noEscape: false });
  templateCache.set(templateName, compiled);
  return compiled;
}

export async function renderEmailTemplate(
  templateName: string,
  data: Record<string, unknown>
): Promise<string> {
  registerHelpers();
  const template = await getCompiledTemplate(templateName);
  return template(data);
}
