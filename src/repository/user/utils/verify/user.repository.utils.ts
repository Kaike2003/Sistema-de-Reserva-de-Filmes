import { PrismaClient } from "@prisma/client";

export default class UserRepositoryUtils {
  constructor(private prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserRepositoryUtils(prisma);
  }

  public async email(email: string): Promise<boolean> {
    const res = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (res) {
      return true;
    }

    return false;
  }

  public async username(username: string): Promise<boolean> {
    const res = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (res) {
      return true;
    }

    return false;
  }

  public async code(code: string): Promise<boolean> {
    const res = await this.prisma.user.findUnique({
      where: {
        code,
      },
    });

    if (res) {
      return true;
    }

    return false;
  }

  public async authenticated(code: string): Promise<boolean> {
    const res = await this.prisma.user.findUnique({
      where: {
        code,
      },
    });

    if (res?.autenticated === true) {
      return true;
    }

    return false;
  }
}
