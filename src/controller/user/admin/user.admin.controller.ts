import {
  TUserSchemaAuthenticate,
  TUserSchemaCreate,
  TUserSchemaUpdateData,
  TUserSchemaUpdateEmail,
  TUserSchemaUpdatePassword,
  TUserSchemaUpdateUsername,
  userSchemaAuthenticate,
  userSchemaCreate,
  userSchemaUpdateData,
  userSchemaUpdateEmail,
  userSchemaUpdatePassword,
  userSchemaUpdateUsername,
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

  public async updateData(req: Request<ParamsUpdateData>, res: Response) {
    const data: TUserSchemaUpdateData = req.body;
    const { username }: ParamsUpdateData = req.params;

    userSchemaUpdateData
      .parseAsync({ ...data, username })
      .then(async (e) => {
        const service = UserAdminService.build();
        const { status, message } = await service.updateData(e);
        res.status(status).json(message);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

  public async updateUsername(
    req: Request<ParamsUpdateUsername>,
    res: Response
  ) {
    const data: TUserSchemaUpdateUsername = req.body;
    const { email }: ParamsUpdateUsername = req.params;

    userSchemaUpdateUsername
      .parseAsync({ ...data, email })
      .then(async (e) => {
        const service = UserAdminService.build();
        const { message, status } = await service.updateUsername(e);
        res.status(status).json(message);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

  public async updatePassword(
    req: Request<ParamsUpdatePassword>,
    res: Response
  ) {
    const data: TUserSchemaUpdatePassword = req.body;
    const { username }: ParamsUpdatePassword = req.params;

    userSchemaUpdatePassword
      .parseAsync({ ...data, username })
      .then(async (e) => {
        const service = UserAdminService.build();
        const { status, message } = await service.updatePassword(e);
        res.status(status).json(message);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

  public async updateEmail(req: Request<ParamsUpdateEmail>, res: Response) {
    const data: TUserSchemaUpdateEmail = req.body;
    const { username }: ParamsUpdateEmail = req.params;

    userSchemaUpdateEmail
      .parseAsync({ ...data, username })
      .then(async (e) => {
        const service = UserAdminService.build();
        const { status, message } = await service.updateEmail(e);
        res.status(status).json(message);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
}
