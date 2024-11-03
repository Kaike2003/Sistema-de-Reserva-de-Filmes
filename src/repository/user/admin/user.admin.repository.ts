import { PrismaClient } from "@prisma/client";
import { Output } from "../../../interface";
import {
  TUserSchemaAuthenticate,
  TUserSchemaCreate,
  TUserSchemaUpdateData,
  TUserSchemaUpdatePassword,
  TUserSchemaUpdateUsername,
} from "../../../validation/user/user.validation";
import UserNodemailer from "../../../utils/nodemailer/user/nodemailer.user";
import shortid from "shortid";
import UserRepositoryUtils from "../utils/verify/user.repository.utils";
import Bcrypt from "../../../utils/bcrypt/bcrypt";

export default class UserAdminRepository {
  private constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserAdminRepository(prisma);
  }

  public async create(data: TUserSchemaCreate): Promise<Output<string>> {
    const mail = UserNodemailer.build();
    const { email, username, password } = data;
    const verify = UserRepositoryUtils.build(this.prisma);
    const hash = Bcrypt.build();
    const code = shortid.generate();
    const verifyEmail = await verify.email(email);
    const verifyCode = await verify.code(code);
    const verifyUsername = await verify.username(username);

    if (verifyEmail) {
      return { status: 400, message: "Este e-mail já está em uso." };
    }

    if (verifyCode) {
      return { status: 400, message: "Este código já está em uso." };
    }

    if (verifyUsername) {
      return { status: 400, message: "Este nome de usuário já está em uso." };
    }

    return await this.prisma.user
      .create({
        data: {
          ...data,
          typeUser: "admin",
          code,
          password: await hash.hash(password),
        },
      })
      .then(async () => {
        await mail.sendCodeAuthentication({ email, code });
        return {
          status: 201,
          message:
            "Conta criada com sucesso. Por favor, verifique seu e-mail, onde enviamos um código para autenticação da sua conta.",
        };
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        return { status: 500, message: "Erro ao criar usuário." };
      });
  }

  public async authenticate(
    data: TUserSchemaAuthenticate
  ): Promise<Output<string>> {
    const { code } = data;
    const verify = UserRepositoryUtils.build(this.prisma);
    const verifyAuthenticated = await verify.authenticated(code);

    if (verifyAuthenticated === false) {
      const user = await this.prisma.user.update({
        where: {
          code,
        },
        data: {
          autenticated: true,
        },
      });
      return { status: 200, message: "Conta autenticada com sucesso." };
    }

    return { status: 400, message: "Sua conta já está autenticada." };
  }

  public async updateData(
    data: TUserSchemaUpdateData
  ): Promise<Output<string>> {
    const { username } = data;
    const verify = UserRepositoryUtils.build(this.prisma);
    const verifyUsername = await verify.username(username);

    if (verifyUsername) {
      return await this.prisma.user
        .update({
          where: {
            username,
          },
          data: { ...data },
        })
        .then(async (e) => {
          return { status: 200, message: "Dados atualizados com sucesso." };
        })
        .catch((error) => {
          return { status: 400, message: error };
        });
    }

    return { status: 200, message: "Usuário inválido" };
  }

  public async updateUsername(
    data: TUserSchemaUpdateUsername
  ): Promise<Output<string>> {
    const { email, username } = data;
    const verify = UserRepositoryUtils.build(this.prisma);
    const verifyEmail = await verify.email(email);
    const verifyUsername = await verify.username(username);

    if (verifyUsername) {
      return { status: 400, message: "Este username já está em uso." };
    }

    if (verifyEmail && verifyUsername === false) {
      return await this.prisma.user
        .update({
          where: { email },
          data: { ...data },
        })
        .then(async (e) => {
          return { status: 200, message: "Username atualizado com sucesso." };
        })
        .catch((error) => {
          return { status: 400, message: error };
        });
    }

    return { status: 400, message: "Email inválido." };
  }

  public async updatePassword(
    data: TUserSchemaUpdatePassword
  ): Promise<Output<string>> {
    const { username, passwordOld, passwordNew } = data;
    const bcrypt = Bcrypt.build();
    const verify = UserRepositoryUtils.build(this.prisma);
    const { compare, hash } = bcrypt;
    const verifyUsername = await verify.username(username);
    const hashDb = await verify.getPassword(username);

    if (verifyUsername && hashDb) {
      const result = await compare(passwordOld, hashDb);

      if (result) {
        return await this.prisma.user
          .update({
            where: { username },
            data: {
              password: await hash(passwordNew),
            },
          })
          .then(() => {
            return {
              status: 200,
              message: "Palavra passe atualizada com sucesso.",
            };
          })
          .catch((error) => {
            return { status: 400, message: error };
          });
      }

      return { status: 400, message: "Palavra passe antiga incorreta." };
    }

    return { status: 400, message: "Username inválido" };
  }
}
