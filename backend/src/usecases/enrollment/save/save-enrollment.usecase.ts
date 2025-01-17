import { Enrollment } from "../../../domain/enrollment/entity/enrollment";
import { EnrollmentGateway } from "../../../domain/enrollment/gateway/enrollment.gateway";
import { Usecase } from "../../usecase";

export type SaveEnrollmentInputDto = {
  userId: string,
  courseId: string
};

export type SaveEnrollmentOutputDto = {
  id: string;
};

export class SaveEnrollmentUsecase implements Usecase<SaveEnrollmentInputDto, SaveEnrollmentOutputDto> {
  private constructor(private readonly enrollmentGateway: EnrollmentGateway) {}

  public static create(enrollmentGateway: EnrollmentGateway) {
    return new SaveEnrollmentUsecase(enrollmentGateway);
  }

  async execute({userId, courseId}: SaveEnrollmentInputDto): Promise<SaveEnrollmentOutputDto> {
      const localEnrollment = Enrollment.create(userId, courseId);

      await this.enrollmentGateway.save(localEnrollment);

      const output: SaveEnrollmentOutputDto = this.presentOutput(localEnrollment);

      return output;
  }

  private presentOutput(enrollment: Enrollment) : SaveEnrollmentOutputDto {
    return { id: enrollment.id }
  }
} 