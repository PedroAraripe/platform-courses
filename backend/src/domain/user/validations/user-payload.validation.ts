import { ValidationError, ValidationErrorDetail } from "../../../shared/errors/validation.error";
import { ValidEmailValidation } from "../../../shared/validations/valid-email.validation";
import { UserProps } from "../types/user.types";

export class UserValidations {
  static validate(userProps: UserProps) {
    const errorsDetails: ValidationErrorDetail[] = [];

    if(!userProps.name) {
      errorsDetails.push({
        field: "name",
        message: "name is required"
      });
    }

    if(!userProps.password) {
      errorsDetails.push({
        field: "password",
        message: "password is required"
      });
    }

    if(!userProps.email) {
      errorsDetails.push({
        field: "email",
        message: "email is required"
      });
    }

    if(userProps.email && !ValidEmailValidation.validate(userProps.email)) {
      errorsDetails.push({
        field: "email",
        message: "email is badly formatted"
      });
    }

    if(errorsDetails.length) {
      throw new ValidationError("Alguns campos estão faltando ou estão mal formatados", errorsDetails)
    }
  }
}