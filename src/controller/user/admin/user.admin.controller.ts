import {
  TUserSchemaAuthenticate,
  TUserSchemaCreate,
  userSchemaAuthenticate,
  userSchemaCreate,
} from "../../../validation/user/user.validation";
import { Request, Response } from "express";
import UserAdminService from "./../../../service/user/admin/user.admin.service";

export default class UserAdminController {
  private constructor() {}

  public static build() {
    return new UserAdminController();
  }

  public async create(req: Request, res: Response) {
    const data: TUserSchemaCreate = req.body;
    await userSchemaCreate
      .parseAsync({ ...data })
      .then(async (e) => {
        const service = UserAdminService.build();
        const { message, status } = await service.create(e);
        res.status(status).json(message);
      })
      .catch((error) => {
        console.log("Erro", error);
        res.status(400).json(error);
      });
  }

  public async authenticate(req: Request, res: Response) {
    const data: TUserSchemaAuthenticate = req.body;
    await userSchemaAuthenticate
      .parseAsync({ ...data })
      .then(async (e) => {
        const service = UserAdminService.build();
        const { message, status } = await service.authenticate(e);
        res.status(status).json(message);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

  public async updatebyData(req: Request, res: Response) {}
}
