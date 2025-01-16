import { Request, Response } from "express";
import { SaveEnrollmentInputDto, SaveEnrollmentUsecase } from "../../../../../usecases/enrollment/save/save-enrollment.usecase";
import { HttpMethod, Route } from "../route";
import { ValidationError } from "../../../../../shared/errors/validation.error";
import { GenericRouteErrorHandling } from "../errors/generic-route-error-handling.error";

export type SaveEnrollmentResponseDto = {
  id: string;
};

export class SaveEnrollmentRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly saveEnrollmentService: SaveEnrollmentUsecase
  ) {}

  public static create(saveEnrollmentService: SaveEnrollmentUsecase) {
    return new SaveEnrollmentRoute(
      "/enrollments",
      HttpMethod.POST,
      saveEnrollmentService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { courseId, userId } = request.body;
        
        const input: SaveEnrollmentInputDto = {
          courseId,
          userId,
        };
        
        const output: SaveEnrollmentResponseDto = 
          await this.saveEnrollmentService.execute(input);

        const responseBody = this.present(output);

        response.status(201).json(responseBody).send();
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

  private present(input: SaveEnrollmentResponseDto): SaveEnrollmentResponseDto {
    const response = { id: input.id };
    return response;
  }
}