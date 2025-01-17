import { ApplicationError } from './application.error';

export type ValidationErrorDetail = {
  field: string;
  message: string;
};

export class UnknownError extends ApplicationError {
  constructor() {
    super("Unknown", "An unknown error has occured", 400);
  }

  toJSON() {
    return {
      error: this.name,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}