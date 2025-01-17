import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { FindAllEnrollmentUsecase } from "../../../../../usecases/enrollment/find-all/find-all-enrollment.usecase";
import { Course, CoursePublicDto } from "../../../../../domain/course/entity/course";
import { User, UserPublicDto } from "../../../../../domain/user/entity/user";
import { GenericRouteErrorHandling } from "../errors/generic-route-error-handling.error";

export type FindAllEnrollmentResponseDto = {
  id: string,
  userId: string,
  courseId: string,
  enrolledAt: Date,
  course?: CoursePublicDto,
  user?: UserPublicDto,
}[];

export class FindAllEnrollmentRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findAllEnrollmentService: FindAllEnrollmentUsecase
  ) {}

  public static create(findAllEnrollmentService: FindAllEnrollmentUsecase) {
    return new FindAllEnrollmentRoute(
      "/enrollments",
      HttpMethod.GET,
      findAllEnrollmentService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const output: FindAllEnrollmentResponseDto =
          await this.findAllEnrollmentService.execute();
  
        const responseBody = this.present(output);
  
        response.status(200).json(responseBody);
      } catch(errorCatched) {
        GenericRouteErrorHandling.handle(response, errorCatched);
      }
    };
  }

  public getPath(): string {
      return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(enrollments: FindAllEnrollmentResponseDto): FindAllEnrollmentResponseDto {
    return enrollments.map(enrollment => ({
      id: enrollment.id,
      userId: enrollment.userId,
      courseId: enrollment.courseId,
      enrolledAt: enrollment.enrolledAt,
      course: enrollment.course,
      user: enrollment.user,
    }));
  }
}