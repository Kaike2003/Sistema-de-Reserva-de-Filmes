import { Output } from "../../..";
import {
  TUserSchemaAuthenticate,
  TUserSchemaCreate,
  TUserSchemaUpdateData,
  TUserSchemaUpdateEmail,
  TUserSchemaUpdatePassword,
  TUserSchemaUpdateUsername,
} from "../../../../validation/user/user.validation";

export interface IUserAdminService {
  create(data: TUserSchemaCreate): Promise<Output<string>>;
  authenticate(data: TUserSchemaAuthenticate): Promise<Output<string>>;
  updateData(data: TUserSchemaUpdateData): Promise<Output<string>>;
  updateUsername(data: TUserSchemaUpdateUsername): Promise<Output<string>>;
  updatePassword(data: TUserSchemaUpdatePassword): Promise<Output<string>>;
  updateEmail(data: TUserSchemaUpdateEmail): Promise<Output<string>>;
}
