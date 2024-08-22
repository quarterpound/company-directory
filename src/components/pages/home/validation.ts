import { z } from "zod";

export const searchValidation = z.object({
  search: z.string(),
  industry: z.string().array(),
  services: z.string().array(),
  specialities: z.string().array(),
  city: z.string().array(),
});

export type SearchValidation = z.infer<typeof searchValidation>;
