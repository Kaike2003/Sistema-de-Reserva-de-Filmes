import { z } from "zod";

const today = new Date();
const minDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);

const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." })
    .max(20, { message: "O nome deve ter no máximo 20 caracteres." }),

  surname: z
    .string()
    .min(3, { message: "O sobrenome deve ter no mínimo 3 caracteres." })
    .max(20, { message: "O sobrenome deve ter no máximo 20 caracteres." }),

  username: z
    .string()
    .min(3, { message: "O nome de usuário deve ter no mínimo 3 caracteres." })
    .max(20, {
      message: "O nome de usuário deve ter no máximo 20 caracteres.",
    }),

  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    .max(20, { message: "A senha deve ter no máximo 20 caracteres." })
    .regex(/[A-Z]/, {
      message: "A senha deve ter pelo menos uma letra maiúscula.",
    })
    .regex(/[a-z]/, {
      message: "A senha deve ter pelo menos uma letra minúscula.",
    })
    .regex(/\d/, { message: "A senha deve ter pelo menos um número." })
    .regex(/[@$!%*?&]/, {
      message: "A senha deve ter pelo menos um caractere especial (@$!%*?&).",
    }),

  email: z.string().email({ message: "O email deve ser um endereço válido." }),

  birthday: z
    .string()
    .transform((value) => new Date(value))
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Data de nascimento inválida.",
    })
    .refine((date) => date <= minDate, {
      message: "O usuário deve ter no mínimo 18 anos.",
    }),
});

export const userSchemaAuthenticate = z.object({
  code: z.string().min(9),
});

export const userSchemaCreate = userSchema;
export const userSchemaUpdateData = userSchema.pick({
  name: true,
  surname: true,
  username: true,
  birthday: true,
});

export const userSchemaUpdateUsername = userSchema.pick({
  username: true,
  email: true,
});

export type TUserSchemaCreate = z.infer<typeof userSchemaCreate>;
export type TUserSchemaAuthenticate = z.infer<typeof userSchemaAuthenticate>;
export type TUserSchemaUpdateData = z.infer<typeof userSchemaUpdateData>;
export type TUserSchemaUpdateUsername = z.infer<
  typeof userSchemaUpdateUsername
>;
