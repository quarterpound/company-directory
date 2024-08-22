import { z } from "zod";

export const claimValidation = z.object({
  first: z.string().min(1),
  last: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1).max(16),
  message: z.string().min(0).max(256),
});

export type ClaimValidation = z.infer<typeof claimValidation>;
