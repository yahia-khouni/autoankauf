import { z } from "zod";

export const createFirstAdminSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name must be at most 100 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name must be at most 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email format")
    .max(254, "Email must be at most 254 characters"),
  phone: z.string().trim().max(30, "Phone must be at most 30 characters").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be at most 128 characters"),
});

export type CreateFirstAdminInput = z.infer<typeof createFirstAdminSchema>;
