import { Request, Response } from "express";
import { SaveCourseInputDto, SaveCourseUsecase } from "../../../../../usecases/course/save/save-course.usecase";
import { HttpMethod, Route } from "../route";
import { GenericRouteErrorHandling } from "../errors/generic-route-error-handling.error";

export type SaveCourseResponseDto = {
  id: string;
};

export class SaveCourseRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly saveCourseService: SaveCourseUsecase
  ) {}

  public static create(saveCourseService: SaveCourseUsecase) {
    return new SaveCourseRoute(
      "/courses",
      HttpMethod.POST,
      saveCourseService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { title, description, hours } = request.body;
  
        const input: SaveCourseInputDto = {
          title,
          description,
          hours,
        };

        const output: SaveCourseResponseDto = 
          await this.saveCourseService.execute(input);

        const responseBody = this.present(output);

        response.status(201).json(responseBody);
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

  private present(input: SaveCourseResponseDto): SaveCourseResponseDto {
    const response = { id: input.id };
    return response;
  }
}