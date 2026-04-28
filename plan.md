# Integration Plan: One-Time Admin Setup + SMTP Email Service (Next.js 14)

## 1) Objective

Implement two production-safe features, fully aligned with the current Next.js App Router architecture:

1. **One-time admin bootstrap after deployment** (no public signup flow, exactly one initial admin created once).
2. **SMTP-based email delivery** (replace Resend), sending exactly:
   - customer confirmation email after lead submission,
   - admin notification email containing all submitted lead details.

This plan is implementation-ready and mapped to the existing project structure.

---

## 2) Current State Analysis (project-specific)

### 2.1 Auth/admin architecture today

- Auth uses **NextAuth Credentials** with Prisma `Admin` model:
  - `src/lib/auth.ts`
  - `src/app/api/auth/[...nextauth]/route.ts`
- Admin pages are protected via:
  - `src/middleware.ts` (JWT gate for `/admin/*`)
  - server-side checks in admin API routes and protected layouts.
- There is **no visible signup UI** in the current app (only `/admin/login`).
- Initial admin is currently auto-created in `prisma/seed.ts` with static credentials (`admin@autoankauf.de` / `admin123`) — this conflicts with post-deployment one-time setup.

### 2.2 Lead + email flow today

- Lead submission endpoint: `src/app/api/leads/submit/route.ts`
- It stores lead in DB, then sends two emails via **Resend**:
  - customer acknowledgement,
  - admin notification.
- Emails are inline HTML strings in route handler.
- Failures in email sending are logged and do not block lead creation (current behavior).

### 2.3 Environment/docs mismatch

- `.env.example` and `README.md` currently describe Resend.
- No SMTP contract exists yet.

---

## 3) Legacy Files Deep Analysis (from `src/configurations inspiration`)

### 3.1 `setup.routes.js` behavior to preserve

- `POST /create-first-admin`:
  - checks if an admin already exists,
  - blocks creation if setup already completed,
  - validates required fields + email format + password length,
  - hashes password (`bcrypt` salt rounds 12),
  - creates admin record,
  - handles duplicate email conflict.
- `GET /status`:
  - returns `setupRequired: true|false` based on whether admin exists.

**Core transferable pattern:** endpoint is **self-disabling** by querying admin existence, not by toggle flag.

### 3.2 `email.services.js` behavior to preserve/adapt

- SMTP transport lifecycle:
  - initialize once,
  - verify connection,
  - send via a generic method.
- Handlebars template rendering from `.hbs` files.
- Template caching and helper registration.

**What to keep for this project:** SMTP init + `.hbs` templating + typed send methods.
**What to skip:** queueing, bulk campaigns, OTP/reminders, shop-settings cache complexity.

---

## 4) Target Design for Current Next.js Setup

## 4.1 One-time admin setup (App Router compatible)

Implement dedicated setup API handlers under `src/app/api/setup/`:

- `GET /api/setup/status` → check if setup is needed.
- `POST /api/setup/create-first-admin` → create initial admin only when admin count is zero.

Design rules:

- Query `prisma.admin.count()` to enforce one-time behavior.
- Use **Zod validation** for payload (`name`, `email`, `password`).
- Hash password with existing `bcryptjs` usage.
- Return clear statuses:
  - `200` for status check,
  - `201` on successful admin creation,
  - `403` if setup already completed,
  - `400` for invalid payload,
  - `409` for duplicate email.
- Keep admin creation out of public UI (no signup page).

Security hardening for deployment phase:

- Require one-time setup secret in request header (for example `x-setup-token`) backed by env var (for example `SETUP_ADMIN_TOKEN`).
- If token missing/invalid, return `401`.
- Once first admin exists, endpoint remains blocked even with valid token.

## 4.2 SMTP email service (replace Resend)

Introduce a small, focused email layer:

- `src/lib/email/smtp.ts`  
  Creates and caches nodemailer transporter (lazy init + verify).
- `src/lib/email/templates.ts`  
  Loads and compiles `.hbs` templates (with minimal helpers where needed).
- `src/lib/email/lead-emails.ts`  
  Exposes two methods only:
  - `sendLeadCustomerConfirmation(...)`
  - `sendLeadAdminNotification(...)`

Template files:

- `src/templates/emails/customer-lead-confirmation.hbs`
- `src/templates/emails/admin-lead-notification.hbs`

Integration point:

- Refactor `src/app/api/leads/submit/route.ts` to call the new service after lead creation.
- Preserve existing behavior: lead creation success is not rolled back if email sending fails; errors remain logged.

---

## 5) Detailed End-to-End Execution Plan

## Phase A — Admin setup migration

1. Add setup status route (`GET /api/setup/status`).
2. Add create-first-admin route (`POST /api/setup/create-first-admin`).
3. Add shared setup validation schema (`src/lib/validations/setup.ts`).
4. Add setup token guard utility (single reusable function for setup routes).
5. Ensure responses are JSON and aligned with current API conventions.
6. Remove default admin auto-creation from `prisma/seed.ts`; keep catalog seeding only.
7. Update onboarding/deployment docs with secure one-time setup sequence.

## Phase B — SMTP foundation

1. Add SMTP dependencies:
   - `nodemailer`
   - `handlebars`
   - relevant types if needed for TS.
