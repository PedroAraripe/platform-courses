import { Request, Response } from "express";
import { SaveUserInputDto, SaveUserUsecase } from "../../../../usecases/user/save/save-user.usecase";
import { HttpMethod, Route } from "./route";
import { ValidationError } from "../../../../shared/errors/validation.error";
import { GenericRouteErrorHandling } from "./errors/generic-route-error-handling.error";
import { NotFoundError } from "../../../../shared/errors/not-found.error";

export type SaveUserResponseDto = {
  id: string;
};

export class RouteNotFound implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
  ) {}

  public static create() {
    return new RouteNotFound(
      "*",
      HttpMethod.GET,
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      GenericRouteErrorHandling.handle(response, new NotFoundError("Route")); 
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