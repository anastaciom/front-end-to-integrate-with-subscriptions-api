import { z } from "zod";

type LoginSchema = z.infer<typeof loginSchema>;
type RegisterSchema = z.infer<typeof registerSchema>;

export type TFormSchema = LoginSchema & RegisterSchema;

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Campo obrigatório.")
    .email("Formato do E-email inválido.")
    .toLowerCase(),
  password: z
    .string()
    .nonempty("Campo obrigatório.")
    .min(6, "Mínimo de 6 caracteres."),
});

const registerSchema = loginSchema.extend({
  name: z
    .string()
    .nonempty("Campo obrigatório.")
    .transform((value) => value.trim())
    .refine(
      (value) => !value.includes(" "),
      "Somente o primeiro nome é permitido."
    )
    .transform(
      (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    ),
});

export const formSchema = (isRegisterForm: boolean) => {
  let schema;

  if (isRegisterForm) {
    schema = registerSchema;
  } else {
    schema = loginSchema;
  }

  return schema;
};
