import { ValidationError } from "../errors/validation.error";

export class RequiredIdFindByValidation {
  static validate(id: string) {
    if(!id) {
      throw new ValidationError("Missing parameter", [
        {
          field: "id",
          message: "id is required"
        }
      ])
    }

  }
}