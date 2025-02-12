import { Enrollment, EnrollmentWithCourseDto } from "../../../domain/enrollment/entity/enrollment";
import { User } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usecase";

export type FindUserOutputDto = {
  name: string,
  id: string,
  createdAt: Date,
  email: string,
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
    const mappedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    }))

    return mappedUsers;
  }
} 