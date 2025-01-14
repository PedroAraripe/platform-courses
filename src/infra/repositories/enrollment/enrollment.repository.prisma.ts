import { PrismaClient } from "@prisma/client";
import { Enrollment } from "../../../domain/enrollment/entity/enrollment";
import { EnrollmentGateway } from "../../../domain/enrollment/gateway/enrollment.gateway";
import { Course } from "../../../domain/course/entity/course";
import { User } from "../../../domain/user/entity/user";

export class EnrollmentRepositoryPrisma implements EnrollmentGateway {
  constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new EnrollmentRepositoryPrisma(prismaClient);
  }

  public async save(enrollment: Enrollment): Promise<void> {
    const data = {
      id: enrollment.id,
      userId: enrollment.userId,
      enrolledAt: enrollment.enrolledAt,
      courseId: enrollment.courseId,
    }

    await this.prismaClient.enrollments.create({ data });
  }

  public async findById(id: string): Promise<Enrollment> {
    const foundEnrollment = await this.prismaClient.enrollments.findUnique({
      where: { id },
      include: {
        user: true,
        course: true,
      },
    })

    if(!foundEnrollment) {
      throw Error("Enrollment not found");
    }

    return Enrollment.with({
      ...foundEnrollment,
      course: Course.with(foundEnrollment.course),
      user: User.with(foundEnrollment.user),
    }); 
  }

  public async findByUserId(userId: string): Promise<Enrollment[]> {
    const foundEnrollments = await this.prismaClient.enrollments.findMany({
      where: { userId },
      include: {
        user: true,
        course: true,
      },
    })

    if(!foundEnrollments?.length) {
      throw Error("Enrollment not found");
    }

    return foundEnrollments.map(foundEnrollment => Enrollment.with({
      ...foundEnrollment,
      course: Course.with(foundEnrollment.course),
      user: User.with(foundEnrollment.user),
    })); 
  }

  public async findAll(): Promise<Enrollment[]> {
    const foundEnrollments = await this.prismaClient.enrollments.findMany({
      include: {
        user: true,
        course: true,
      },
    })

    return foundEnrollments.map(enrollmentFound => Enrollment.with({
      ...enrollmentFound,
      course: Course.with(enrollmentFound.course),
      user: User.with(enrollmentFound.user),
    }));
  }
}