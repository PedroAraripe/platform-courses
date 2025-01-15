import { User } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usecase";

export type FindUserInputDto = {
  name: string;
};

export type FindUserOutputDto = {
  name: string,
  id: string,
  email: string,
  createdAt: Date,
}[];

export class FindByNameUserUsecase implements Usecase<FindUserInputDto, FindUserOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new FindByNameUserUsecase(userGateway);
  }

  async execute({ name }: FindUserInputDto): Promise<FindUserOutputDto> {
    const usersFound = await this.userGateway.findByName(name);

    const output: FindUserOutputDto = this.presentOutput(usersFound);

    return output;
  }

  private presentOutput(users: User[]) : FindUserOutputDto {
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }));
  }
} 