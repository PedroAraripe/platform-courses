import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { FindByIdEnrollmentUsecase } from "../../../../../usecases/enrollment/find-by-id/find-by-id-enrollment.usecase";
import { CoursePublicDto } from "../../../../../domain/course/entity/course";
import { UserPublicDto } from "../../../../../domain/user/entity/user";

export type FindByIdEnrollmentResponseDto = {
  id: string,
  userId: string,
  courseId: string,
  enrolledAt: Date,
  course?: CoursePublicDto,
  user?: UserPublicDto,
};

export class FindByIdEnrollmentRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findByIdEnrollmentService: FindByIdEnrollmentUsecase
  ) {}

  public static create(findByIdEnrollmentService: FindByIdEnrollmentUsecase) {
    return new FindByIdEnrollmentRoute(
      "/enrollment/:id",
      HttpMethod.GET,
      findByIdEnrollmentService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { id } = request.params;

      const output: FindByIdEnrollmentResponseDto =
        await this.findByIdEnrollmentService.execute({ id });

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

  private present(input: FindByIdEnrollmentResponseDto): FindByIdEnrollmentResponseDto {
    const response = {
      id: input.id,
      userId: input.userId,
      courseId: input.courseId,
      enrolledAt: input.enrolledAt,
      course: input.course,
      user: input.user,
    };
  
    return response;
  }
}