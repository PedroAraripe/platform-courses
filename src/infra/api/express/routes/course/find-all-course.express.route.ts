import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { FindAllCourseUsecase } from "../../../../../usecases/course/find-all/find-all-course.usecase";
import { GenericRouteErrorHandling } from "../errors/generic-route-error-handling.error";

export type FindAllCourseResponseDto = {
  id: String,
  title: String,
  description: String,
  createdAt: Date,
}[];

export class FindAllCourseRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findAllCourseService: FindAllCourseUsecase
  ) {}

  public static create(findAllCourseService: FindAllCourseUsecase) {
    return new FindAllCourseRoute(
      "/courses",
      HttpMethod.GET,
      findAllCourseService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const output: FindAllCourseResponseDto =
          await this.findAllCourseService.execute();
  
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

  private present(courses: FindAllCourseResponseDto): FindAllCourseResponseDto {
    return courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      createdAt: course.createdAt,
    }));
  }
}