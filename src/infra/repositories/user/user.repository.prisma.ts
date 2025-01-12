import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";

export class UserRepositoryPrisma implements UserGateway {
  constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new UserRepositoryPrisma(prismaClient);
  }

  public async save(user: User): Promise<void> {
      const data = {
        id: user.id,
        name: user.name,
        password: user.password,
        createdAt: user.createdAt,
      }

      await this.prismaClient.user.create({ data });
  }

  public async findById(id: string): Promise<User> {
      const foundUser = await this.prismaClient.user.findUnique({where: { id }})

      if(!foundUser) {
       throw Error("User not found");
      }


      return User.with(foundUser);
  }
}