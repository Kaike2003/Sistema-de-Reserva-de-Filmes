import { Output } from "../../../interface";
import { IUserAdminService } from "../../../interface/user/admin/service/user.admin.service";
import { prisma } from "../../../prisma/prisma";
import UserAdminRepositry from "../../../repository/user/admin/user.admin.repository";
import {
  TUserSchemaAuthenticate,
  TUserSchemaCreate,
  TUserSchemaUpdateData,
  TUserSchemaUpdateEmail,
  TUserSchemaUpdatePassword,
  TUserSchemaUpdateUsername,
} from "./../../../validation/user/user.validation";

export default class UserAdminService implements IUserAdminService {
  private constructor() {}

  public static build() {
    return new UserAdminService();
  }

  public async create(data: TUserSchemaCreate): Promise<Output<string>> {
    const repository = UserAdminRepositry.build(prisma);
    const { status, message } = await repository.create(data);
    return { status, message };
  }

  public async authenticate(
    data: TUserSchemaAuthenticate
  ): Promise<Output<string>> {
    const repository = UserAdminRepositry.build(prisma);
    const { message, status } = await repository.authenticate(data);
    return { status, message };
  }

  public async updateData(
    data: TUserSchemaUpdateData
  ): Promise<Output<string>> {
    const repositry = UserAdminRepositry.build(prisma);
    const { message, status } = await repositry.updateData(data);
    return { status, message };
  }

  public async updateUsername(
    data: TUserSchemaUpdateUsername
  ): Promise<Output<string>> {
    const repository = UserAdminRepositry.build(prisma);
    const { message, status } = await repository.updateUsername(data);
    return { status, message };
  }

  public async updatePassword(
    data: TUserSchemaUpdatePassword
  ): Promise<Output<string>> {
    const repository = UserAdminRepositry.build(prisma);
    const { status, message } = await repository.updatePassword(data);
    return { status, message };
  }

  public async updateEmail(
    data: TUserSchemaUpdateEmail
  ): Promise<Output<string>> {
    const repository = UserAdminRepositry.build(prisma);
    const { status, message } = await repository.updateEmail(data);
    return { status, message };
  }
}
