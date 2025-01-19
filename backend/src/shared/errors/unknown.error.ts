import { ApplicationError } from './application.error';

export type ValidationErrorDetail = {
  field: string;
  message: string;
};

export class UnknownError extends ApplicationError {
  constructor() {
    super("Unknown", "Um erro desconhecido ocorreu", 400);
  }

  toJSON() {
    return {
      error: this.name,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}