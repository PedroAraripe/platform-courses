import { CoursePublicDto } from "../../../domain/course/entity/course";
import { Enrollment } from "../../../domain/enrollment/entity/enrollment";
import { EnrollmentGateway } from "../../../domain/enrollment/gateway/enrollment.gateway";
import { UserPublicDto } from "../../../domain/user/entity/user";
import { FindByIdPayload } from "../../../shared/types/find-by-id-payload.type";
import { Usecase } from "../../usecase";

export type FindEnrollmentOutputDto = {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  course?: CoursePublicDto;
  user?: UserPublicDto;
};

export class FindByIdEnrollmentUsecase implements Usecase<FindByIdPayload, FindEnrollmentOutputDto> {
  private constructor(private readonly enrollmentGateway: EnrollmentGateway) {}

  public static create(enrollmentGateway: EnrollmentGateway) {
    return new FindByIdEnrollmentUsecase(enrollmentGateway);
  }

  async execute({ id }: FindByIdPayload): Promise<FindEnrollmentOutputDto> {
      const enrollmentFound = await this.enrollmentGateway.findById(id);

      const output: FindEnrollmentOutputDto = this.presentOutput(enrollmentFound);

      return output;
  }

  private presentOutput(enrollment: Enrollment) : FindEnrollmentOutputDto {
    return {
      id: enrollment.id,
      userId: enrollment.userId,
      enrolledAt: enrollment.enrolledAt,
      courseId: enrollment.courseId,
      course: enrollment.course,
      user: enrollment.user,
    }
  }
}  