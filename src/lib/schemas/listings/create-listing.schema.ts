import { z } from "zod";

export const createListingSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(5000),
  startingBid: z.number().int().positive(),
  endAt: z.date(),
});
