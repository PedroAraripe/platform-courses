import { Request, Response } from "express";
import { SaveUserInputDto, SaveUserUsecase } from "../../../../../usecases/user/save/save-user.usecase";
import { HttpMethod, Route } from "../route";

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
      const { name, password } = request.body;

      const input: SaveUserInputDto = {
        name,
        password,
      };

      const output: SaveUserResponseDto =
        await this.saveUserService.execute(input);

      const responseBody = this.present(output);

      response.status(201).json(responseBody).send();
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