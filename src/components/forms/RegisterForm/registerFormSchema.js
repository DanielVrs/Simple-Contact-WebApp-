import { z } from "zod";

export const registerFormSchema = z
  .object({
    fullName: z.string().nonempty("O nome é obrigatório"),
    email: z.string().nonempty("O email é obrigatório").email("Forneça um email valido"),
    password: z
      .string()
      .nonempty("A senha é obrigatória")
      .min(8, "São necessários pelo menos oito caracteres.")
      .regex(/[A-Z]+/, "É necessário conter ao menos uma letra maiúscula")
      .regex(/[a-z]+/, "É necessário conte ao menos uma letra minuscula")
      .regex(/[0-9]+/, "É necessário conte ao menos um número")
      .regex(
        /[!@#$%^&*()\-_=+[\]{};:'",.<>/?]+/,
        "É necessário conte ao menos um carácter especial"
      ),
    confirmPassword: z.string().nonempty("Confirmar a senha é obrigatório"),
    fone: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });
