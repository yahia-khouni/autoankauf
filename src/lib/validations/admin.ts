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

export const createMakeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens only"),
  logoUrl: z.string().url().optional().or(z.literal("")),
});

export const updateMakeSchema = createMakeSchema.partial();

export const makesQuerySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(2000).default(20),
  sort: z.string().default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export const createModelSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens only"),
  makeId: z.string().min(1, "Make is required"),
  yearsProduced: z.string().optional().or(z.literal("")),
});

export const updateModelSchema = createModelSchema.partial();

export const modelsQuerySchema = z.object({
  search: z.string().optional(),
  makeId: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(2000).default(20),
  sort: z.string().default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});
