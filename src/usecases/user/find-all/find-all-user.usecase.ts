import { User } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usecase";

export type FindUserOutputDto = {
  name: string,
  id: string,
  createdAt: Date,
}[];

export class FindAllUserUsecase implements Usecase<void, FindUserOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new FindAllUserUsecase(userGateway);
  }

  async execute(): Promise<FindUserOutputDto> {
      const users = await this.userGateway.findAll();

      const output: FindUserOutputDto = this.presentOutput(users);

      return output;
  }

  private presentOutput(users: User[]) : FindUserOutputDto {
    return users.map(user => ({
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
    }))
  }
} 