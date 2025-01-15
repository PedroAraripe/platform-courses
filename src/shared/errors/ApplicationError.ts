export abstract class ApplicationError extends Error {
  constructor(
    public readonly name: string, 
    public readonly message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      error: this.name,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
