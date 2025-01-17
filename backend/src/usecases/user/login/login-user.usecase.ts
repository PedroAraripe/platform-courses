import { EnrollmentWithCourseDto } from "../../../domain/enrollment/entity/enrollment";
import { User } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { PasswordHasherDecrypt } from "../../../infra/cryptography/password-hasher-decrypt";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import { Usecase } from "../../usecase";

export type LoginUserInputDto = {
  email: string;
  password: string;
};

export type LoginUserOutputDto = {
  name: string,
  id: string,
  createdAt: Date,
  email: string,
  enrollments?: EnrollmentWithCourseDto[],
};


export class LoginUserUsecase implements Usecase<LoginUserInputDto, LoginUserOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new LoginUserUsecase(userGateway);
  }

  async execute({ password, email }: LoginUserInputDto): Promise<LoginUserOutputDto> {
    const foundUser = await this.userGateway.findByEmail(email);

    if(!foundUser) {
      throw new NotFoundError("User");
    }

    await PasswordHasherDecrypt.execute(password, foundUser.password);

    const output: LoginUserOutputDto = this.presentOutput(foundUser);

    return output;
  }

  private presentOutput(user: User) : LoginUserOutputDto {
    return user;
  }
} 