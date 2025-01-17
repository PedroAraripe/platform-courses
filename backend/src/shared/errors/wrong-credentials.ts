import { ApplicationError } from './application.error';

export class WrongCredentials extends ApplicationError {
  constructor() {
    super("Unauthorized", "Wrong credentials", 401);
  }

  toJSON() {
    return {
      error: this.name,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}