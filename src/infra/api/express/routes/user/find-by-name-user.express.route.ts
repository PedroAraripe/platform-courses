import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { FindByNameUserUsecase } from "../../../../../usecases/user/find-by-name/find-by-name-user.usecase";
import { RequiredSeachFindByValidation } from "../../../../../shared/validations/required-search-find-by.validation";
import { GenericRouteErrorHandling } from "../errors/generic-route-error-handling.error";
import { EnrollmentWithCourseDto } from "../../../../../domain/enrollment/entity/enrollment";

export type FindByNameUserResponseDto = {
  id: String,
  name: String,
  createdAt: Date,
  email: string,
  enrollments?: EnrollmentWithCourseDto[],
}[];

export class FindByNameUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findByNameUserService: FindByNameUserUsecase
  ) {}

  public static create(findByNameUserService: FindByNameUserUsecase) {
    return new FindByNameUserRoute(
      "/users-search/:name?",
      HttpMethod.GET,
      findByNameUserService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { name } = request.params;
        RequiredSeachFindByValidation.validate(name);
  
        const output: FindByNameUserResponseDto =
          await this.findByNameUserService.execute({ name });
  
        const responseBody = this.present(output);
  
        response.status(200).json(responseBody).send();
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

  private present(inputs: FindByNameUserResponseDto): FindByNameUserResponseDto {
    return inputs.map(input => ({
      id: input.id,
      name: input.name,
      email: input.email,
      createdAt: input.createdAt,
      enrollments: input.enrollments
    }));
  }
}