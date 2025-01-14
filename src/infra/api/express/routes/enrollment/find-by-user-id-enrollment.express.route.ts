import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { CoursePublicDto } from "../../../../../domain/course/entity/course";
import { UserPublicDto } from "../../../../../domain/user/entity/user";
import { FindByUserIdEnrollmentUsecase } from "../../../../../usecases/enrollment/find-by-user-id/find-by-user-id-enrollment.usecase";

export type FindByUserIdEnrollmentResponseDto = {
  id: string,
  userId: string,
  courseId: string,
  enrolledAt: Date,
  course?: CoursePublicDto,
  user?: UserPublicDto,
}[];

export class FindByUserIdEnrollmentRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findByUserIdEnrollmentService: FindByUserIdEnrollmentUsecase
  ) {}

  public static create(findByUserIdEnrollmentService: FindByUserIdEnrollmentUsecase) {
    return new FindByUserIdEnrollmentRoute(
      "/enrollments/:userId",
      HttpMethod.GET,
      findByUserIdEnrollmentService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { userId } = request.params;

      const output: FindByUserIdEnrollmentResponseDto =
        await this.findByUserIdEnrollmentService.execute({ userId });

      const responseBody = this.present(output);

      response.status(200).json(responseBody).send();
    };
  }

  public getPath(): string {
      return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: FindByUserIdEnrollmentResponseDto): FindByUserIdEnrollmentResponseDto {
    return input.map(enrollmentInput => ({
      id: enrollmentInput.id,
      userId: enrollmentInput.userId,
      courseId: enrollmentInput.courseId,
      enrolledAt: enrollmentInput.enrolledAt,
      course: enrollmentInput.course,
      user: enrollmentInput.user,
    }));
  }
}