import { z } from "zod";

export const searchValidation = z.object({
  search: z.string().default(""),
  industry: z.string().array().default([]),
  services: z.string().array().default([]),
  specialities: z.string().array().default([]),
  city: z.string().array().default([]),
  page: z.coerce.number().default(0).optional(),
  limit: z.coerce.number().default(10).optional(),
});

export type SearchValidation = z.infer<typeof searchValidation>;
