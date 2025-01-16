import { ApplicationError } from './application.error';

export type ValidationErrorDetail = {
  field: string;
  message: string;
};

export class ValidationError extends ApplicationError {
  constructor(
    message: string,
    public readonly details?: ValidationErrorDetail[]
  ) {
    super('ValidationError', message, 400);
  }

  toJSON() {
    return {
      error: this.name,
      statusCode: this.statusCode,
      message: this.message,
      details: this.details || [],
    };
  }
}