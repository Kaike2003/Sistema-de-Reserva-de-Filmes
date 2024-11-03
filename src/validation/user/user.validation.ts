import { object, z } from "zod";

const today = new Date();
const minDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);

const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa ter pelo menos 3 caracteres." })
    .max(20, { message: "O nome não pode ultrapassar 20 caracteres." }),

  surname: z
    .string()
    .min(3, { message: "O sobrenome precisa ter pelo menos 3 caracteres." })
    .max(20, { message: "O sobrenome não pode ultrapassar 20 caracteres." }),

  username: z
    .string()
    .min(3, {
      message: "O nome de usuário precisa ter pelo menos 3 caracteres.",
    })
    .max(20, {
      message: "O nome de usuário não pode ultrapassar 20 caracteres.",
    }),

  password: z
    .string()
    .min(8, { message: "A senha precisa ter no mínimo 8 caracteres." })
    .max(20, { message: "A senha não pode ultrapassar 20 caracteres." })
    .regex(/[A-Z]/, {
      message: "A senha deve conter pelo menos uma letra maiúscula.",
    })
    .regex(/[a-z]/, {
      message: "A senha deve conter pelo menos uma letra minúscula.",
    })
    .regex(/\d/, { message: "A senha deve incluir pelo menos um número." })
    .regex(/[@$!%*?&]/, {
      message: "A senha deve ter ao menos um caractere especial (@$!%*?&).",
    }),

  passwordOld: z
    .string()
    .min(8, { message: "A senha antiga precisa ter no mínimo 8 caracteres." })
    .max(20, { message: "A senha antiga não pode ultrapassar 20 caracteres." })
    .regex(/[A-Z]/, {
      message: "A senha antiga deve conter pelo menos uma letra maiúscula.",
    })
    .regex(/[a-z]/, {
      message: "A senha antiga deve conter pelo menos uma letra minúscula.",
    })
    .regex(/\d/, {
      message: "A senha antiga deve incluir pelo menos um número.",
    })
    .regex(/[@$!%*?&]/, {
      message:
        "A senha antiga deve ter ao menos um caractere especial (@$!%*?&).",
    }),

  passwordNew: z
    .string()
    .min(8, { message: "A nova senha precisa ter no mínimo 8 caracteres." })
    .max(20, { message: "A nova senha não pode ultrapassar 20 caracteres." })
    .regex(/[A-Z]/, {
      message: "A nova senha deve conter pelo menos uma letra maiúscula.",
    })
    .regex(/[a-z]/, {
      message: "A nova senha deve conter pelo menos uma letra minúscula.",
    })
    .regex(/\d/, { message: "A nova senha deve incluir pelo menos um número." })
    .regex(/[@$!%*?&]/, {
      message:
        "A nova senha deve ter ao menos um caractere especial (@$!%*?&).",
    }),

  code: z
    .string()
    .min(9, { message: "O código precisa ter pelo menos 9 caracteres." }),

  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de e-mail válido." }),

  birthday: z
    .string()
    .transform((value) => new Date(value))
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message:
        "Data de nascimento inválida. Por favor, insira uma data válida.",
    })
    .refine((date) => date <= minDate, {
      message: "É necessário ter ao menos 18 anos para se cadastrar.",
    }),
});

export const userSchemaAuthenticate = userSchema.pick({ code: true });

export const userSchemaCreate = userSchema.pick({
  name: true,
  surname: true,
  username: true,
  password: true,
  email: true,
  birthday: true,
});

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

export const userSchemaUpdatePassword = userSchema.pick({
  passwordNew: true,
  passwordOld: true,
  username: true,
});

export type TUserSchemaCreate = z.infer<typeof userSchemaCreate>;
export type TUserSchemaAuthenticate = z.infer<typeof userSchemaAuthenticate>;
export type TUserSchemaUpdateData = z.infer<typeof userSchemaUpdateData>;
export type TUserSchemaUpdateUsername = z.infer<
  typeof userSchemaUpdateUsername
>;
export type TUserSchemaUpdatePassword = z.infer<
  typeof userSchemaUpdatePassword
>;
