import { Output } from "../../../interface";
import { prisma } from "../../../prisma/prisma";
import UserAdminRepositry from "../../../repository/user/admin/user.admin.repository";
import {
  TUserSchemaAuthenticate,
  TUserSchemaCreate,
  TUserSchemaUpdateData,
} from "./../../../validation/user/user.validation";

export default class UserAdminService {
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

  public async updateByData(
    data: TUserSchemaUpdateData
  ): Promise<Output<string>> {
    const repositry = UserAdminRepositry.build(prisma);
    const { message, status } = await repositry.updateByData(data);
    return { status, message };
  }
}
