import bcrypt from "bcrypt";

export default class Bcrypt {
  private constructor() {}

  public static build() {
    return new Bcrypt();
  }

  public async hash(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    const compare = bcrypt.compareSync(password, hash);
    return compare;
  }
}
