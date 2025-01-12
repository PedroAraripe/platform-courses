import { Request, Response } from "express";
import { SaveUserInputDto, SaveUserUsecase } from "../../../../../usecases/user/save/save-user.usecase";
import { HttpMethod, Route } from "../route";
import { FindByIdUserUsecase } from "../../../../../usecases/user/find-by-id/find-by-id.usecase";

export type FindByIdUserResponseDto = {
  name: String,
  id: String,
  createdAt: Date,
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
      const { id } = request.params;

      const output: FindByIdUserResponseDto =
        await this.findByIdUserService.execute({ id });

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

  private present(input: FindByIdUserResponseDto): FindByIdUserResponseDto {
    const response = {
      id: input.id,
      name: input.name,
      createdAt: input.createdAt,
    };
  
    return response;
  }
}