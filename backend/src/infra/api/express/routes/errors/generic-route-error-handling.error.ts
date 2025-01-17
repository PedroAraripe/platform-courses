import { Response } from "express";
import { UnknownError } from "../../../../../shared/errors/unknown.error";
import { ApplicationError } from "../../../../../shared/errors/application.error";

export class GenericRouteErrorHandling {
  static handle(response: Response, errorInitial: any) {
    if(errorInitial instanceof Error) {
      console.error(errorInitial.message);
    }

    const errorCatched: ApplicationError = errorInitial instanceof ApplicationError ?
      errorInitial : new UnknownError()

    response.status(errorCatched.statusCode)
      .json(errorCatched.toJSON())
      ;
  }
}