2. Implement SMTP transporter module with strict env validation:
   - host, port, secure flag, username, password, from.
3. Implement template compile module for `.hbs` files.
4. Create two polished responsive HTML templates:
   - customer thank-you email,
   - admin lead details email.

## Phase C — Lead email integration

1. Replace inline Resend email calls in `src/app/api/leads/submit/route.ts`.
2. Map sanitized lead fields into template payload.
3. Build lead deep-link for admin email using `NEXT_PUBLIC_URL`.
4. Keep explicit logging for SMTP/template failures.
5. Keep API success contract unchanged for frontend compatibility.

## Phase D — Cleanup and contract updates

1. Remove `resend` import/usage from code.
2. Remove `resend` dependency from `package.json`.
3. Update `.env.example`:
   - remove `RESEND_API_KEY`,
   - add SMTP variables.
4. Update `README.md` deployment/setup sections:
   - one-time admin setup flow,
   - SMTP configuration.

## Phase E — Verification gates

1. Lint/type/build checks for Next.js + Prisma project.
2. API behavior checks:
   - setup status before/after admin creation,
   - one-time lock after first admin.
3. Lead submission behavior checks:
   - both emails render and send,
   - customer/admin recipients are correct,
   - no frontend contract regression.

---

## 6) Planned File-Level Changes

| Path | Action | Purpose |
|---|---|---|
| `src/app/api/setup/status/route.ts` | Create | Setup state endpoint (`setupRequired`) |
| `src/app/api/setup/create-first-admin/route.ts` | Create | One-time admin creation endpoint |
| `src/lib/validations/setup.ts` | Create | Zod schema for setup payload |
| `src/lib/setup-guard.ts` (or similar) | Create | Shared setup token + admin-exists guard |
| `prisma/seed.ts` | Update | Remove hardcoded admin bootstrap |
| `src/lib/email/smtp.ts` | Create | SMTP transporter singleton/init |
| `src/lib/email/templates.ts` | Create | Handlebars template loading/compilation |
| `src/lib/email/lead-emails.ts` | Create | Two lead-specific send functions |
| `src/templates/emails/customer-lead-confirmation.hbs` | Create | Customer email template |
| `src/templates/emails/admin-lead-notification.hbs` | Create | Admin notification template |
| `src/app/api/leads/submit/route.ts` | Update | Replace Resend with SMTP service |
| `.env.example` | Update | SMTP env contract + setup token env |
| `README.md` | Update | Post-deploy admin setup + SMTP instructions |
| `package.json` | Update | Remove `resend`, add SMTP/template deps |

---

## 7) Environment Contract (target)

Required runtime variables after migration:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE` (`true/false`)
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM` (display sender/from mailbox)
- `ADMIN_EMAIL`
- `NEXT_PUBLIC_URL`
- `SETUP_ADMIN_TOKEN` (for one-time setup endpoint)

No longer needed:

- `RESEND_API_KEY`

---

## 8) Email Template Content Plan

### 8.1 Customer email (`customer-lead-confirmation.hbs`)

Content structure:

- Branded header (company name/logo text treatment)
- Personalized greeting with customer first name
- Vehicle summary card (make/model/year/mileage/offered price)
- Assurance message ("we will respond quickly")
- Support contact block
- Footer with legal-safe text

### 8.2 Admin email (`admin-lead-notification.hbs`)

Content structure:

- "New lead" alert header
- Full vehicle data section
- Full customer contact section
- Optional notes block (rendered conditionally)
- CTA button/link to `/admin/leads/{leadId}`
- Submission timestamp block

Design constraints:

- Table + inline CSS compatible with major inboxes.
- Clean responsive layout with readable hierarchy.
- Safe field escaping before template render.

---

## 9) Risks and Mitigations

1. **Unauthorized first-admin takeover before legitimate setup**  
   Mitigation: setup token header requirement + immediate endpoint self-disable after first admin.

2. **SMTP provider nuances (TLS/port/auth mismatch)**  
   Mitigation: strict startup validation + `transporter.verify()` and explicit error logs.

3. **Template path/runtime resolution issues in Next build**  
   Mitigation: central template loader with deterministic path strategy and integration test in build-like environment.

4. **Behavior regression in lead submission API**  
   Mitigation: preserve existing JSON response contract and non-blocking email failure path.

---

## 10) Acceptance Criteria

Feature is complete when all are true:

1. App has no signup flow; initial admin is created only through one-time setup endpoint.
2. Setup endpoint:
   - works only when no admin exists,
   - requires setup token,
   - returns blocked response after first admin creation.
3. Lead submission sends two SMTP emails (customer + admin) using `.hbs` templates.
4. Resend dependency and API key usage are removed from code and env docs.
5. `.env.example` and `README.md` reflect the new deployment/runtime process.
6. Existing admin login/dashboard flow remains operational.

---

## 11) Task List (implementation order)

1. Build setup API routes + validation + setup guard.
2. Remove seed-based admin bootstrap and update setup docs.
3. Build SMTP core modules and template renderer.
4. Create customer/admin `.hbs` templates.
5. Integrate SMTP service into lead submit route.
6. Remove Resend dependency and migrate env/docs.
7. Run final compatibility and behavior checks.

