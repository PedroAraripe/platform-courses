import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { FindByTitleCourseUsecase } from "../../../../../usecases/course/find-by-title/find-by-title-course.usecase";

export type FindByTitleCourseResponseDto = {
  id: String,
  description: String,
  title: String,
  createdAt: Date,
}[];

export class FindByTitleCourseRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findByTitleCourseService: FindByTitleCourseUsecase
  ) {}

  public static create(findByTitleCourseService: FindByTitleCourseUsecase) {
    return new FindByTitleCourseRoute(
      "/courses/search/:title",
      HttpMethod.GET,
      findByTitleCourseService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { title } = request.params;

      const output: FindByTitleCourseResponseDto =
        await this.findByTitleCourseService.execute({ title });

      const responseBody = this.present(output);

      response.status(200).json(responseBody).send();
    };
  }

  public getPath(): string {
      return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(inputs: FindByTitleCourseResponseDto): FindByTitleCourseResponseDto {
    return inputs.map(input => ({
      id: input.id,
      title: input.title,
      description: input.description,
      createdAt: input.createdAt,
    }));
  }
}