import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { FindAllUserUsecase } from "../../../../../usecases/user/find-all/find-all-user.usecase";
import { GenericRouteErrorHandling } from "../errors/generic-route-error-handling.error";
import { EnrollmentWithCourseDto } from "../../../../../domain/enrollment/entity/enrollment";

export type FindAllUserResponseDto = {
  email: string,
  name: string,
  id: string,
  createdAt: Date,
}[];

export class FindAllUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findAllUserService: FindAllUserUsecase
  ) {}

  public static create(findAllUserService: FindAllUserUsecase) {
    return new FindAllUserRoute(
      "/users",
      HttpMethod.GET,
      findAllUserService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const output: FindAllUserResponseDto =
          await this.findAllUserService.execute();
  
        const responseBody = this.present(output);
  
        response.status(200).json(responseBody);
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

  private present(users: FindAllUserResponseDto): FindAllUserResponseDto {
    return users.map(user => ({
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
      email: user.email,
    }));
  }
}