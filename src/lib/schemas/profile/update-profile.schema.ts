import { z } from "zod";

export const updateProfileSchema = z.object({
  displayName: z.string().trim().min(2, "Display name must be at least 2 characters."),
  location: z
    .string()
    .trim()
    .max(64, "Location must be 64 characters or fewer.")
    .optional()
    .or(z.literal("")),
  bio: z.string().trim().max(280, "Bio must be 280 characters or fewer.").optional().or(z.literal("")),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
