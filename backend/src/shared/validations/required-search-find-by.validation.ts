import { ValidationError } from "../errors/validation.error";

export class RequiredSeachFindByValidation {
  static validate(search: string) {
    if(!search) {
      throw new ValidationError("Missing parameter", [
        {
          field: "search",
          message: "search is required"
        }
      ])
    }

  }
}