import { Course, CoursePublicDto } from "../../../domain/course/entity/course";
import { Enrollment } from "../../../domain/enrollment/entity/enrollment";
import { EnrollmentGateway } from "../../../domain/enrollment/gateway/enrollment.gateway";
import { User, UserPublicDto } from "../../../domain/user/entity/user";
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
}[];

export class FindAllEnrollmentUsecase implements Usecase<FindEnrollmentInputDto, FindEnrollmentOutputDto> {
  private constructor(private readonly enrollmentGateway: EnrollmentGateway) {}

  public static create(enrollmentGateway: EnrollmentGateway) {
    return new FindAllEnrollmentUsecase(enrollmentGateway);
  }

  async execute(): Promise<FindEnrollmentOutputDto> {
      const enrollmentsFound = await this.enrollmentGateway.findAll();

      const output: FindEnrollmentOutputDto = this.presentOutput(enrollmentsFound);

      return output;
  }

  private presentOutput(enrollments: Enrollment[]) : FindEnrollmentOutputDto {
    return enrollments.map(enrollment => ({
      id: enrollment.id,
      userId: enrollment.userId,
      enrolledAt: enrollment.enrolledAt,
      courseId: enrollment.courseId,
      course: enrollment.course,
      user: enrollment.user,
    }));
  }
} 