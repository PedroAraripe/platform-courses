import { Request, Response } from "express";
import { SaveEnrollmentInputDto, SaveEnrollmentUsecase } from "../../../../../usecases/enrollment/save/save-enrollment.usecase";
import { HttpMethod, Route } from "../route";

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
      const { courseId, userId } = request.body;

      const input: SaveEnrollmentInputDto = {
        courseId,
        userId,
      };

      try {
        const output: SaveEnrollmentResponseDto = 
          await this.saveEnrollmentService.execute(input);

        const responseBody = this.present(output);

        response.status(201).json(responseBody).send();
      } catch(errorCatched) {
        let errorMessage: string = "Unknown error"

        if(errorCatched instanceof Error) {
          errorMessage = errorCatched.message;
        }

        response.status(400).json({
          error: "Error",
          message: errorMessage,
        }).send();
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