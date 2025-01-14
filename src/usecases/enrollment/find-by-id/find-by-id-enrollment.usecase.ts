import { Course, CoursePublicDto } from "../../../domain/course/entity/course";
import { Enrollment } from "../../../domain/enrollment/entity/enrollment";
import { EnrollmentGateway } from "../../../domain/enrollment/gateway/enrollment.gateway";
import { User, UserPublicDto } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usecase";

export type FindEnrollmentInputDto = {
  id: string;
};

export type FindEnrollmentOutputDto = {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  course?: CoursePublicDto;
  user?: UserPublicDto;
};

export class FindByIdEnrollmentUsecase implements Usecase<FindEnrollmentInputDto, FindEnrollmentOutputDto> {
  private constructor(private readonly enrollmentGateway: EnrollmentGateway) {}

  public static create(enrollmentGateway: EnrollmentGateway) {
    return new FindByIdEnrollmentUsecase(enrollmentGateway);
  }

  async execute({ id }: FindEnrollmentInputDto): Promise<FindEnrollmentOutputDto> {
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