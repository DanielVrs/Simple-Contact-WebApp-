import { z } from "zod";

export const editTechFormSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  fone: z.string(),
});
