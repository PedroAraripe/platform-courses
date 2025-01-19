import { PrismaClient } from "@prisma/client";
import { Enrollment } from "../../../domain/enrollment/entity/enrollment";
import { EnrollmentGateway } from "../../../domain/enrollment/gateway/enrollment.gateway";
import { Course } from "../../../domain/course/entity/course";
import { User } from "../../../domain/user/entity/user";
import { NotFoundError } from "../../../shared/errors/not-found.error";

export class EnrollmentRepositoryPrisma implements EnrollmentGateway {
  constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new EnrollmentRepositoryPrisma(prismaClient);
  }

  public async save(enrollment: Enrollment): Promise<Enrollment> {
    const data = {
      id: enrollment.id,
      userId: enrollment.userId,
      courseId: enrollment.courseId,
      enrolledAt: enrollment.enrolledAt,
    }

    const enrollmentCreated = await this.prismaClient.enrollments.upsert({
      where: {
        userId_courseId: { userId: data.userId, courseId: data.courseId }
      },
      update: {},
      create: {...data}
    });

    return Enrollment.with({
      ...enrollmentCreated,
      wasUpserted: data.id !== enrollmentCreated.id
    })
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
      throw new NotFoundError("Enrollment"); 
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