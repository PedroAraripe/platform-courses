import { User } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { FindByIdPayload } from "../../../shared/types/find-by-id-payload.type";
import { Usecase } from "../../usecase";

export type FindUserOutputDto = {
  name: string,
  id: string,
  createdAt: Date,
  email: string,
};

export class FindByIdUserUsecase implements Usecase<FindByIdPayload, FindUserOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new FindByIdUserUsecase(userGateway);
  }

  async execute({ id }: FindByIdPayload): Promise<FindUserOutputDto> {
      const userFound = await this.userGateway.findById(id);

      const output: FindUserOutputDto = this.presentOutput(userFound);

      return output;
  }

  private presentOutput(user: User) : FindUserOutputDto {
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }
  }
} 