import { User } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { AlreadyCreatedEntityError } from "../../../shared/errors/already-created-entity.error";
import { Usecase } from "../../usecase";

export type SaveUserInputDto = {
  name: string,
  email: string;
  password: string;
};
export type SaveUserOutputDto = {
  id: string;
};

export class SaveUserUsecase implements Usecase<SaveUserInputDto, SaveUserOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new SaveUserUsecase(userGateway);
  }

  async execute({name, password, email}: SaveUserInputDto): Promise<SaveUserOutputDto> {
    const localUser = await User.create(name, password, email);

    const userCreated = await this.userGateway.save(localUser);

    if(userCreated.wasUpserted) {
      throw new AlreadyCreatedEntityError("Usuário");
    }

    const output: SaveUserOutputDto = this.presentOutput(localUser);

    return output;
  }

  private presentOutput(user: User) : SaveUserOutputDto {
    return { id: user.id }
  }
} 