import { CourseGateway } from "../../../domain/course/gateway/course.gateway";
import { Enrollment } from "../../../domain/enrollment/entity/enrollment";
import { EnrollmentGateway } from "../../../domain/enrollment/gateway/enrollment.gateway";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { AlreadyCreatedEntityError } from "../../../shared/errors/already-created-entity.error";
import { Usecase } from "../../usecase";

export type SaveEnrollmentInputDto = {
  userId: string,
  courseId: string
};

export type SaveEnrollmentOutputDto = {
  id: string;
};

export class SaveEnrollmentUsecase implements Usecase<SaveEnrollmentInputDto, SaveEnrollmentOutputDto> {
  private constructor(
    private readonly enrollmentGateway: EnrollmentGateway,
    private readonly userGateway: UserGateway,
    private readonly courseGateway: CourseGateway,
  ) {}

  public static create(
    enrollmentGateway: EnrollmentGateway,
    userGateway: UserGateway,
    courseGateway: CourseGateway,
  ) {
    return new SaveEnrollmentUsecase(
      enrollmentGateway,
      userGateway,
      courseGateway
    );
  }

  async execute({userId, courseId}: SaveEnrollmentInputDto): Promise<SaveEnrollmentOutputDto> {
      const localEnrollment = Enrollment.create(userId, courseId);
      
      // if it doesn't find either user or course, there'll emit error to controller
      await this.userGateway.findById(userId);
      await this.courseGateway.findById(courseId);

      const createdEnrollment = await this.enrollmentGateway.save(localEnrollment);
      

      if(createdEnrollment.wasUpserted) {
        throw new AlreadyCreatedEntityError("Enrollment");
      }
      
      const output: SaveEnrollmentOutputDto = this.presentOutput(localEnrollment);

      return output;
  }

  private presentOutput(enrollment: Enrollment) : SaveEnrollmentOutputDto {
    return { id: enrollment.id }
  }
} 