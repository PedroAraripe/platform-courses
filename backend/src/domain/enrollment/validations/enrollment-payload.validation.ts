import { ValidationError, ValidationErrorDetail } from "../../../shared/errors/validation.error";
import { EnrollmentProps } from "../types/enrollment.types";

export class EnrollmentValidations {
  static validate(enrollmentProps: EnrollmentProps) {
    const errorsDetails: ValidationErrorDetail[] = [];

    if(!enrollmentProps.courseId) {
      errorsDetails.push({
        field: "courseId",
        message: "courseId is required"
      });
    }

    if(!enrollmentProps.userId) {
      errorsDetails.push({
        field: "userId",
        message: "userId is required"
      });
    }

    if(errorsDetails.length) {
      throw new ValidationError("Alguns campos estão faltando ou estão mal formatados", errorsDetails)
    }
  }
}