import { Request, Response } from "express";
import { SaveUserInputDto, SaveUserUsecase } from "../../../../../usecases/user/save/save-user.usecase";
import { HttpMethod, Route } from "../route";
import { ValidationError } from "../../../../../shared/errors/ValidationError";

export type SaveUserResponseDto = {
  id: string;
};

export class SaveUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly saveUserService: SaveUserUsecase
  ) {}

  public static create(saveUserService: SaveUserUsecase) {
    return new SaveUserRoute(
      "/users",
      HttpMethod.POST,
      saveUserService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const {
        name,
        password,
        email
      } = request.body;

      const input: SaveUserInputDto = {
        name,
        password,
        email,
      };

      try {
        const output: SaveUserResponseDto = 
          await this.saveUserService.execute(input);

        const responseBody = this.present(output);

        response.status(201).json(responseBody).send();
      } catch(errorCatched) {
        let errorMessage: string = "Unknown error"

        if(errorCatched instanceof Error) {
          errorMessage = errorCatched.message;
        }

        if(errorCatched instanceof ValidationError) {
          response.status(errorCatched.statusCode).json(
            errorCatched.toJSON()
          ).send();
        } else {
          response.status(400).json({
            error: "Error",
            message: errorMessage,
          }).send();
        }
      }
    };
  }

  public getPath(): string {
      return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: SaveUserResponseDto): SaveUserResponseDto {
    const response = { id: input.id };
    return response;
  }
}