import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { GenericRouteErrorHandling } from "../errors/generic-route-error-handling.error";
import { EnrollmentWithCourseDto } from "../../../../../domain/enrollment/entity/enrollment";
import { LoginUserUsecase } from "../../../../../usecases/user/login/login-user.usecase";
import { LoginUserPayloadValidations } from "./validations/login-user-payload.validation";

export type LoginUserInput = {
  password: string,
  email: string,
}

export type LoggedUserDto = {
  name: string,
  email: string,
  id: string,
  createdAt: Date,
  enrollments?: EnrollmentWithCourseDto[],
};

export class LoginUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly loginUserService: LoginUserUsecase
  ) {}

  public static create(loginUserService: LoginUserUsecase) {
    return new LoginUserRoute(
      "/user-login",
      HttpMethod.POST,
      loginUserService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const {
          password,
          email
        } = request.body;

        LoginUserPayloadValidations.validate({
          password,
          email,
        });
        
        const input: LoginUserInput = {
          password,
          email,
        };
        
        const output =
          await this.loginUserService.execute(input);

        const responseBody = this.present(output);

        response.json(responseBody);
      } catch(errorCatched) {
        GenericRouteErrorHandling.handle(response, errorCatched);
      }
    };
  }

  public getPath(): string {
      return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: LoggedUserDto): LoggedUserDto {
    const response = {
      id: input.id,
      name: input.name,
      createdAt: input.createdAt,
      email: input.email,
      enrollments: input.enrollments
    };
  
    return response;
  }
}