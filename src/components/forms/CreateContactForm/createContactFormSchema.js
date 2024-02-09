import { z } from "zod";

export const createTechFormSchema = z.object({
  fullName: z.string().nonempty("O nome completo é obrigatório"),
  email: z.string().nonempty("O email é obrigatório"),
  fone: z.string().nonempty("O fone é obrigatório"),
});
