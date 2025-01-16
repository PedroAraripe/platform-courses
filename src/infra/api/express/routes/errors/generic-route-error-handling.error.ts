import { Response } from "express";
import { ValidationError } from "../../../../../shared/errors/validation.error";
import { UnknownError } from "../../../../../shared/errors/unknown.error";
import { ApplicationError } from "../../../../../shared/errors/application.error";

export class GenericRouteErrorHandling {
  static handle(response: Response, errorInitial: any) {
    const errorCatched: ApplicationError = errorInitial instanceof ApplicationError ?
      errorInitial : new UnknownError()

    response.status(errorCatched.statusCode)
      .json(errorCatched.toJSON())
      .send();
  }
}