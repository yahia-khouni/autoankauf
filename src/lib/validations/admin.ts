import { z } from "zod";

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "OFFER_MADE",
  "NEGOTIATING",
  "SOLD",
  "LOST",
  "SPAM",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const statusUpdateSchema = z.object({
  status: z.enum(LEAD_STATUSES),
  note: z.string().optional(),
});

export const adminNotesSchema = z.object({
  adminNotes: z.string(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const leadsQuerySchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});
