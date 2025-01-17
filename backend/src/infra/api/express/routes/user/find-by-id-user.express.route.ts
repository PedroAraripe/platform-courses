import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { FindByIdUserUsecase } from "../../../../../usecases/user/find-by-id/find-by-id-user.usecase";
import { RequiredIdFindByValidation } from "../../../../../shared/validations/required-id-find-by.validation";
import { ValidationError } from "../../../../../shared/errors/validation.error";
import { GenericRouteErrorHandling } from "../errors/generic-route-error-handling.error";
import { EnrollmentWithCourseDto } from "../../../../../domain/enrollment/entity/enrollment";

export type FindByIdUserResponseDto = {
  name: String,
  email: String,
  id: String,
  createdAt: Date,
  enrollments?: EnrollmentWithCourseDto[],
};

export class FindByIdUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findByIdUserService: FindByIdUserUsecase
  ) {}

  public static create(findByIdUserService: FindByIdUserUsecase) {
    return new FindByIdUserRoute(
      "/users/:id",
      HttpMethod.GET,
      findByIdUserService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { id } = request.params;
  
        RequiredIdFindByValidation.validate(id);
  
        const output: FindByIdUserResponseDto =
          await this.findByIdUserService.execute({ id });
  
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

  private present(input: FindByIdUserResponseDto): FindByIdUserResponseDto {
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