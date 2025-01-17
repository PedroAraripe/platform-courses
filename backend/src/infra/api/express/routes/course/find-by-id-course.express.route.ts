import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { FindByIdCourseUsecase } from "../../../../../usecases/course/find-by-id/find-by-id-course.usecase";
import { GenericRouteErrorHandling } from "../errors/generic-route-error-handling.error";

export type FindByIdCourseResponseDto = {
  title: string,
  description: string,
  id: string,
  createdAt: Date,
};

export class FindByIdCourseRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findByIdCourseService: FindByIdCourseUsecase
  ) {}

  public static create(findByIdCourseService: FindByIdCourseUsecase) {
    return new FindByIdCourseRoute(
      "/courses/:id",
      HttpMethod.GET,
      findByIdCourseService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { id } = request.params;

        const output: FindByIdCourseResponseDto =
          await this.findByIdCourseService.execute({ id });

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

  private present(input: FindByIdCourseResponseDto): FindByIdCourseResponseDto {
    const response = {
      id: input.id,
      title: input.title,
      description: input.description,
      createdAt: input.createdAt,
    };
  
    return response;
  }
}